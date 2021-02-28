const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("task-pairs as t")
    .select("t.taskPairId", "t.taskId", "t.studentId", "t.completed");
}

function findBy(filter) {
  return db("task-pairs as t")
    .select("t.taskPairId", "t.taskId", "t.studentId", "t.completed")
    .where(filter);
}

async function add(taskPair) {
  await db("task-pairs").insert(taskPair, "");
  return "Task Pair Created";
}

function findById(id) {
  return db("task-pairs as t")
    .select("t.taskPairId", "t.taskId", "t.studentId", "t.completed")
    .where("t.taskPairId", id)
    .first();
}

function remove(id) {
  return db("task-pairs as t")
    .where("t.taskPairId", id)
    .del();
}

function update(id, changes) {
  return db("task-pairs as t")
    .where("t.taskPairId", id)
    .update(changes, '*');
}