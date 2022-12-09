import { LocationGeocodedAddress } from 'expo-location';
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UpdateLocationAction {
  readonly type: 'ON_UPDATE_LOCATION';
  payload: LocationGeocodedAddress;
}

export interface UpdateErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: any;
}

export type UserAction = UpdateLocationAction | UpdateErrorAction;

// User action trigger from components
export const onUpdateLocation = (location: LocationGeocodedAddress) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      if (!location) {
        console.log('Location details is empty->');
      } else {
        console.log('Location details not empty-->', JSON.stringify(location));
      }
      // Save our location in local storage
      if (location) {
        await AsyncStorage.setItem('user_location', JSON.stringify(location));
        dispatch({
          type: 'ON_UPDATE_LOCATION',
          payload: location,
        });
      } else {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Location details is empty',
        });
      }
    } catch (error) {
      console.log('Action-update-locatio-err->', error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};
