import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewExpense, HomeScreen } from './screens';

const Stack = createStackNavigator();

const myStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Wilkommen' }}
        />
        <Stack.Screen
          name='Add new expense'
          component={AddNewExpense}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default myStack;