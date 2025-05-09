import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Basic validation checks
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Tous les champs sont requis');
      return;
    }

    // Password length check
    if (password.length < 6) {
      setErrorMessage('Le mot de passe doit comporter au moins 6 caractères');
      return;
    }

    // Navigate to profile if validation passes
    navigation.navigate('ProfileInfo');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Header with gradient */}
          <LinearGradient
            colors={['#1565c0', '#1e88e5', '#42a5f5']}
            style={styles.headerGradient}
          >
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
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#78909c" 
                />
              </TouchableOpacity>
            </View>
            
            {/* Error Message */}
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            
            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
            </TouchableOpacity>
            
            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient
                colors={['#1565c0', '#1e88e5']}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>Se connecter</Text>
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  appSlogan: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: -20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    marginBottom: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#f44336',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#37474f',
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#1565c0',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1565c0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signUpText: {
    color: '#78909c',
    fontSize: 14,
    marginRight: 5,
  },
  signUpLink: {
    color: '#1565c0',
    fontSize: 14,
    fontWeight: '600',
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  socialLoginText: {
    color: '#78909c',
    fontSize: 14,
    marginBottom: 16,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Login;