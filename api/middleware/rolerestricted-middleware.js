module.exports = role => (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.role === role || req.decodedJwt.role === "admin") {
    next()
  } else {
    res.status(403).json('You have no power here! Admins Only!')
  }
}