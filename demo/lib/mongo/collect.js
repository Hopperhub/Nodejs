const { MongoClient } = require('mongodb');
const mongodbUrl = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(mongodbUrl)

const DB = {};
const dbName = 'demo';
const userCollectName = 'user';

const init = () => {
  if (DB.db) {
    return Promise.reject('fail: has inited');
  }

  return client.connect().then(() => {
    const db = client.db(dbName);
    const collection = db.collection(userCollectName);

    DB.db = db;
    DB.userCollect = collection;

    process.on('exit', () => {
      db.close();
    });

    console.log('success: inited');
  }).catch((err) => {
    console.log('err:', err)
  });
}

init();