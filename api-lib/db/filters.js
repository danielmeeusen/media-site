export async function findPeople(db) {
  return db
    .collection('people')
    .find()
    .toArray();
  }