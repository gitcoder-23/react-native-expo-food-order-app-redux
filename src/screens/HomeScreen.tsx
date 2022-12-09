import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApplicationState } from '../redux/reducers';
import { connect } from 'react-redux';
import { onAvailability } from '../redux/actions/shoppingAction';
import { ShoppingState, UserState } from '../redux/models';

interface HomeProps {
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onAvailability: Function;
}

const _HomeScreen: React.FC<HomeProps> = ({
  userReducer,
  shoppingReducer,
  onAvailability,
}) => {
  const { location } = userReducer;
  const { availability } = shoppingReducer;
  const [getLocation] = useState(location);

  console.log('Home-screen->', location, availability);

  useEffect(() => {
    onAvailability(location.postalCode);
    // setTimeout(() => {
    //     onSearchFoods(location.postalCode)
    // }, 1000 )

    return () => {};
  }, [location ? location : location]);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            marginTop: 50,
            flex: 4,
            backgroundColor: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Text>
            {`${getLocation.name},${getLocation.street},${getLocation.city}`}{' '}
          </Text>
          <Text> Edit</Text>
        </View>
        <View
          style={{
            display: 'flex',
            height: 60,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 4,
          }}
        ></View>
      </View>

      {/* Navigation end */}
      <View style={styles.body}>
        <Text>Home Screen Blank</Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  shoppingReducer: state.shoppingReducer,
});

const HomeScreen = connect(mapToStateProps, { onAvailability })(_HomeScreen);

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `rgba(242,242,242,1)`,
  },
  navigation: {
    flex: 2,
    backgroundColor: 'red',
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
    backgroundColor: 'cyan',
  },
});
