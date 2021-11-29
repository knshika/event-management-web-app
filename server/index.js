const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const authRoute = require("./routes/auth")

dotenv.config()

//connect to db
mongoose.connect(process.env.MONGODB_URL, () => console.log("Connected to db"))

//middleware
app.use(express.json())

//route middleware
app.use("/api/user", authRoute)

app.listen(3000, () => console.log("Server is up"))
