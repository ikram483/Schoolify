const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
// const auth = require("../middleware/auth")

// Middleware pour vérifier le token JWT
const authMiddleware = require("../middleware/auth")

// Route pour obtenir toutes les tâches d'un utilisateur
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: 1, time: 1 })
    res.json(tasks)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour obtenir les tâches par date
router.get("/date/:date", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      date: req.params.date,
    }).sort({ time: 1 })

    res.json(tasks)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour obtenir les dates avec des tâches
router.get("/dates", authMiddleware, async (req, res) => {
  try {
    // Trouver toutes les dates uniques où l'utilisateur a des tâches
    const tasks = await Task.find({ user: req.user.id }).distinct("date")

    // Formater les résultats pour l'agenda
    const markedDates = {}
    tasks.forEach((date) => {
      markedDates[date] = { marked: true, dotColor: "#1565c0" }
    })

    res.json(markedDates)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour créer une tâche
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log(req.user.user)
    const { name, date, time, status, notes } = req.body

    // Créer une nouvelle tâche
    const newTask = new Task({
      user: req.user.user,
      name,
      date,
      time,
      status,
      notes,
    })

    const task = await newTask.save()
    res.json(task)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour mettre à jour une tâche
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, date, time, status, notes } = req.body

    // Construire l'objet de mise à jour
    const taskFields = {}
    if (name) taskFields.name = name
    if (date) taskFields.date = date
    if (time) taskFields.time = time
    if (status) taskFields.status = status
    if (notes !== undefined) taskFields.notes = notes

    // Vérifier si la tâche existe
    let task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" })

    // Vérifier si l'utilisateur est autorisé
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Non autorisé" })
    }

    // Mettre à jour la tâche
    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true })

    res.json(task)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour supprimer une tâche
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Vérifier si la tâche existe
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" })

    // Vérifier si l'utilisateur est autorisé
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Non autorisé" })
    }

    // Supprimer la tâche
    await Task.findByIdAndRemove(req.params.id)
    res.json({ message: "Tâche supprimée" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

module.exports = router
