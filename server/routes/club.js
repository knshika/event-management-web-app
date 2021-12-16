const router = require("express").Router()
const Club = require("../model/Club")
const User = require("../model/User")
const checkSuperAdmin = require("../helper/checkSuperAdmin")
const verifyClubAdmin = require("../helper/verifyClubAdmin")

router.post("/", checkSuperAdmin, async (req, res) => {
  try {
    const { name, admin_emails } = req.body
    const admins = []

    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec()
      admins.push(user._id)
    }

    const club = new Club({ name, admins })
    await club.save()
    res.send(club)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id }).populate("admins")

    res.send(club)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.post("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id })
    verifyClubAdmin(club, req.user)
    const { name } = req.body
    club.name = name
    await club.save()
    res.send(club)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

module.exports = router
