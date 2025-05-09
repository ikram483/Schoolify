"use client"

import { useState, useRef, useEffect } from "react"
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
  Dimensions,
  Alert,
} from "react-native"
import { Agenda } from "react-native-calendars"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import api from "../api/axios"

const windowWidth = Dimensions.get("window").width

const PlanningScreen = () => {
  // État pour les tâches
  const [items, setItems] = useState({})
  const [markedDates, setMarkedDates] = useState({})

  // États pour le modal et l'édition
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [editItem, setEditItem] = useState(null)
  const [taskName, setTaskName] = useState("")
  const [taskTime, setTaskTime] = useState("")
  const [taskStatus, setTaskStatus] = useState("todo")
  const [taskNotes, setTaskNotes] = useState("")
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split("T")[0])
  const [loading, setLoading] = useState(false)

  // Animation pour le FAB (Floating Action Button)
  const fadeAnim = useRef(new Animated.Value(1)).current

  // Charger les tâches au démarrage
  useEffect(() => {
    fetchTasks()
    fetchMarkedDates()
  }, [])

  // Charger les tâches pour une date spécifique
  useEffect(() => {
    if (selectedDay) {
      fetchTasksByDate(selectedDay)
    }
  }, [selectedDay])

  // Récupérer toutes les tâches
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await api.get("/tasks")

      // Formater les données pour l'Agenda
      const formattedItems = {}
      response.data.forEach((task) => {
        if (!formattedItems[task.date]) {
          formattedItems[task.date] = []
        }
        formattedItems[task.date].push({
          id: task._id,
          name: task.name,
          time: task.time,
          status: task.status,
          notes: task.notes || "",
        })
      })

      setItems(formattedItems)
      setLoading(false)
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error)
      Alert.alert("Erreur", "Impossible de charger les tâches")
      setLoading(false)
    }
  }

  // Récupérer les dates marquées
  const fetchMarkedDates = async () => {
    try {
      const response = await api.get("/tasks/dates")
      setMarkedDates(response.data)
    } catch (error) {
      console.error("Erreur lors du chargement des dates:", error)
    }
  }

  // Récupérer les tâches pour une date spécifique
  const fetchTasksByDate = async (date) => {
    try {
      const response = await api.get(`/tasks/date/${date}`)

      // Formater les données pour l'Agenda
      const formattedItems = { ...items }
      formattedItems[date] = response.data.map((task) => ({
        id: task._id,
        name: task.name,
        time: task.time,
        status: task.status,
        notes: task.notes || "",
      }))

      setItems(formattedItems)
    } catch (error) {
      console.error(`Erreur lors du chargement des tâches pour ${date}:`, error)
    }
  }

  // Gérer le défilement de l'agenda
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y
    if (scrollY > 10) {
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }

  // Ouvrir le modal pour ajouter une nouvelle tâche
  const handleAddTask = (day) => {
    setModalVisible(true)
    setEditMode(false)
    setSelectedDate(day)
    setTaskName("")
    setTaskTime("")
    setTaskStatus("todo")
    setTaskNotes("")
  }

  // Ouvrir le modal pour éditer une tâche existante
  const handleEditTask = (item, day) => {
    setModalVisible(true)
    setEditMode(true)
    setSelectedDate(day)
    setEditItem(item)
    setTaskName(item.name)
    setTaskTime(item.time)
    setTaskStatus(item.status)
    setTaskNotes(item.notes || "")
  }

  // Supprimer une tâche
  const handleDeleteTask = async (item, day) => {
    try {
      await api.delete(`/tasks/${item.id}`)

      // Mettre à jour l'état local
      const updatedItems = { ...items }
      updatedItems[day] = updatedItems[day].filter((task) => task.id !== item.id)

      // Si la journée ne contient plus de tâches, on peut supprimer la clé
      if (updatedItems[day].length === 0) {
        delete updatedItems[day]
      }

      setItems(updatedItems)

      // Mettre à jour les dates marquées
      fetchMarkedDates()

      Alert.alert("Succès", "Tâche supprimée avec succès")
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error)
      Alert.alert("Erreur", "Impossible de supprimer la tâche")
    }
  }

  // Changer le statut d'une tâche
  const handleChangeStatus = async (item, day) => {
    const statuses = ["todo", "doing", "done"]
    const currentIndex = statuses.indexOf(item.status)
    const nextIndex = (currentIndex + 1) % statuses.length
    const nextStatus = statuses[nextIndex]

    try {
      await api.put(`/tasks/${item.id}`, { status: nextStatus })

      // Mettre à jour l'état local
      const updatedItems = { ...items }
      const taskIndex = updatedItems[day].findIndex((task) => task.id === item.id)

      if (taskIndex !== -1) {
        updatedItems[day][taskIndex] = {
          ...updatedItems[day][taskIndex],
          status: nextStatus,
        }

        setItems(updatedItems)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
      Alert.alert("Erreur", "Impossible de mettre à jour le statut")
    }
  }

  // Sauvegarder les modifications ou créer une nouvelle tâche
  const handleSaveTask = async () => {
    if (!taskName.trim() || !taskTime.trim()) {
      Alert.alert("Erreur", "Le nom et l'heure sont obligatoires")
      return
    }

    try {
      if (editMode && editItem) {
        // Mise à jour d'une tâche existante
        await api.put(`/tasks/${editItem.id}`, {
          name: taskName,
          date: selectedDate,
          time: taskTime,
          status: taskStatus,
          notes: taskNotes,
        })

        Alert.alert("Succès", "Tâche mise à jour avec succès")
      } else {
        // Création d'une nouvelle tâche
        await api.post("/tasks", {
          name: taskName,
          date: selectedDate,
          time: taskTime,
          status: taskStatus,
          notes: taskNotes,
        })

        Alert.alert("Succès", "Tâche ajoutée avec succès")
      }

      // Recharger les tâches et les dates marquées
      fetchTasksByDate(selectedDate)
      fetchMarkedDates()

      setModalVisible(false)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la tâche:", error)
      Alert.alert("Erreur", "Impossible de sauvegarder la tâche")
    }
  }

  // Rendu d'une tâche dans l'agenda
  const renderItem = (item, day) => {
    // Déterminer la couleur en fonction du statut
    let statusColor
    let statusIcon
    let statusText

    switch (item.status) {
      case "done":
        statusColor = "#4caf50"
        statusIcon = "checkmark-circle"
        statusText = "Terminé"
        break
      case "doing":
        statusColor = "#ff9800"
        statusIcon = "time"
        statusText = "En cours"
        break
      default:
        statusColor = "#2196f3"
        statusIcon = "list"
        statusText = "À faire"
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
            <TouchableOpacity style={styles.actionButton} onPress={() => handleEditTask(item, day)}>
              <Ionicons name="pencil" size={18} color="#1565c0" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteTask(item, day)}>
              <Ionicons name="trash-outline" size={18} color="#f44336" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // Rendu du bouton "+" flottant
  const renderAddButton = () => {
    return (
      <Animated.View style={[styles.addButtonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddTask(selectedDay)}>
          <LinearGradient colors={["#1976d2", "#1565c0", "#0d47a1"]} style={styles.addButtonGradient}>
            <Ionicons name="add" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    )
  }

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
              <LinearGradient colors={["#1565c0", "#1e88e5"]} style={styles.modalHeaderGradient}>
                <Text style={styles.modalTitle}>{editMode ? "Modifier la tâche" : "Ajouter une tâche"}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
              <TextInput style={styles.input} placeholder="Ex: 14:30" value={taskTime} onChangeText={setTaskTime} />

              <Text style={styles.inputLabel}>Statut</Text>
              <View style={styles.statusSelector}>
                {["todo", "doing", "done"].map((status) => {
                  let statusColor
                  let statusLabel

                  switch (status) {
                    case "done":
                      statusColor = "#4caf50"
                      statusLabel = "Terminé"
                      break
                    case "doing":
                      statusColor = "#ff9800"
                      statusLabel = "En cours"
                      break
                    default:
                      statusColor = "#2196f3"
                      statusLabel = "À faire"
                  }

                  return (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.statusOption,
                        taskStatus === status && {
                          backgroundColor: statusColor,
                          borderColor: statusColor,
                        },
                      ]}
                      onPress={() => setTaskStatus(status)}
                    >
                      <Text style={[styles.statusOptionText, taskStatus === status && { color: "#fff" }]}>
                        {statusLabel}
                      </Text>
                    </TouchableOpacity>
                  )
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

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                <LinearGradient colors={["#1976d2", "#1565c0"]} style={styles.saveButtonGradient}>
                  <Text style={styles.saveButtonText}>{editMode ? "Mettre à jour" : "Ajouter"}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient colors={["#1565c0", "#1e88e5"]} style={styles.headerGradient}>
          <Text style={styles.headerTitle}>Agenda</Text>
          <Text style={styles.headerSubtitle}>Planifiez vos tâches et cours</Text>
        </LinearGradient>
      </View>

      <View style={styles.agendaContainer}>
        <Agenda
          items={items}
          selected={selectedDay}
          onDayPress={(day) => setSelectedDay(day.dateString)}
          markedDates={markedDates}
          theme={{
            agendaDayTextColor: "#1565c0",
            agendaDayNumColor: "#1565c0",
            agendaTodayColor: "#1976d2",
            agendaKnobColor: "#1565c0",
            backgroundColor: "#f5f7fa",
            calendarBackground: "#ffffff",
            dotColor: "#1565c0",
            selectedDayBackgroundColor: "#1565c0",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#1565c0",
            textSectionTitleColor: "#546e7a",
            monthTextColor: "#263238",
            dayTextColor: "#455a64",
            textDisabledColor: "#b0bec5",
          }}
          renderItem={(item, isFirst) => renderItem(item, selectedDay)}
          renderEmptyDate={() => (
            <View style={styles.emptyDate}>
              <Text style={styles.emptyDateText}>Aucune tâche pour ce jour</Text>
              <TouchableOpacity style={styles.addSmallButton} onPress={() => handleAddTask(selectedDay)}>
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
          loadingIndicator={loading}
        />
      </View>

      {renderAddButton()}
      {renderModal()}
    </SafeAreaView>
  )
}

// Les styles restent les mêmes que dans votre fichier original
const styles = StyleSheet.create({
  // ... Vos styles existants
})

export default PlanningScreen
