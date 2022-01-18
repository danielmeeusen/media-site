export async function getFilter(db, filter) {
  return db
    .collection(filter)
    .find()
    .toArray();
  }