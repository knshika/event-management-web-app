const checkSuperAdmin = (req, res, next) => {
  if (req.user && req.user.superAdmin === true) {
    next()
  } else {
    res.status(400).send({ error: "User must be super admin" })
  }
}

module.exports = checkSuperAdmin
