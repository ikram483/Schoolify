const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")
const cookieParser = require('cookie-parser')

// Configuration
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// Route de test
app.get("/", (req, res) => {
  res.send("API Schoolify fonctionne correctement")
})

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})
