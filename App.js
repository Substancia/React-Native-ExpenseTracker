import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewExpense, HomeScreen, SettingsScreen } from './screens';
import { Button } from 'react-native';

const Stack = createStackNavigator();

const myStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <Button
              title='Gears'
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Wilkommen' }}
        />
        <Stack.Screen
          name='Add new expense'
          component={AddNewExpense}
        />
        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default myStack;