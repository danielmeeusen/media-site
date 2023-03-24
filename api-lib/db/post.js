import { signPost } from './bunny';
import { ObjectId } from 'mongodb';
import { getTag, insertTag } from './tag'
import date from 'date-and-time';


export async function applyToAll(db) {
  return db.collection('posts').find().forEach(
    async function(post) {
      const year = date.format(new Date(post.publishDate), 'YYYY');
      if(!post.tags.includes(year)) {
        post.tags.push(year);
      }
      post.tags = post.tags.filter(n=>n);
      post.tags.sort();
      const yearTag = await getTag(db, year);
      if(year && !yearTag) await insertTag(db, { name: year, type: 'year' });

      return await updatePostById(db, post._id, {
        ...{ tags: post.tags },
      });
    }
  )
}

export async function getRandomPosts(db, num) {
  let total = await db.collection('posts').count();
  let skip = Math.floor(Math.random() * (total-3));
  return db.collection('posts').find({
      publishDate: {
        $lte: new Date(),
      }
    }).limit(num).skip(skip || 0).next();
}

export async function getRandomTagsFromPosts(db, num) {
  let total = await db.collection('posts').count();
  let tags = [];

  while(tags.length < num) {
    let skip = Math.floor(Math.random() * (total-3));

    let newTags = await db.collection('posts').find({
        publishDate: {
          $lte: new Date(),
        },
    }).limit(-1).skip(skip || 0).next();

    newTags = newTags.tags.filter(e=>isNaN(e));
    tags = [...new Set([...tags,...newTags])];
  }
  return tags;
}

export async function findPostById(db, postId, members, userIp) {
  let post;
  if (postId.length !== 24) {
    return null;
  } 
  if (members) {
    post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
    if(post) post = await signPost(post, members, userIp);
  } else {
    post = await db
    .collection('posts')
    .findOne(
      { _id: new ObjectId(postId) }, 
      );
      if(post) post = await signPost(post, false);
    }
  if (!post) return null;
  post.tags = post.tags.filter(e => isNaN(e));
  return post;
}

export async function findPostsById(db, user, list, sort, limit) {
  const array = list.map(e => ObjectId(e));
  return await db
    .collection('posts')
    .find({
      ...(!user?.creator && {
        publishDate: {
          $lte: new Date(),
        },
      }),
    _id : { $in : array } 
    })
    .limit(limit)
    .toArray();
}

export async function featuredPost(db) {
  return await db.collection('posts').find( { featured: true }).toArray();
}

export async function findPosts(db, user, from, keywords, limit, type, not, sort, code, index) {
  if(type == 'filter') {
    return filterPosts(db, user, from, keywords, limit, sort, index);
  } else if (type == 'search') {
    return searchPosts(db, user, from, keywords, limit, sort, index);
  } else if (type == 'watchlist') {
    return await findPostsById(db, user, user.watchlist, sort, limit);
  } else if (type == 'history') {
    return await findPostsById(db, user, user.history, sort, limit);
  } else if (type == 'more') {
    const same = await series(db, user, limit, not, code);
    const more = await morePosts(db, user, from, keywords, limit=(limit-same.length), sort, code, index);
    return same.concat(more);
  } else if (sort == 'blend') {
    return await morePosts(db, user, from, keywords, limit, sort, code, index);
  } else {
  const featured = index==0 ? await featuredPost(db) : [];

  let posts =  await db
    .collection('posts')
    .find({
        ...(!user?.creator && {
          publishDate: {
            $lte: new Date(),
          },
        }),
        ...(from && sort == 'new' && {
        publishDate: {
          $lte: from,
        },
      }),
        ...(from && sort == 'old' && {
          publishDate: {
            $gte: from,
          },
        }),
      })
    .sort(sort == 'new' ? { publishDate: -1 } : { publishDate: 1 })
    .limit(limit-featured.length)
    .toArray();

  posts = [...new Set([...featured,...posts])];
  return posts;
  }
}

export async function series(db, user, limit, not, code) {
  return db
  .collection('posts')
  .aggregate([
    {
      $search: {
        index: 'media-search',
        compound: {
          ...(!user?.creator && {
            filter: [{
              range: {
                path: 'publishDate',
                lte: new Date(),
              }
            }],
          }),
          must: [{
            text: {
              query: code,
              path: 'shootCode',
            }
          }],
          mustNot: [{
            phrase: {
              query: not,
              path: 'title',
            }
          }]
        }
      }
    }
  ])
  .limit(limit)
  .toArray();
}

export async function morePosts(db, user, from, keywords, limit, sort, code, index) {
  return db
    .collection('posts')
    .aggregate([
      {
        $search: {
          index: 'media-search',
          compound: {
            ...(!user?.creator && {
              filter: [{
                range: {
                  path: 'publishDate',
                  lte: new Date(),
                }
              }],
            }),
            should: [{
              text: {
                query: keywords,
                path: [ 'title', 'people', 'tags', 'sponsors' ],
              }
            }],
            ...(code && {
              mustNot: [{
                phrase: {
                  query: code,
                  path: 'shootCode',
                }
              }]
            }),
          }
        }
      },
      { $skip: sort == 'blend' ? index * limit : 0 },
      ])
      .limit(limit)
      .toArray();
};

export async function searchPosts(db, user, from, keywords, limit, sort, index) {
  keywords = keywords.split(' ').map(e=>{ return `*${e}*`; });  
  if(sort == 'blend') {
    return db
    .collection('posts')
    .aggregate([
      {
        $search: {
          index: 'media-search',
          compound: {
            ...(!user?.creator && {
              filter: [{
                range: {
                  path: 'publishDate',
                  lte: new Date(),
                }
              }],
            }),
            must: [{
              wildcard: {
                query: keywords,
                path: [ 'title', 'people', 'tags', 'sponsors', 'shootCode' ],
                allowAnalyzedField: true,
              }
            }]
          }
        }
      },
      { $skip: sort == 'blend' ? index*limit : 0 }
      ])
      .limit(limit)
      .toArray();
  } else {
    return db
    .collection('posts')
    .aggregate([
    {
      $search: {
        index: 'media-search',
        compound: {
          ...(!user?.creator && {
            filter: [{
              range: {
                path: 'publishDate',
                lte: new Date(),
              }
            }],
          }),
          ...(from && sort == 'new' && {
            filter: [{
              range: {
                path: 'publishDate',
                lte: from,
              }
            }],
          }),
          ...(from && sort == 'old' && {
            filter: [{
              range: {
                path: 'publishDate',
                gte: from,
              }
            }],
          }),
          must: [{
            wildcard: {
              query: keywords,
              path: [ 'title', 'people', 'tags', 'sponsors', 'shootCode' ],
              allowAnalyzedField: true,
            }
          }]
        }
      }
    },
    { $sort: sort == 'new' ? { publishDate: -1 } : { publishDate: 1 }}
    ])
    .limit(limit)
    .toArray();
  }
};

export async function filterPosts(db, user, from, keywords, limit, sort, index) {
  const range = sort == 'new' ? { path: 'publishDate', lte: from } : { path: 'publishDate', gte: from };
  keywords = keywords.split(' ').map( (e,i) => { return e });
  if(sort == 'blend') {
    return db
    .collection('posts')
    .aggregate([
    {
      $search: {
        index: 'media-search',
        compound: {
          ...(!user?.creator && {
            filter: [{
              range: {
                path: 'publishDate',
                lte: new Date(),
              }
            }],
          }),
          must: [{
            text: {
              query: keywords,
              path: [ 'title', 'people', 'tags', 'sponsors' ]
            }
          }]
        }
      }
    },
    { $skip: sort == 'blend' ? index*limit : 0 }
    ])
    .limit(limit)
    .toArray();
  } else {  
    return db
    .collection('posts')
    .aggregate([
      {
        $search: {
          index: 'media-search',
          compound: {
            ...(!user?.creator && {
              filter: [{
                range: {
                  path: 'publishDate',
                  lte: new Date(),
                }
              }],
            }),
            ...(from && sort == 'new' && {
              filter: [{
                range: {
                  path: 'publishDate',
                  lte: from,
                }
              }],
            }),
            ...(from && sort == 'old' && {
              filter: [{
                range: {
                  path: 'publishDate',
                  gte: from,
                }
              }],
            }),
            must: [{
              text: {
                query: keywords,
                path: [ 'title', 'people', 'tags', 'sponsors' ]
              }
            }]
          }
        }
      },
      { $sort: sort == 'new' ? { publishDate: -1 } : { publishDate: 1 }}
      ])
      .limit(limit)
      .toArray();
  };
}

export async function updatePostById(db, postId, data) {
  return db
  .collection('posts')
  .findOneAndUpdate(
    { _id: new ObjectId(postId)} ,
    { $set: data },
    { returnDocument: 'after' }
    ).then(({ value }) => value);
  }
  
export async function insertPost(db, post) {
  const { insertedId } = await db.collection('posts').insertOne(post);
  post._id = String(insertedId);
  return post;
}

export async function deletePostById(db, postId) {
  return db.collection('posts').deleteOne({ _id: new ObjectId(postId) });
}
