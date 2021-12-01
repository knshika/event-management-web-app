const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const authRoute = require("./routes/auth")

dotenv.config()

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000

//middleware
app.use(express.json())
app.use(cors())

//route middleware
app.use("/api/user", authRoute)

const main = async () => {
  // Connect to db
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("Connected to db")
  // Start the server
  app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`))
}

main().catch(console.log)
