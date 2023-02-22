export async function findSite(db) {
  return db
    .collection('site')
    .findOne({ siteName: 'MediaSite' })
    .then((site) => site);
}