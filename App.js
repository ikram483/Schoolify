import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import SchoolContainer from "./Components/School";
import HomeContainer from "./HomeContainer/HomeContainer";
import Header from './Header/Header';

// 🆕 Importation des nouveaux écrans
import PlanningScreen from './screens/PlanningScreen';
import NotesScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import HomeworkScreen from './screens/HomeworkScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp">
          {props => <SignUp {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <Login {...props} setUser={setUser} setId={setId} setImage={setImage} />}
        </Stack.Screen>
        <Stack.Screen name="ProfileInfo">
          {props => <ProfileInfo {...props} user={setUser} setId={setId} image={setImage} />}
        </Stack.Screen>
        <Stack.Screen name="Main">
          {props => <Main {...props} id={id} />}
        </Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="School" component={SchoolContainer} />

        {/* ✅ Nouveaux écrans scolaires */}
        <Stack.Screen name="Planning" component={PlanningScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />

        <Stack.Screen name="Home" component={HomeContainer} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
