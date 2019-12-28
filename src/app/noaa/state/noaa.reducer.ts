import { NoaaActionTypes, NoaaActions } from './noaa.actions';
import { Location, AverageTempData } from '../noaa.types';

export interface NoaaState {
    locations: Location[],
    averageTempData: AverageTempData[],
    countryCode: string,
    locationId: string
}

export const initialState: NoaaState = {
    locations: [],
    averageTempData: [],
    countryCode: "",
    locationId: ""
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
        case NoaaActionTypes.LOAD_AVERAGE_TEMP_SUCCESS: {
            return {
                ...state,
                averageTempData: action.payload
            }
        }

        default:
            return state;
    }
}