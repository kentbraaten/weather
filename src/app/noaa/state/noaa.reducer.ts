import { NoaaActionTypes, NoaaActions } from './noaa.actions';
import { Location } from '../noaa.types';

export interface NoaaState {
    locations: Location[],
    countryCode: string,
    locationId: string
}

export const initialState: NoaaState = {
    locations: [],
    countryCode: "",
    locationId: null
}

export function reducer(state = initialState, action : NoaaActions) {
    switch (action.type) {
        case NoaaActionTypes.LOAD_ACTIONS_SUCCESS: {
            return {
                ...state,
                locations: action.payload
            }
        }
        case NoaaActionTypes.SELECT_COUNTRY: {
            return {
                ...state,
                countryCode: action.payload
            }
        }
        case NoaaActionTypes.SELECT_LOCATION: {
            return {
                ...state,
                locationId: action.payload
            }
        }

        default:
            return state;
    }
}