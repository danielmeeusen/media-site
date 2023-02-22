import nc from 'next-connect';
import date from 'date-and-time';

import { findPosts, insertPost, updatePostById, signPost, getBunnyInfo, deletePostById, insertTag, getTag, encodeVideo } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { formatTag } from '@/lib/post';

// mainInfo:
// {
//   videoLibraryId: 28034,
//   guid: 'abd09c73-5abb-4b3b-8910-cc0775c0eaab',
//   title: '022516a1080.mp4',
//   dateUploaded: '2022-11-05T04:22:01.922',
//   views: 0,
//   isPublic: false,
//   length: 1061,
//   status: 4,
//   framerate: 29.97,
//   width: 1920,
//   height: 1080,
//   availableResolutions: '360p,720p,1080p',
//   thumbnailCount: 539,
//   encodeProgress: 100,
//   storageSize: 894028192,
//   captions: [],
//   hasMP4Fallback: false,
//   collectionId: 'f6d2301c-40e3-41b1-8b04-1c78bcf8e500',
//   thumbnailFileName: 'thumbnail.jpg',
//   averageWatchTime: 0,
//   totalWatchTime: 0,
//   category: 'unknown',
//   chapters: [],
//   moments: [],
//   metaTags: []
// }

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await getMongoDb();
  
  const posts = await findPosts(
    db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.keywords ? req.query.keywords : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined,
    req.query.type || 'all',
    req.query.not ? req.query.not : undefined,
    req.query.sort ? req.query.sort : 'new',
    req.query.code ? req.query.code : undefined,
    req.query.index ? req.query.index : undefined,
  );

  posts.map( post => {
    signPost( post );
  });

  res.send({ posts });
});

handler.post(
  ...auths,
  async (req, res) => {
    if (!req.user.creator) {
      return res.status(401).send('unauthenticated');
    }
    const db = await getMongoDb();

    let body = req.body.newPost;

    const mainInfo = await getBunnyInfo(process.env.BUNNY_MEDIA_LIBRARY_ID, body.mainVideoId, process.env.BUNNY_MEDIA_API_KEY);
    if(!mainInfo){
      return res.status(401).send('Inaccurate Main Video Id');
    }
    const promoInfo = await getBunnyInfo(process.env.BUNNY_PROMO_LIBRARY_ID, body.promoVideoId, process.env.BUNNY_PROMO_API_KEY);
    if(!promoInfo){
      return res.status(401).send('Inaccurate Promo Video Id');
    }

    body.title = formatTag(body.title);

    const year = body.shootDate.split(' ')[2];
    if(!body.tags.includes(year)) {
      body.tags.push(year);
    }
    body.tags = body.tags.filter(n=>n);
    body.tags.sort();
    const yearTag = await getTag(db, year);
    if(year && !yearTag) await insertTag(db, { name: year, type: 'year' });

    body.people = body.people.filter(n=>n);

    body.people.sort();

    body.shootCode = date.format(new Date(body.shootDate), 'MMDDYY');
    body.videoCode = mainInfo.title;
    body.publishDate = new Date(body.publishDate);
    body.shootDate = new Date(body.shootDate);
    body.lastUpdated = new Date();
    body.videoLength = mainInfo.length;
    body.availableResolutions = mainInfo.availableResolutions.split(',');
    const post = await insertPost(db, body);

    return res.json(post);
  }
);

handler.patch(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
    const db = await getMongoDb();

    let body = req.body.editPost;
    
    const mainInfo = await getBunnyInfo(process.env.BUNNY_MEDIA_LIBRARY_ID, body.mainVideoId, process.env.BUNNY_MEDIA_API_KEY);
    if(!mainInfo){
      return res.status(401).send('Inaccurate Main Video Id');
    }
    const promoInfo = await getBunnyInfo(process.env.BUNNY_PROMO_LIBRARY_ID, body.promoVideoId, process.env.BUNNY_PROMO_API_KEY);
    if(!promoInfo){
      return res.status(401).send('Inaccurate Promo Video Id');
    }
    if(req.body.encode) {
      const encode = await encodeVideo(process.env.BUNNY_MEDIA_LIBRARY_ID, body.mainVideoId, process.env.BUNNY_MEDIA_API_KEY);
    }
    body.title = formatTag(body.title);

    const year = body.shootDate.split(' ')[2];
    if(!body.tags.includes(year)) {
      body.tags.push(year);
    }
    body.tags = body.tags.filter(n=>n);
    body.tags.sort();
    const yearTag = await getTag(db, year);
    if(year && !yearTag) await insertTag(db, { name: year, type: 'year' });

    body.people = body.people.filter(n=>n);
    body.people.sort();
    
    body.shootCode = date.format(new Date(body.shootDate), 'MMDDYY');
    body.videoCode = mainInfo.title;
    body.publishDate = new Date(body.publishDate);
    body.shootDate = new Date(body.shootDate);
    body.lastUpdated = new Date();
    body.videoLength = mainInfo.length;
    body.availableResolutions = mainInfo.availableResolutions.split(',');

  const post = await updatePostById(db, req.body.editPost._id, {
    ...{ title: body.title },
    ...{ people: body.people },
    ...{ tags: body.tags },
    ...{ sponsors: body.sponsors },
    ...{ publishDate: body.publishDate },
    ...{ shootDate: body.shootDate },
    ...{ lastUpdated: body.lastUpdated },
    ...{ videoThumbnail: body.videoThumbnail },
    ...{ images: body.images },
    ...{ promoVideoId: body.promoVideoId },
    ...{ mainVideoId: body.mainVideoId },
    ...{ videoLength: body.videoLength },
    ...{ shootCode: body.shootCode },
    ...{ videoCode: body.videoCode },
    ...{ availableResolutions: body.availableResolutions },
    ...{ featured: body.featured }
  });
  
  return res.json({ post });
  }
)

handler.delete(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
    const db = await getMongoDb();

    const post = await deletePostById(db, req.body.id);

    return res.json({ post });
  }
)

export default handler;
