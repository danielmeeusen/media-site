import { getMongoDb } from '@/api-lib/mongodb';

  handler.get(async (req, res) => {
    const db = await getMongoDb();
    
    const posts = await findPosts(
      db,
      req.query.from ? new Date(req.query.from) : undefined,
      req.query.keywords ? req.query.keywords : undefined,
      req.query.limit ? parseInt(req.query.limit, 12) : undefined,
      req.query.type || 'all',
      req.query.not ? req.query.not : undefined,
    );
    posts.map( post => {
      signPost( post );
    });
  
    res.send({ posts });
  });

export default handler;