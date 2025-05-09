import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const messages = [
  {
    id: '1',
    sender: 'Mme Dupont',
    content: 'Pensez à signer le cahier de liaison svp.',
    date: '2025-05-07',
  },
  {
    id: '2',
    sender: 'M. Bernard',
    content: 'Contrôle de maths prévu lundi.',
    date: '2025-05-06',
  },
  {
    id: '3',
    sender: 'Mme Garcia',
    content: 'Contrôle de PC.',
    date: '2025-06-20',
  },
  {
    id: '4',
    sender: 'Mme Garcia',
    content: 'N’oubliez pas vos calculatrices.',
    date: '2025-06-20',
  },
  {
    id: '5',
    sender: 'Mme Garcia',
    content: 'Correction des exercices demain.',
    date: '2025-06-21',
  },
];

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📩 Mes Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}</Text>
            <View style={styles.bubble}>
              <Text style={styles.content}>{item.content}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9', // gris très clair
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0d47a1',
  },
  messageContainer: {
    marginBottom: 14,
  },
  sender: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
    marginLeft: 8,
  },
  bubble: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    fontSize: 15,
    color: '#111827',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
    textAlign: 'right',
  },
});

export default MessagesScreen;
