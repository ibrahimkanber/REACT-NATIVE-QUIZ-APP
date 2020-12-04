import React,{useEffect} from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './pages/Intro';
import Questions from './pages/Questions';

import { initialValue } from "../src/context/store";
import { reducer } from "../src/context/reducer"
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Finish } from './pages/Finish';

const store = createStore(reducer, initialValue)

const Stack = createStackNavigator();

const Router = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Questions" component={Questions} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default Router;
