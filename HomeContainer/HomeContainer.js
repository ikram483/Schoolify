import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeworkScreen from '../screens/HomeworkScreen';
import MessagesScreen from '../screens/MessagesScreen';
import PlanningScreen from '../screens/PlanningScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AccueilScreen = () => {
  const navigation = useNavigation();
  
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* En-tête avec dégradé */}
        <LinearGradient
          colors={['#1565c0', '#1e88e5', '#42a5f5']}
          style={styles.headerGradient}
        >
          <View style={styles.profileHeader}>
            <Image
              source={require('../assets/profile.jpg')} 
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.welcomeText}>Bienvenue</Text>
              <Text style={styles.profileName}>Ikram</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Menu rapide avec icônes */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Accès rapide</Text>
          <View style={styles.menuGrid}>
            {[
              { 
                label: 'Devoirs', 
                icon: <Ionicons name="book-outline" size={24} color="#ffffff" />, 
                screen: 'Accueil',
                color: '#4caf50' 
              },
              { 
                label: 'Planning', 
                icon: <FontAwesome5 name="calendar-alt" size={22} color="#ffffff" />, 
                screen: 'Agenda',
                color: '#ff9800' 
              },
              { 
                label: 'Notes', 
                icon: <Ionicons name="document-text-outline" size={24} color="#ffffff" />, 
                screen: 'Profil',
                color: '#f44336' 
              },
              { 
                label: 'Messages', 
                icon: <Ionicons name="chatbubble-ellipses-outline" size={24} color="#ffffff" />, 
                screen: 'Messages',
                color: '#2196f3' 
              },
            ].map((item, i) => (
              <TouchableOpacity 
                key={i} 
                style={[styles.menuItem, { backgroundColor: item.color }]} 
                onPress={() => handleNavigate(item.screen)}
              >
                <View style={styles.menuIcon}>{item.icon}</View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Prochains cours */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📅 Prochains cours</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[
              ['Mathématiques', 'M. Bernard', '9 Mai', '10h00', '#4caf50'],
              ['Histoire', 'Mme. Lemoine', '9 Mai', '14h00', '#ff9800'],
              ['Physique', 'Mme. Garcia', '10 Mai', '09h00', '#f44336'],
              ['Français', 'M. Lambert', '11 Mai', '11h00', '#2196f3'],
              ['Technologie', 'Mme. Meunier', '12 Mai', '13h00', '#9c27b0'],
              ['Anglais', 'M. Turner', '13 Mai', '10h30', '#009688'],
            ].map(([matiere, prof, date, heure, color], index) => (
              <View key={index} style={[styles.courseCard, { borderLeftColor: color }]}>
                <Text style={styles.courseSubject}>{matiere}</Text>
                <Text style={styles.courseTeacher}>{prof}</Text>
                <View style={styles.courseTimeContainer}>
                  <Ionicons name="calendar-outline" size={14} color="#666" />
                  <Text style={styles.courseDate}>{date}</Text>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.courseTime}>{heure}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Événements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Événements à venir</Text>
          <View style={styles.eventsList}>
            {[
              { event: 'Sortie scolaire au musée', date: '15 Mai', color: '#4caf50' },
              { event: 'Semaine de révisions', date: '20 au 24 Mai', color: '#ff9800' },
              { event: 'Journée sport', date: '26 Mai', color: '#f44336' },
              { event: 'Conseil de classe', date: '28 Mai', color: '#2196f3' },
            ].map((item, i) => (
              <View key={i} style={styles.eventCard}>
                <View style={[styles.eventColorTag, { backgroundColor: item.color }]} />
                <Text style={styles.eventName}>{item.event}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <View style={styles.notificationsList}>
            {[
              { icon: 'checkmark-circle', text: 'Absence justifiée du 6 Mai', color: '#4caf50', time: '2h' },
              { icon: 'stats-chart', text: 'Nouvelle note en Physique', color: '#f44336', time: '6h' },
              { icon: 'mail', text: 'Message de Mme Dupont', color: '#2196f3', time: '1j' },
              { icon: 'megaphone', text: 'Changement d\'horaire pour le 10 Mai', color: '#ff9800', time: '2j' },
            ].map((notif, i) => (
              <View key={i} style={styles.notificationCard}>
                <View style={[styles.notificationIcon, { backgroundColor: notif.color }]}>
                  <Ionicons name={notif.icon} size={18} color="#ffffff" />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationText}>{notif.text}</Text>
                  <Text style={styles.notificationTime}>{notif.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeContainer = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#1565c0',
      tabBarInactiveTintColor: '#78909c',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        elevation: 10,
        height: 60,
        paddingBottom: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: -5,
      },
    }}
  >
    <Tab.Screen 
      name="Accueil" 
      component={AccueilScreen} 
      options={{ 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ) 
      }} 
    />
    <Tab.Screen 
      name="Messages" 
      component={MessagesScreen} 
      options={{ 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubble-ellipses" size={size} color={color} />
        ),
        tabBarBadge: 3,
      }} 
    />
    <Tab.Screen 
      name="Agenda" 
      component={PlanningScreen} 
      options={{ 
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="calendar-alt" size={size-2} color={color} />
        ) 
      }} 
    />
    <Tab.Screen 
      name="Profil" 
      component={ProfileScreen} 
      options={{ 
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="account-circle" size={size+2} color={color} />
        ) 
      }} 
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#e3f2fd',
    marginBottom: 2,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuContainer: {
    marginTop: -30,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuItem: {
    width: '47%',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIcon: {
    marginBottom: 12,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  link: {
    fontSize: 14,
    color: '#1565c0',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginLeft: -5,
    marginRight: -5,
  },
  courseCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 6,
  },
  courseTeacher: {
    fontSize: 14,
    color: '#546e7a',
    marginBottom: 12,
  },
  courseTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  courseDate: {
    fontSize: 12,
    color: '#78909c',
    marginLeft: 4,
    marginRight: 8,
  },
  courseTime: {
    fontSize: 12,
    color: '#78909c',
    marginLeft: 4,
  },
  eventsList: {
    gap: 12,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 12,
  },
  eventColorTag: {
    width: 4,
    height: '80%',
    borderRadius: 4,
    marginRight: 12,
  },
  eventName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#37474f',
  },
  eventDate: {
    fontSize: 13,
    color: '#607d8b',
    fontWeight: '500',
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 12,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#37474f',
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 12,
    color: '#90a4ae',
    marginLeft: 8,
  },
});

export default HomeContainer;