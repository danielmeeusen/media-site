export async function findSite(db) {
  return db
    .collection('site')
    .find();
}