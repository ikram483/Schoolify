"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../api/axios"

const Login = ({ navigation, setUser, setId, setImage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    // Basic validation checks
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Tous les champs sont requis")
      return
    }

    // Password length check
    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit comporter au moins 6 caractères")
      return
    }

    try {
      setLoading(true)
      const response = await api.post("/auth/login", {
        username,
        password,
      })

      // Stocker le token et les informations utilisateur
      await AsyncStorage.setItem("token", response.data.token)

      // Si vous avez besoin de stocker d'autres informations utilisateur
      if (setUser) setUser(response.data.user.username)
      if (setId) setId(response.data.user.id)
      if (setImage) setImage(response.data.user.profileImage || "")

      setLoading(false)

      // Naviguer vers l'écran principal
      navigation.navigate("Home")
    } catch (error) {
      setLoading(false)
      console.error("Erreur de connexion:", error)

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Erreur de connexion")
      } else {
        setErrorMessage("Erreur de connexion au serveur")
      }
    }
  }

  const handleSignUp = () => {
    navigation.navigate("SignUp")
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
              <Text style={styles.appSlogan}>Connectez-vous à votre avenir académique</Text>
            </View>
          </LinearGradient>

          {/* Login Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Connexion</Text>

            {/* Username Input */}
            <View style={[styles.inputContainer, errorMessage && !username.trim() ? styles.inputError : null]}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={20} color="#1565c0" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                placeholderTextColor="#78909c"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, errorMessage && !password.trim() ? styles.inputError : null]}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#1565c0" />
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

            {/* Error Message */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              <LinearGradient colors={["#1565c0", "#1e88e5"]} style={styles.loginButton}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Se connecter</Text>}
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up Section */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Vous n'avez pas de compte?</Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>S'inscrire</Text>
              </TouchableOpacity>
            </View>

            {/* Social Login */}
            <View style={styles.socialLoginContainer}>
              <Text style={styles.socialLoginText}>Ou connectez-vous avec</Text>
              <View style={styles.socialIconsContainer}>
                <TouchableOpacity style={styles.socialIcon}>
                  <Ionicons name="logo-google" size={22} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Ionicons name="logo-facebook" size={22} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Ionicons name="logo-apple" size={22} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

// Les styles restent les mêmes que dans votre fichier original
const styles = StyleSheet.create({
  // ... Vos styles existants
})

export default Login
