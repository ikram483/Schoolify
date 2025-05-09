# Schoolify Backend API

API backend pour l'application mobile Schoolify, développée avec Express.js et MongoDB.

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Créez un fichier `.env` à la racine du projet avec les variables suivantes:
   \`\`\`
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/schoolify
   JWT_SECRET=votre_secret_jwt_super_securise
   \`\`\`
4. Démarrez le serveur avec `npm run dev`

## Routes API

### Authentification

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion d'un utilisateur
- `GET /api/auth/me` - Obtenir les informations de l'utilisateur connecté
- `PUT /api/auth/profile` - Mettre à jour le profil de l'utilisateur

### Tâches (Planning)

- `GET /api/tasks` - Obtenir toutes les tâches de l'utilisateur
- `GET /api/tasks/date/:date` - Obtenir les tâches pour une date spécifique
- `GET /api/tasks/dates` - Obtenir toutes les dates avec des tâches
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

## Authentification

Toutes les routes protégées nécessitent un token JWT dans l'en-tête `x-auth-token`.

## Format des données

### Utilisateur
\`\`\`json
{
  "username": "utilisateur",
  "email": "utilisateur@example.com",
  "password": "motdepasse",
  "name": "Nom Complet",
  "classe": "Terminale S",
  "etablissement": "Lycée International",
  "dateNaissance": "15 Septembre 2007"
}
\`\`\`

### Tâche
\`\`\`json
{
  "name": "Math - Chapitre 5",
  "date": "2025-05-08",
  "time": "08:00",
  "status": "todo",
  "notes": "Réviser les équations différentielles"
}
