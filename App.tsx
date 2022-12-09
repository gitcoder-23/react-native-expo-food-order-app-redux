import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Navigation
import { NavigationContainer } from '@react-navigation/native';

// Screens
import NavigationMenu from './src/screens/AppMenu/NavigationMenu';

const MainNavMenu = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)',
      }}
    >
      <NavigationContainer>
        <NavigationMenu />
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <>
      <MainNavMenu />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
