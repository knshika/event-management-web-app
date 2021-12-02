const router = require("express").Router()
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) => {
  //hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    ...req.body,
    password: hashedPassword,
  })

  try {
    await user.save()
    res.send({ user })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.post("/login", async (req, res) => {
  //checking if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ error: "Email does not exists" })

  //checking if password is correct using bcrypt
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send("Invalid password")

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.send({ user, token: `Bearer ${token}` })
})

module.exports = router
