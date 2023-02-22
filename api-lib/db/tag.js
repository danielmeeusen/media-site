
export async function getAutocomplete(db, keywords) {
  return db
    .collection('tags')
    .aggregate([
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: keywords,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
            tokenOrder: "sequential",
          },
        }
      }
    ])
    .toArray();
}

export async function searchTags(db, keywords) {
  keywords = keywords.split(' ').map(e=>{ return `*${e}*`; });
    return db
    .collection('tags')
    .aggregate([
      {
        $search: {
          index: 'tags',
          compound: {
            should: [{
              wildcard: {
                query: keywords,
                path: 'name',
                allowAnalyzedField: true,
              }
            }],
            mustNot: [{
              text: {
                query: [ 'items', 'year'],
                path: 'type',
              }
            }],
          }
        }
      }
      ])
      .toArray();
}

export async function getTags(db, type) {
  return db
    .collection('tags')
    .aggregate([
      {
        $search: {
          index: 'tags',
          text: { 
            query: type, 
            path: 'type', 
          },
        }
      }
    ])
    .sort(type == 'year' ? { 'name': -1 } : { 'name': 1 })
    .toArray();
}

export async function getTag(db, name) {
  return db
    .collection('tags')
    .findOne({ name })
}

export async function insertTag(db, tag) {
  await db.collection('tags').insertOne(tag);
  return tag;
}

export async function deleteTag(db, tag) {
  return db.collection('tags').deleteOne({ name: tag.name });
}
