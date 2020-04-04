import { NoaaActionTypes, NoaaActions } from './noaa.actions';
import { LocationView, AverageTempData } from '../noaa.types';

export interface NoaaState {
    locations: LocationView[],
    selectedLocation: LocationView,
    averageTempData: (string | number)[][],
    countryCode: string,
    stateRgn: string
}

export const initialState: NoaaState = {
    locations: [],
    selectedLocation: null,
    averageTempData: [],
    countryCode: "",
    stateRgn: ""
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
                stateRgn: "",
                selectedLocation: null,
                averageTempData: []
            }
        }
        case NoaaActionTypes.SELECT_STATE_REGION: {
            return {
                ...state,
                stateRgn: action.payload,
                selectedLocation: null,
                averageTempData: []
            }
        }
        case NoaaActionTypes.SELECT_LOCATION: {
            return {
                ...state,
                selectedLocation: action.payload,
                averageTempData: []
            }
        }
        case NoaaActionTypes.LOAD_AVERAGE_TEMP_PART: {
            return {
                ...state,
                averageTempData: [...state.averageTempData,...action.payload]
            }
        }

        default:
            return state;
    }
}