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
  return db("tasks as t")
    .select("t.taskId", "t.task");
}

function findBy(filter) {
  return db("tasks as t")
    .select("t.taskId", "t.task")
    .where(filter);
}

async function add(task) {
  await db("tasks").insert(task, "");
  const taskObj = await db("tasks").where("task", task.task).first()
  return taskObj;
}

function findById(id) {
  return db("tasks as t")
    .select("t.taskId", "t.task")
    .where("t.taskId", id)
    .first();
}

function remove(id) {
  return db("tasks as t")
    .where("t.taskId", id)
    .del();
}

function update(id, changes) {
  return db("tasks as t")
    .where("t.taskId", id)
    .update(changes, '*');
}