import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeworkScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Mes Devoirs</Text>
      {/* Ici tu ajoutes la logique de récupération et d'affichage des devoirs */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeworkScreen;
