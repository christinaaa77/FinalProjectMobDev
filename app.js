import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReminderProvider } from './src/ReminderContext';
import {
  SplashScreen,
  Home,
  PersonalInfo,
  Profil,
  Remind,
  Add,
  Trigerred,
  NotificationSet,
  Welcome,
  About,
} from './src/pages';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ReminderProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationSet"
            component={NotificationSet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profil"
            component={Profil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reminder"
            component={Remind}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Triggered"
            component={Trigerred}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddReminder"
            component={Add}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReminderProvider>
  );
};

export default App;
