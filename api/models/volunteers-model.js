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
  return db("volunteers as v")
    .select("v.volunteerId", "v.username", "v.firstName", "v.lastName");
}

function findBy(filter) {
  return db("volunteers as v")
    .select("v.volunteerId", "v.username", "v.firstName", "v.lastName", "v.password")
    .where(filter);
}

async function add(volunteer) {
  await db("volunteers").insert(volunteer, "");
  const volunteerObj = await db("volunteers").where("username", volunteer.username).first()
  return volunteerObj;
}

function findById(id) {
  return db("volunteers as v")
    .select("v.volunteerId", "v.username", "v.firstName", "v.lastName")
    .where("v.volunteerId", id)
    .first();
}

function remove(id) {
  return db("volunteers as v")
    .where("v.volunteerId", id)
    .del();
}

function update(id, changes) {
  return db("volunteers as v")
    .where("v.volunteerId", id)
    .update(changes, '*');
}