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
  return db("task-pairs as p")
    .join("tasks as t", "p.taskId", "=", "t.taskId")
    .select("p.taskPairId", "t.task as task", "p.studentId", "p.completed")
}

function findBy(filter) {
  return db("task-pairs as p")
    .join("tasks as t", "p.taskId", "=", "t.taskId")
    .select("p.taskPairId", "t.task as task", "p.studentId", "p.completed")
    .where(filter);
}

async function add(taskPair) {
  await db("task-pairs").insert(taskPair, "");
  return "Task Pair Created";
}

function findById(id) {
  return db("task-pairs as p")
    .select("p.taskPairId", "p.taskId", "p.studentId", "p.completed")
    .where("p.taskPairId", id)
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