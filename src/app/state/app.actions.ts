import { Action } from '@ngrx/store';

export enum AppActionTypes {
    APP_START_WAIT = '[app] Start Wait',
    APP_STOP_WAIT = '[App] Stop Wait'
}

export class StartWait implements Action {
    readonly type = AppActionTypes.APP_START_WAIT;
}

export class StopWait implements Action {
    readonly type = AppActionTypes.APP_STOP_WAIT;
}

export type AppActions = StartWait | StopWait;