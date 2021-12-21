/* eslint-disable no-empty */
const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const verifyToken = require("./helper/verifyToken")

const authRoute = require("./routes/auth")
const clubRoute = require("./routes/club")
const eventRoute = require("./routes/event")

dotenv.config()

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000

//middleware
app.use(express.json())
app.use(cors())

app.options("*", cors())

app.get("/", (req, res) => {
  res.send("Hello I'm up!")
})

//route middleware
//this middleware checks which user is accessing the routes using token and storing user value in request
app.use(async (req, res, next) => {
  try {
    const auth = req.headers["authorization"]
    if (auth) {
      const token = auth.replace("Bearer ", "")
      const user = await verifyToken(token)
      req.user = user
    }
  } catch (err) {}
  next()
})
app.use("/api/user", authRoute)
app.use("/api/club", clubRoute)
app.use("/api/event", eventRoute)

const main = async () => {
  // Connect to db
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("Connected to db")
  // Start the server
  app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`))
}

main().catch(console.log)
