import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={'https://img.freepik.com/vecteurs-premium/illustration-du-batiment-ecole_638438-385.jpg?semt=ais_hybrid&w=740'} style={styles.image} />

        <Text style={styles.mainTitle}>🎓 Vie Scolaire Management</Text>
        <Text style={styles.subTitle}>Organise ta vie scolaire en toute simplicité</Text>

        <View style={styles.featuresBox}>
          <Text style={styles.feature}>✅ Gérer ses tâches par matière, date, statut</Text>
          <Text style={styles.feature}>📅 Visualiser son agenda scolaire</Text>
          <Text style={styles.feature}>🔔 Recevoir des rappels (bonus)</Text>
          <Text style={styles.feature}>🔐 Sauvegarder ses données avec un compte sécurisé</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Défi 7 jours | React Native + Node + MongoDB</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#f0f0f0',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  feature: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#3a7bd5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    color: '#eee',
    fontSize: 12,
    marginTop: 10,
  },
});

export default WelcomeScreen;
