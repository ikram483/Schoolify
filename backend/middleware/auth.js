// const jwt = require("jsonwebtoken")

// module.exports = (req, res, next) => {
//   // Récupérer le token du header
//   const token = req.authorize.header

//   // Vérifier si le token existe
//   if (!token) {
//     return res.status(401).json({ message: "Pas de token, autorisation refusée" })
//   }

//   try {
//     // Vérifier le token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     // Ajouter l'utilisateur à la requête
//     req.user = decoded.user
//     next()
//   } catch (err) {
//     res.status(401).json({ message: "Token invalide" })
//   }
// }


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  
  // Check if header exists and uses Bearer format
  if (!req.cookies) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  
  const token = req.cookies.token;

  try {
    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded; // attach user payload to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
