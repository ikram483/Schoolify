import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const user = {
  name: 'Ikram Labhaji',
  email: 'ikramlabhaji@gmail.com',
  classe: 'Terminale S',
  etablissement: 'Lycée International',
  dateNaissance: '15 Septembre 2007',
  avatar: require('../assets/profile.jpg'),
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* En-tête avec gradient */}
        <LinearGradient
          colors={['#1565c0', '#1e88e5', '#42a5f5']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
            
            <Image source={user.avatar} style={styles.avatar} />
            
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.classe}>{user.classe}</Text>
            
            <View style={styles.infoChips}>
              <View style={styles.infoChip}>
                <Ionicons name="mail-outline" size={16} color="#fff" />
                <Text style={styles.infoChipText}>{user.email}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Informations personnelles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="person" size={18} color="#1565c0" /> Informations personnelles
            </Text>
          </View>
          
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <View style={styles.infoItemIconContainer}>
                <Ionicons name="school-outline" size={20} color="#1565c0" />
              </View>
              <View style={styles.infoItemContent}>
                <Text style={styles.infoItemLabel}>Établissement</Text>
                <Text style={styles.infoItemValue}>{user.etablissement}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.infoItemIconContainer}>
                <Ionicons name="calendar-outline" size={20} color="#1565c0" />
              </View>
              <View style={styles.infoItemContent}>
                <Text style={styles.infoItemLabel}>Date de naissance</Text>
                <Text style={styles.infoItemValue}>{user.dateNaissance}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.infoItemIconContainer}>
                <Ionicons name="mail-outline" size={20} color="#1565c0" />
              </View>
              <View style={styles.infoItemContent}>
                <Text style={styles.infoItemLabel}>Email</Text>
                <Text style={styles.infoItemValue}>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* À propos de moi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="book" size={18} color="#1565c0" /> À propos de moi
            </Text>
          </View>
          <Text style={styles.aboutText}>
            Élève motivée en Terminale S, passionnée par les sciences et l'innovation. 
            Aime apprendre, partager et relever de nouveaux défis académiques.
          </Text>
        </View>

        {/* Statistiques */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="stats-chart" size={18} color="#1565c0" /> Statistiques
            </Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#e3f2fd' }]}>
                <Ionicons name="book-outline" size={24} color="#1565c0" />
              </View>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Devoirs</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#e8f5e9' }]}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4caf50" />
              </View>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Messages</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#fff3e0' }]}>
                <Ionicons name="calendar-outline" size={24} color="#ff9800" />
              </View>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Cours à venir</Text>
            </View>
          </View>
        </View>

        {/* Résultats scolaires */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <FontAwesome5 name="chart-line" size={16} color="#1565c0" /> Résultats scolaires
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.gradesList}>
            {[
              { matiere: 'Mathématiques', note: '18/20', date: '15 Avril 2025', color: '#4caf50' },
              { matiere: 'Physique-Chimie', note: '16/20', date: '22 Avril 2025', color: '#ff9800' },
              { matiere: 'SVT', note: '15/20', date: '28 Avril 2025', color: '#f44336' },
            ].map((item, index) => (
              <View key={index} style={styles.gradeItem}>
                <View style={[styles.gradeColorBar, { backgroundColor: item.color }]} />
                <View style={styles.gradeContent}>
                  <Text style={styles.gradeMatiere}>{item.matiere}</Text>
                  <Text style={styles.gradeDate}>{item.date}</Text>
                </View>
                <Text style={styles.gradeNote}>{item.note}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="settings-outline" size={22} color="#1565c0" />
            </View>
            <Text style={styles.optionText}>Paramètres</Text>
            <Ionicons name="chevron-forward" size={20} color="#78909c" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#1565c0" />
            </View>
            <Text style={styles.optionText}>Confidentialité</Text>
            <Ionicons name="chevron-forward" size={20} color="#78909c" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="help-circle-outline" size={22} color="#1565c0" />
            </View>
            <Text style={styles.optionText}>Aide & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#78909c" />
          </TouchableOpacity>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
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
    paddingBottom: 30,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  classe: {
    fontSize: 16,
    color: '#e3f2fd',
    marginBottom: 16,
  },
  infoChips: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  infoChipText: {
    color: '#ffffff',
    marginLeft: 6,
    fontSize: 14,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
    fontWeight: '600',
    color: '#263238',
  },
  seeAllText: {
    fontSize: 14,
    color: '#1565c0',
    fontWeight: '500',
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoItemContent: {
    flex: 1,
  },
  infoItemLabel: {
    fontSize: 12,
    color: '#78909c',
    marginBottom: 2,
  },
  infoItemValue: {
    fontSize: 15,
    color: '#37474f',
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#455a64',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#78909c',
  },
  gradesList: {
    gap: 12,
  },
  gradeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 12,
  },
  gradeColorBar: {
    width: 4,
    height: '80%',
    borderRadius: 2,
    marginRight: 12,
  },
  gradeContent: {
    flex: 1,
  },
  gradeMatiere: {
    fontSize: 15,
    fontWeight: '500',
    color: '#37474f',
    marginBottom: 4,
  },
  gradeDate: {
    fontSize: 12,
    color: '#78909c',
  },
  gradeNote: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },
  optionsSection: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f7fa',
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#37474f',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ProfileScreen;