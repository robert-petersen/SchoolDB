const router = require("express").Router();
const Students = require("../models/students-model.js");
const Tasks = require("../models/tasks-model.js");
const TaskPairs = require("../models/taskPairs-model.js");
const restricted = require("../middleware/restricted-middleware.js");

router.get("/find-students/:volunteerId", restricted, (req, res) => {
  Students.findBy({ volunteerId: req.params.volunteerId })
    .then( students => {
      res.status(200).json({ data: students });
    })
    .catch( err => {
      res.status(500).json({ message: "Error finding students with this volunteer!", errMessage: err.message });
    });
});

router.put("/task-pairs/:taskPairId", restricted, (req, res) => {
  const body = req.body;
  if (isValidBoolean(body)) {
    TaskPairs.findById(req.params.taskPairId)
      .then( pair => {
        const updated = {
          ...body,
          taskPairId: pair.taskPairId,
          studentId: pair.studentId,
          taskId: pair.taskId
        }
        TaskPairs.update(req.params.taskPairId, updated)
          .then( pair => {
            res.status(201).json({ data: pair });
          })
          .catch( err => {
            res.status(500).json({ message: "Error updating task pair!", errMessage: err.message, recived: updated});
          });
      })
      .catch( err => {
        res.status(500).json({ message: "Error retrieving task pair!", errMessage: err.message });
      });
  } else {
    res.status(400).json({ message: "Please provide 'completed' (boolean)!" })
  }
});

router.get("/tasks", restricted, (req, res) => {
  Tasks.find()
    .then( tasks => {
      res.status(201).json({ data: tasks });
    })
    .catch( err => {
      res.status(500).json({ message: "Error getting tasks!", errMessage: err.message });
    });
});

router.post("/add-task-pair", restricted, (req, res) => {
  const body = req.body;
  if (isValid(body)) {
    const newobj = {
      ...body,
      completed: false
    }
    TaskPairs.add(newobj)
      .then( taskpair => {
        res.status(201).json({ data: taskpair });
      })
      .catch( err => {
        res.status(500).json({ message: "Error creating task pair!", errMessage: err.message });
      });
  } else {
    res.status(400).json({ message: "Please provide studentId (#) and taskId (#)!" });
  }
});

router.delete("/task-pairs/:taskPairId", restricted, (req, res) => {
  TaskPairs.remove(req.params.taskPairId)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The pair has been deleted" });
    } else {
      res.status(404).json({ message: "The pair could not be found" });
    }
  })
  .catch(error => {
    res.status(500).json({ message: "Error deleting the pair", errMessage: err.message });
  });
});

function isValidBoolean(info) {
  return Boolean(
    info.completed
  );
}

function isValid(info) {
  return Boolean(
    info.volunteerId &&
    info.taskId
  );
}

module.exports = router;