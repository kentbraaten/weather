
import * as appActions from './app.actions';

export interface AppState {
    isWaiting: boolean
}

export interface State {
    app: AppState;
}

export const initialState: AppState = {
   isWaiting: false
}

export function reducer(state = initialState, action : appActions.AppActions) {
    switch(action.type) {
        case appActions.AppActionTypes.APP_START_WAIT: {
            return {
                ...state,
                isWaiting: true
            }
        }

        case appActions.AppActionTypes.APP_STOP_WAIT: {
            return {
                ...state,
                isWaiting: false
            }
        }

        default:
            return state;
    }
}

