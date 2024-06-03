const Database = require('../utils/db');
const { ObjectId } = require('mongodb');

async function findAll() {
  const db = await new Database().GetDb();

  return new Promise(async (resolve, reject) => {
    const tasks = await db
      .collection('task')
      .find({}, { sort: { _id: -1 } })
      .toArray();

    resolve(tasks);
  });
}
async function findById(id) {
  const db = await new Database().GetDb();

  return new Promise(async (resolve, reject) => {
    const task = await db.collection('task').findOne({ _id: new ObjectId(id) });

    resolve(task);
  });
}

async function create(task) {
  const db = await new Database().GetDb();

  return new Promise(async (resolve, reject) => {
    const result = await db.collection('task').insertOne(task);
    resolve(result);
  });
}

async function update(id, update) {
  const db = await new Database().GetDb();

  return new Promise(async (resolve, reject) => {
    const task = await db
      .collection('task')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnOriginal: false }
      );
    resolve(task);
  });
}

async function deleteById(id) {
  const db = await new Database().GetDb();

  return new Promise(async (resolve, reject) => {
    const result = await db
      .collection('task')
      .deleteOne({ _id: new ObjectId(id) });
    resolve(result);
  });
}

const TaskModel = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};

module.exports = TaskModel;
