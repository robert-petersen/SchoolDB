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
  return db("students as s")
    .select("s.studentId", "s.username", "s.firstName", "s.lastName", "s.volunteerId", "s.needMeeting");
}

function findBy(filter) {
  return db("students as s")
    .select("s.studentId", "s.username", "s.firstName", "s.lastName", "s.volunteerId", "s.needMeeting", "s.password")
    .where(filter);
}

async function add(student) {
  await db("students").insert(student, "");
  const studentObj = await db("students").where("username", student.username).first()
  return studentObj;
}

function findById(id) {
  return db("students as s")
    .select("s.studentId", "s.username", "s.firstName", "s.lastName", "s.volunteerId", "s.needMeeting")
    .where("s.studentId", id)
    .first();
}

function remove(id) {
  return db("students as s")
    .where("s.studentId", id)
    .del();
}

function update(id, changes) {
  return db("students as s")
    .where("s.studentId", id)
    .update(changes, '*');
}