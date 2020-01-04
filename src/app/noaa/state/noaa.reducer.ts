import { NoaaActionTypes, NoaaActions } from './noaa.actions';
import { Location, AverageTempData } from '../noaa.types';

export interface NoaaState {
    locations: Location[],
    averageTempData: (string | number)[][],
    countryCode: string,
    locationId: string
}

export const initialState: NoaaState = {
    locations: [],
    averageTempData: [],
    countryCode: "",
    locationId: ""
}

export function reducer(state = initialState, action : NoaaActions): NoaaState {
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
                countryCode: action.payload,
                locationId: "",
                averageTempData: []
            }
        }
        case NoaaActionTypes.SELECT_LOCATION: {
            return {
                ...state,
                locationId: action.payload,
                averageTempData: []
            }
        }
        case NoaaActionTypes.LOAD_AVERAGE_TEMP_PART: {
            return {
                ...state,
                averageTempData: state.averageTempData.concat(action.payload)
            }
        }

        default:
            return state;
    }
}