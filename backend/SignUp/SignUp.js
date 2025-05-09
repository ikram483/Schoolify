"use client"

import { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../api/axios"

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const login = () => {
    navigation.navigate("Login")
  }

  const handleRegister = async () => {
    // Basic validation checks
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !name.trim()) {
      setErrorMessage("Tous les champs sont requis")
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas")
      return
    }

    // Password length check
    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit comporter au moins 6 caractères")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage("Adresse email invalide")
      return
    }

    try {
      setLoading(true)
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        name,
      })

      // Stocker le token
      await AsyncStorage.setItem("token", response.data.token)

      setLoading(false)
      Alert.alert("Succès", "Inscription réussie!", [{ text: "OK", onPress: () => navigation.navigate("Login") }])
    } catch (error) {
      setLoading(false)
      console.error("Erreur d'inscription:", error)

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Erreur d'inscription")
      } else {
        setErrorMessage("Erreur de connexion au serveur")
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
          {/* Header with gradient */}
          <LinearGradient colors={["#1565c0", "#1e88e5", "#42a5f5"]} style={styles.headerGradient}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={60} color="#fff" />
              <Text style={styles.appName}>SCHOOLIFY</Text>
              <Text style={styles.appSlogan}>Créez votre compte académique</Text>
            </View>
          </LinearGradient>

          {/* Registration Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Inscription</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="person" size={20} color="#1565c0" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nom complet"
                placeholderTextColor="#78909c"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="user-alt" size={18} color="#1565c0" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                placeholderTextColor="#78909c"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={20} color="#1565c0" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#78909c"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="lock" size={18} color="#1565c0" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#78909c"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#78909c" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="lock" size={18} color="#1565c0" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#78909c"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#78909c" />
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegister} disabled={loading}>
              <LinearGradient colors={["#1565c0", "#1e88e5"]} style={styles.registerButton}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerText}>S'inscrire</Text>}
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Vous avez déjà un compte?</Text>
              <TouchableOpacity onPress={login}>
                <Text style={styles.loginLink}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
  },
  appSlogan: {
    fontSize: 14,
    color: "#e3f2fd",
    marginTop: 8,
    textAlign: "center",
  },
  formContainer: {
    marginTop: -20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    borderRadius: 12,
    marginBottom: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#e3f2fd",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#37474f",
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  registerButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#1565c0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#78909c",
    fontSize: 14,
    marginRight: 5,
  },
  loginLink: {
    color: "#1565c0",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default SignUp
