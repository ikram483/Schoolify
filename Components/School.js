import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeworkScreen from '../screens/HomeworkScreen';
import PlanningScreen from '../screens/PlanningScreen';
import NotesScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const SchoolContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Devoirs':
              iconName = 'book-outline';
              break;
            case 'Planning':
              iconName = 'calendar-outline';
              break;
            case 'Notes':
              iconName = 'document-text-outline';
              break;
            case 'Messages':
              iconName = 'chatbubble-ellipses-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3a7bd5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Devoirs" component={HomeworkScreen} />
      <Tab.Screen name="Planning" component={PlanningScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};

export default SchoolContainer;
