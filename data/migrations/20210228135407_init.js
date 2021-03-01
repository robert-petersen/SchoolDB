
exports.up = function(knex) {
  return knex.schema
    .createTable("admins", tbl => {
      tbl.increments("adminId");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
    })
    .createTable("volunteers", tbl => {
      tbl.increments("volunteerId");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("firstName", 128).notNullable();
      tbl.string("lastName", 128).notNullable();
      tbl.string("password", 128).notNullable();
    })
    .createTable("students", tbl => {
      tbl.increments("studentId");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("firstName", 128).notNullable();
      tbl.string("lastName", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl.boolean("needMeeting").defaultTo(false);
      tbl
        .integer("volunteerId")
        .unsigned()
        .references("volunteers.volunteerId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("tasks", tbl => {
      tbl.increments("taskId");
      tbl.string("task", 128).notNullable().unique();
    })
    .createTable("task-pairs", tbl => {
      tbl.increments("taskPairId");
      tbl
        .integer("studentId")
        .unsigned()
        .references("students.studentId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("taskId")
        .unsigned()
        .references("tasks.taskId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.boolean("completed").defaultTo(false);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("task-pairs")
    .dropTableIfExists("tasks")
    .dropTableIfExists("students")
    .dropTableIfExists("volunteers")
    .dropTableIfExists("admins");
};
