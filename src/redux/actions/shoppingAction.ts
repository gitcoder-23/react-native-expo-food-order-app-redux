import axios from 'axios';
import { LocationGeocodedAddress } from 'expo-location';
import { Dispatch } from 'redux';
import { BASE_URL } from '../../config';
import { FoodAvailability } from '../models';

export interface AvailabilityAction {
  readonly type: 'ON_AVAILABILITY';
  payload: FoodAvailability;
}

export interface ShoppingErrorAction {
  readonly type: 'ON_SHOPPING_ERROR';
  payload: any;
}

export type ShoppingAction = AvailabilityAction | ShoppingErrorAction;

// User action trigger from components
export const onAvailability = (postCode: string) => {
  return async (dispatch: Dispatch<ShoppingAction>) => {
    try {
      const response = await axios.get<FoodAvailability>(
        `${BASE_URL}food/availability/${postCode}`
      );

      console.log('Shopping-Action-Res->', response);

      if (!response) {
        dispatch({
          type: 'ON_SHOPPING_ERROR',
          payload: 'Availability error',
        });
      } else {
        // save our location in local storage
        dispatch({
          type: 'ON_AVAILABILITY',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_SHOPPING_ERROR',
        payload: error,
      });
    }
  };
};
