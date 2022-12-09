import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { LandingScreen } from '../LandingScreen';
import TabNavigation from './TabNavigation';

export type NavigationMenuStackParamList = {
  LandingScreen: undefined;
  TabNavigation: undefined;
};

const Stack = createStackNavigator<NavigationMenuStackParamList>();

const myOptions: StackNavigationOptions = {
  gestureEnabled: false,
};

const NavigationMenu = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ ...myOptions, headerShown: false }}
        />

        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ ...myOptions, headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default NavigationMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
