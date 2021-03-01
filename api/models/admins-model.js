const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function find() {
  return db("admins as a")
    .select("a.adminId", "a.username");
}

function findBy(filter) {
  return db("admins as a")
    .select("a.adminId", "a.username", "a.password")
    .where(filter);
}

async function add(admin) {
  await db("admins").insert(admin, "");
  const adminObj = await db("admins").where("username", admin.username).first()
  return adminObj;
}

function findById(id) {
  return db("admins as a")
    .select("a.adminId", "a.username")
    .where("a.adminId", id)
    .first();
}

function remove(id) {
  return db("admins as a")
    .where("a.adminId", id)
    .del();
}