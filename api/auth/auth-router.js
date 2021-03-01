const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const { jwtSecret } = require('../../config/secrets.js');
const Students = require("../models/students-model.js");
const Volunteers = require("../models/volunteers-model.js");
const Admins = require("../models/admins-model.js");

router.post("/register-student", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const newcredentials = {
      ...credentials,
      volunteerId: 1
    }
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(newcredentials.password, rounds);
    newcredentials.password = hash;
    Students.add(newcredentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: "Error adding new student!", errMessage: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username, password, and first & last names!",
    });
  }
});

router.post("/register-volunteer", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Volunteers.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: "Error adding new volunteer!", errMessage: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username, password, and first & last names!",
    });
  }
});

router.post("/register-admin", (req, res) => {
  const credentials = req.body;
  if (credentials.adminCode === process.env.ADMIN_CODE || "developmentPlaceholder") {
    if (adminIsValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcryptjs.hashSync(credentials.password, rounds);
      credentials.password = hash;
      Admins.add(credentials)
        .then(admin => {
          res.status(201).json({ data: admin });
        })
        .catch(error => {
          res.status(500).json({ message: "Error adding new admin!", errMessage: error.message });
        });
    } else {
      res.status(400).json({ message: "Please provide username and password!" });
    }
  } else {
    res.status(400).json({ message: "Invalid Admin Code!" })
  }
});

router.post("/login", (req, res) => {
  const role = req.body.role;
  const loginUser = {
    username: req.body.username,
    password: req.body.password
  }
  if (isValidLogin(loginUser)) {
    if (role === "student") {
      Students.findBy({ username: loginUser.username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(loginUser.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}`, token, role, username });
        } else {
          res.status(401).json({ message: "Invalid Credentials!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: `Error logging in ${role}!`, errMessage: error.message, recived: loginUser });
      });
    } else if (role === "volunteer") {
      Volunteers.findBy({ username: loginUser.username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(loginUser.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}`, token, role, username });
        } else {
          res.status(401).json({ message: "Invalid Credentials!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: `Error logging in ${role}!`, errMessage: error.message, recived: loginUser });
      });
    } else if (role === "admin") {
      Admins.findBy({ username: loginUser.username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(loginUser.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}`, token, role, username });
        } else {
          res.status(401).json({ message: "Invalid Credentials!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: `Error logging in ${role}!`, errMessage: error.message, recived: loginUser });
      });
    } else {
      res.status(400).json({ message: `Invalid role! "${role}" is not a valid role!` })
    }
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
    password: user.password,
  }
  const options = {
    expiresIn: "1d",
  }
  return jwt.sign(payload, jwtSecret, options)
}

function isValid(user) {
  return Boolean(
    user.username && 
    typeof user.username === "string" && 
    user.password && 
    typeof user.password === "string" &&
    user.firstName && 
    typeof user.firstName === "string" &&
    user.lastName && 
    typeof user.lastName === "string"
  );
}

function adminIsValid(user) {
  return Boolean(
    user.username && 
    typeof user.username === "string" && 
    user.password && 
    typeof user.password === "string"
  );
}

function isValidLogin(user) {
  return Boolean(
    user.username && 
    typeof user.username === "string" && 
    user.password && 
    typeof user.password === "string"
  );
}

module.exports = router;