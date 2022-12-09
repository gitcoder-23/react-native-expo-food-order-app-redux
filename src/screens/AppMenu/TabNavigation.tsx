import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import OfferScreen from '../OfferScreen';
import CartScreen from '../CartScreen';
import AccountScreen from '../AccountScreen';

export type NavigationMenuTabParamList = {
  Home: undefined;
  Offer: undefined;
  Cart: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<NavigationMenuTabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          elevation: 8,
          // backgroundColor: 'red',
          // height: 20,
        },
      }}
      // style={styles.bottomTab}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarStyle: {display: Visibility(route)},
          tabBarIcon: ({ focused }) => {
            let icon =
              focused == true
                ? require(`../../images/home_icon.png`)
                : require(`../../images/home_n_icon.png`);
            return (
              <Image
                source={icon}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginTop: 5,
                  tintColor: focused ? 'crimson' : 'black',
                }}
              />
            );
          },
        })}
      />

      <Tab.Screen
        name="Offer"
        component={OfferScreen}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarStyle: {display: Visibility(route)},
          tabBarIcon: ({ focused }) => {
            let icon =
              focused == true
                ? require(`../../images/offer_icon.png`)
                : require(`../../images/offer_n_icon.png`);
            return (
              <>
                <Image
                  source={icon}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 5,
                    tintColor: focused ? 'crimson' : 'black',
                  }}
                />
              </>
            );
          },
        })}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarStyle: {display: Visibility(route)},
          tabBarIcon: ({ focused }) => {
            let icon =
              focused == true
                ? require(`../../images/cart_icon.png`)
                : require(`../../images/cart_n_icon.png`);
            return (
              <>
                <Image
                  source={icon}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 5,
                    tintColor: focused ? 'crimson' : 'black',
                  }}
                />
              </>
            );
          },
        })}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarStyle: {display: Visibility(route)},
          tabBarIcon: ({ focused }) => {
            let icon =
              focused == true
                ? require(`../../images/account_icon.png`)
                : require(`../../images/account_n_icon.png`);
            return (
              <>
                <Image
                  source={icon}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 5,
                    tintColor: focused ? 'crimson' : 'black',
                  }}
                />
              </>
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  bottomTab: {
    elevation: 8,
  },
});
