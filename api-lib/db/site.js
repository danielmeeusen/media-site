export async function findSite(db) {
  return db
    .collection('site')
    .findOne({ sitename: 'Media Site' })
    .then((site) => site);
}