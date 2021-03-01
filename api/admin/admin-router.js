const router = require("express").Router();
const Students = require("../models/students-model.js");
const Tasks = require("../models/tasks-model.js");
const Volunteers = require("../models/volunteers-model.js");
const restricted = require("../middleware/restricted-middleware.js");

router.post("/create-task", restricted, (req, res) => {
  if (isValid(req.body)) {
    Tasks.add(req.body)
      .then( task => {
        res.status(201).json({ body: task });
      })
      .catch( err => {
        res.status(500).json({ message: "Error creating task!", errMessage: err.message });
      });
  } else {
    res.status(400).json({ message: "Please provide task (string)!" })
  }
});

router.delete("/delete-student/:studentId", restricted, (req, res) => {
  Students.remove(req.params.studentId)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The student has been deleted" });
      } else {
        res.status(404).json({ message: "The student could not be found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error deleting the student", errMessage: err.message });
    });
});

router.delete("/delete-volunteer/:volunteerId", restricted, (req, res) => {
  Volunteers.remove(req.params.studentId)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The Volunteer has been deleted" });
      } else {
        res.status(404).json({ message: "The Volunteer could not be found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error deleting the Volunteer", errMessage: err.message });
    });
});

function isValid(info) {
  return Boolean(
    info.task && 
    typeof info.task === "string"
  );
}

module.exports = router;