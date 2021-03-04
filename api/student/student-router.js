const router = require("express").Router();
const Students = require("../models/students-model.js");
const Volunteers = require("../models/volunteers-model.js");
const TaskPairs = require("../models/taskPairs-model.js");
const restricted = require("../middleware/restricted-middleware.js");

router.get("/volunteers", restricted, (req, res) => {
  Volunteers.find()
    .then( volunteers => {
      res.status(200).json({ data: volunteers });
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving volunteers", errMessage: err.message });
    });
});

router.get("/:studentId", (req, res) => {
  Students.findById(req.params.studentId)
    .then( student => {
      res.status(200).json({ data: student });
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving student", errMessage: err.message });
    });
});

router.get("/volunteers/:volunteerId", (req, res) => {
  Volunteers.findById(req.params.volunteerId)
    .then( volunteer => {
      res.status(200).json({ data: volunteer });
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving volunteer", errMessage: err.message });
    });
});

router.put("/:studentId", restricted, (req, res) => {
  const body = req.body;
  // if (isValid(body)) {
    Students.findById(req.params.studentId)
      .then( student => {
        const updated = {
          ...body,
          studentId: student.studentId,
          username: student.username,
          firstName: student.firstName,
          lastName: student.lastName,
          password: student.password
        }
        Students.update(req.params.studentId, updated)
          .then( student => {
            res.status(201).json({ data: student });
          })
          .catch( err => {
            res.status(500).json({ message: "Error updating student!", errMessage: err.message });
          });
      })
      .catch( err => {
        res.status(500).json({ message: "Error retrieving student!", errMessage: err.message });
      });
  // } else {
  //   res.status(400).json({ message: "Please provide volunteerId (#) and needMeeting (boolean)!", recived: body });
  // }
});

router.get("/:volunteerId/tasks", restricted, (req, res) => {
  TaskPairs.findBy({ volunteerId: req.params.volunteerId })
    .then( tasks => {
      res.status(200).json({ data: tasks });
    })
    .catch( err => {
      res.status(500).json({ message: "Error finding tasks for this student!", errMessage: err.message });
    });
});

function isValid(student) {
  return Boolean(
    student.needMeeting
  );
}

module.exports = router;