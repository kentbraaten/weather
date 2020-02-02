import { NoaaActionTypes, NoaaActions } from './noaa.actions';
import { LocationView, AverageTempData } from '../noaa.types';

export interface NoaaState {
    locations: LocationView[],
    averageTempData: (string | number)[][],
    countryCode: string,
    stateRgn: string,
    locationId: string
}

export const initialState: NoaaState = {
    locations: [],
    averageTempData: [],
    countryCode: "",
    locationId: "",
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
                locationId: "",
                averageTempData: []
            }
        }
        case NoaaActionTypes.SELECT_STATE_REGION: {
            return {
                ...state,
                stateRgn: action.payload,
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