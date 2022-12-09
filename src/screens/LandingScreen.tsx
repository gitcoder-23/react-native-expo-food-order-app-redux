import React, { useState, useReducer, useEffect } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux/reducers';
import { onUpdateLocation } from '../redux/actions/userAction';
import { UserState } from '../redux/models';

const screenWidth = Dimensions.get('screen').width;

type LandingType = {
  navigation: any;
  userReducer: UserState;
  onUpdateLocation: Function;
};

const _LandingScreen: React.FC<LandingType> = ({
  navigation,
  userReducer,
  onUpdateLocation,
  ...props
}) => {
  // console.log('props->', props);

  const [locationAddress, setLocationAddress] = useState<{} | any>({});
  const [locationError, setLocationError] = useState<string>('');
  const [getAddress, setGetAddress] = useState<any>();
  const [displayAddress, setDisplayAddress] = useState(
    'Waiting for current address'
  );
  // Current Location Implement

  const checkLocation = async () => {
    try {
      let _serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!_serviceEnabled) {
        await Location.enableNetworkProviderAsync();
        _serviceEnabled = await Location.hasServicesEnabledAsync();
        if (!_serviceEnabled) {
          return false;
        }
      }

      let _permissionGranted = await Location.getForegroundPermissionsAsync();
      if (_permissionGranted.status != 'granted') {
        _permissionGranted = await Location.requestForegroundPermissionsAsync();
        if (_permissionGranted.status != 'granted') {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      let status = await checkLocation();
      if (!status) {
        setLocationError('Permission to access location was denied');
        return;
      }
      // maintain promise using await
      let locationDeteail = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
      console.log('location->', locationDeteail);

      let address = await Location.reverseGeocodeAsync({
        latitude: locationDeteail.coords.latitude,
        longitude: locationDeteail.coords.longitude,
      });

      console.log('address->', address);
      setLocationAddress(address);
      locationCheck(address);

      for (let addressItem of address) {
        console.log('addressItem->', addressItem);
        setGetAddress(addressItem);
        // Reducer Called
        onUpdateLocation(addressItem);

        let currentAddress = `${addressItem?.name}, ${addressItem?.street}, ${addressItem?.postalCode}, ${addressItem?.city}`;

        console.log('currentAddress->', currentAddress.length);
        setDisplayAddress(currentAddress);
        if (currentAddress.length > 0) {
          setTimeout(() => {
            navigation.navigate('TabNavigation', {
              displayAddress: displayAddress,
            });
          }, 2000);
        }
      }
    })();
  }, []);

  const locationCheck = (address: any) => {
    console.log('modeFn@->', address, address[0].postalCode, address[0].region);

    let postCodeData = address[0].postalCode || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation} />
      <View style={styles.body}>
        <Image
          source={require(`../images/delivery_icon.png`)}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>
        <Text style={styles.addressText}>Waiting for current location</Text>
      </View>
      <View style={styles.footer} />
    </SafeAreaView>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const LandingScreen = connect(mapToStateProps, { onUpdateLocation })(
  _LandingScreen
);

export { LandingScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `rgba(242,242,242,1)`,
  },
  navigation: {
    flex: 2,
    // backgroundColor: 'red',
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  deliveryIcon: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7D7D7D',
  },
  addressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F',
  },
  footer: {
    flex: 1,
    // backgroundColor: 'cyan',
  },
});
