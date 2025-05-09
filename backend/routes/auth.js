const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const auth = require("../middleware/auth")

// Middleware pour vérifier le token JWT
const authMiddleware = require("../middleware/auth")

// Route d'inscription
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, name } = req.body

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" })
    }

    // Créer un nouvel utilisateur
    user = new User({
      username,
      email,
      password,
      name,
    })

    await user.save()

    // Générer un token JWT
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: "Identifiants invalides" })
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants invalides" })
    }

    // Générer un token JWT
    const payload = {
      user: user.id,
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err
      res.cookie("token",token, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 1800000, 
      })
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          classe: user.classe,
          etablissement: user.etablissement,
          dateNaissance: user.dateNaissance,
          profileImage: user.profileImage,
        },
      })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour obtenir les informations de l'utilisateur
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

// Route pour mettre à jour le profil
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, classe, etablissement, dateNaissance, profileImage } = req.body

    // Construire l'objet de mise à jour
    const profileFields = {}
    if (name) profileFields.name = name
    if (classe) profileFields.classe = classe
    if (etablissement) profileFields.etablissement = etablissement
    if (dateNaissance) profileFields.dateNaissance = dateNaissance
    if (profileImage) profileFields.profileImage = profileImage

    // Mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(req.user.id, { $set: profileFields }, { new: true }).select("-password")

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Erreur serveur")
  }
})

module.exports = router
