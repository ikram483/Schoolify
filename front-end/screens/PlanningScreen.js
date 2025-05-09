import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome5,
  AntDesign 
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

const PlanningScreen = () => {
  // État initial avec des tâches et leurs statuts
  const [items, setItems] = useState({
    '2025-05-08': [
      { id: '1', name: 'Math - Chapitre 5', time: '08:00', status: 'done', notes: 'Réviser les équations différentielles' },
      { id: '2', name: 'Français - Dissertation', time: '14:00', status: 'doing', notes: 'Analyser le texte de Camus' }
    ],
    '2025-05-09': [
      { id: '3', name: 'Histoire - Révolution', time: '10:00', status: 'todo', notes: 'Préparer la présentation' },
      { id: '4', name: 'Anglais - Oral', time: '15:30', status: 'todo', notes: 'Pratiquer le dialogue' }
    ],
    '2025-05-10': [
      { id: '5', name: 'Physique - Optique', time: '12:00', status: 'doing', notes: 'Exercices sur les lentilles' }
    ],
    '2025-05-11': [
      { id: '6', name: 'SVT - Cellules', time: '09:00', status: 'todo', notes: 'Préparation TP microscopie' }
    ],
  });

  // États pour le modal et l'édition
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskStatus, setTaskStatus] = useState('todo');
  const [taskNotes, setTaskNotes] = useState('');
  const [selectedDay, setSelectedDay] = useState('2025-05-08');

  // Animation pour le FAB (Floating Action Button)
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Gérer le défilement de l'agenda
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 10) {
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Ouvrir le modal pour ajouter une nouvelle tâche
  const handleAddTask = (day) => {
    setModalVisible(true);
    setEditMode(false);
    setSelectedDate(day);
    setTaskName('');
    setTaskTime('');
    setTaskStatus('todo');
    setTaskNotes('');
  };

  // Ouvrir le modal pour éditer une tâche existante
  const handleEditTask = (item, day) => {
    setModalVisible(true);
    setEditMode(true);
    setSelectedDate(day);
    setEditItem(item);
    setTaskName(item.name);
    setTaskTime(item.time);
    setTaskStatus(item.status);
    setTaskNotes(item.notes || '');
  };

  // Supprimer une tâche
  const handleDeleteTask = (item, day) => {
    const updatedItems = { ...items };
    updatedItems[day] = updatedItems[day].filter(task => task.id !== item.id);
    
    // Si la journée ne contient plus de tâches, on peut supprimer la clé
    if (updatedItems[day].length === 0) {
      delete updatedItems[day];
    }
    
    setItems(updatedItems);
  };

  // Changer le statut d'une tâche
  const handleChangeStatus = (item, day) => {
    const statuses = ['todo', 'doing', 'done'];
    const currentIndex = statuses.indexOf(item.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    
    const updatedItems = { ...items };
    const taskIndex = updatedItems[day].findIndex(task => task.id === item.id);
    
    if (taskIndex !== -1) {
      updatedItems[day][taskIndex] = {
        ...updatedItems[day][taskIndex],
        status: nextStatus
      };
      
      setItems(updatedItems);
    }
  };

  // Sauvegarder les modifications ou créer une nouvelle tâche
  const handleSaveTask = () => {
    if (!taskName.trim() || !taskTime.trim()) {
      // Valider les champs obligatoires
      return;
    }
    
    const updatedItems = { ...items };
    
    if (editMode && editItem) {
      // Mise à jour d'une tâche existante
      const taskIndex = updatedItems[selectedDate].findIndex(task => task.id === editItem.id);
      
      if (taskIndex !== -1) {
        updatedItems[selectedDate][taskIndex] = {
          ...updatedItems[selectedDate][taskIndex],
          name: taskName,
          time: taskTime,
          status: taskStatus,
          notes: taskNotes
        };
      }
    } else {
      // Création d'une nouvelle tâche
      const newTask = {
        id: Math.random().toString(36).substring(2, 10), // ID unique simple
        name: taskName,
        time: taskTime,
        status: taskStatus,
        notes: taskNotes
      };
      
      if (updatedItems[selectedDate]) {
        updatedItems[selectedDate].push(newTask);
      } else {
        updatedItems[selectedDate] = [newTask];
      }
    }
    
    setItems(updatedItems);
    setModalVisible(false);
  };

  // Rendu d'une tâche dans l'agenda
  const renderItem = (item, day) => {
    // Déterminer la couleur en fonction du statut
    let statusColor;
    let statusIcon;
    let statusText;
    
    switch (item.status) {
      case 'done':
        statusColor = '#4caf50';
        statusIcon = 'checkmark-circle';
        statusText = 'Terminé';
        break;
      case 'doing':
        statusColor = '#ff9800';
        statusIcon = 'time';
        statusText = 'En cours';
        break;
      default:
        statusColor = '#2196f3';
        statusIcon = 'list';
        statusText = 'À faire';
    }
    
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[styles.item, { borderLeftColor: statusColor }]}
          onPress={() => handleEditTask(item, day)}
        >
          <View style={styles.itemHeader}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity
              style={[styles.statusBadge, { backgroundColor: statusColor }]}
              onPress={() => handleChangeStatus(item, day)}
            >
              <Ionicons name={statusIcon} size={14} color="#fff" />
              <Text style={styles.statusText}>{statusText}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.itemDetails}>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={16} color="#546e7a" />
              <Text style={styles.time}>{item.time}</Text>
            </View>
            
            {item.notes && (
              <Text style={styles.notes} numberOfLines={2}>
                {item.notes}
              </Text>
            )}
          </View>
          
          <View style={styles.itemActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEditTask(item, day)}
            >
              <Ionicons name="pencil" size={18} color="#1565c0" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteTask(item, day)}
            >
              <Ionicons name="trash-outline" size={18} color="#f44336" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Rendu du bouton "+" flottant
  const renderAddButton = () => {
    return (
      <Animated.View
        style={[
          styles.addButtonContainer,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddTask(selectedDay)}
        >
          <LinearGradient
            colors={['#1976d2', '#1565c0', '#0d47a1']}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Rendu du modal pour ajouter/éditer une tâche
  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <LinearGradient
                colors={['#1565c0', '#1e88e5']}
                style={styles.modalHeaderGradient}
              >
                <Text style={styles.modalTitle}>
                  {editMode ? 'Modifier la tâche' : 'Ajouter une tâche'}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Nom de la tâche *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Math - Exercices"
                value={taskName}
                onChangeText={setTaskName}
              />
              
              <Text style={styles.inputLabel}>Heure *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 14:30"
                value={taskTime}
                onChangeText={setTaskTime}
              />
              
              <Text style={styles.inputLabel}>Statut</Text>
              <View style={styles.statusSelector}>
                {['todo', 'doing', 'done'].map((status) => {
                  let statusColor;
                  let statusLabel;
                  
                  switch (status) {
                    case 'done':
                      statusColor = '#4caf50';
                      statusLabel = 'Terminé';
                      break;
                    case 'doing':
                      statusColor = '#ff9800';
                      statusLabel = 'En cours';
                      break;
                    default:
                      statusColor = '#2196f3';
                      statusLabel = 'À faire';
                  }
                  
                  return (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.statusOption,
                        taskStatus === status && { 
                          backgroundColor: statusColor,
                          borderColor: statusColor
                        }
                      ]}
                      onPress={() => setTaskStatus(status)}
                    >
                      <Text
                        style={[
                          styles.statusOptionText,
                          taskStatus === status && { color: '#fff' }
                        ]}
                      >
                        {statusLabel}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              <Text style={styles.inputLabel}>Notes (optionnel)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ajouter des détails sur la tâche..."
                value={taskNotes}
                onChangeText={setTaskNotes}
                multiline={true}
                numberOfLines={4}
              />
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveTask}
              >
                <LinearGradient
                  colors={['#1976d2', '#1565c0']}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>
                    {editMode ? 'Mettre à jour' : 'Ajouter'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#1565c0', '#1e88e5']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Agenda</Text>
          <Text style={styles.headerSubtitle}>Planifiez vos tâches et cours</Text>
        </LinearGradient>
      </View>
      
      <View style={styles.agendaContainer}>
        <Agenda
          items={items}
          selected={selectedDay}
          onDayPress={(day) => setSelectedDay(day.dateString)}
          theme={{
            agendaDayTextColor: '#1565c0',
            agendaDayNumColor: '#1565c0',
            agendaTodayColor: '#1976d2',
            agendaKnobColor: '#1565c0',
            backgroundColor: '#f5f7fa',
            calendarBackground: '#ffffff',
            dotColor: '#1565c0',
            selectedDayBackgroundColor: '#1565c0',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#1565c0',
            textSectionTitleColor: '#546e7a',
            monthTextColor: '#263238',
            dayTextColor: '#455a64',
            textDisabledColor: '#b0bec5'
          }}
          renderItem={(item, isFirst) => renderItem(item, selectedDay)}
          renderEmptyDate={() => (
            <View style={styles.emptyDate}>
              <Text style={styles.emptyDateText}>Aucune tâche pour ce jour</Text>
              <TouchableOpacity 
                style={styles.addSmallButton}
                onPress={() => handleAddTask(selectedDay)}
              >
                <Text style={styles.addSmallButtonText}>+ Ajouter</Text>
              </TouchableOpacity>
            </View>
          )}
          onCalendarToggled={(calendarOpened) => {
            // On peut ajouter des effets lors de l'ouverture/fermeture du calendrier
          }}
          onScroll={handleScroll}
          showClosingKnob={true}
          pastScrollRange={6}
          futureScrollRange={12}
        />
      </View>
      
      {renderAddButton()}
      {renderModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#1565c0',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 4,
  },
  agendaContainer: {
    flex: 1,
  },
  itemContainer: {
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
    marginLeft: 4,
  },
  itemDetails: {
    marginBottom: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  time: {
    fontSize: 14,
    color: '#546e7a',
    marginLeft: 6,
  },
  notes: {
    fontSize: 13,
    color: '#607d8b',
    marginTop: 6,
    fontStyle: 'italic',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f5f7fa',
    paddingTop: 12,
  },
  actionButton: {
    padding: 6,
    marginLeft: 16,
  },
  emptyDate: {
    height: 120,
    backgroundColor: '#f9fafc',
    borderRadius: 12,
    padding: 16,
    marginRight: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDateText: {
    fontSize: 14,
    color: '#90a4ae',
    marginBottom: 12,
  },
  addSmallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
  },
  addSmallButtonText: {
    fontSize: 14,
    color: '#1565c0',
    fontWeight: '500',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: windowWidth * 0.9,
    maxWidth: 450,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    overflow: 'hidden',
  },
  modalHeaderGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
    maxHeight: windowWidth * 1.2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455a64',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#37474f',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  statusSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#455a64',
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default PlanningScreen;