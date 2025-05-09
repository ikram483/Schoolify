import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Créer une instance axios avec l'URL de base
const api = axios.create({
  baseURL: "http://192.168.1.100:5000/api", // Remplacez par l'IP de votre serveur local
  headers: {
    "Content-Type": "application/json",
  },
})

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      config.headers["x-auth-token"] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
