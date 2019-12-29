import { Action } from '@ngrx/store';
import { Location, AverageTempData } from '../noaa.types';

export enum NoaaActionTypes {
    LOAD_ACTIONS = '[noaa] Load Locations',
    LOAD_ACTIONS_SUCCESS = '[noaa] Load Locations Success',
    LOAD_ACTIONS_FAILURE = '[noaa] Load Locations Failure',
    SELECT_COUNTRY = '[noaa] Select Country',
    SELECT_LOCATION = '[noaa] Select Location',
    LOAD_AVERAGE_TEMP_DATA = '[noaa] Load Average Temp Data',
    LOAD_AVERAGE_TEMP_SUCCESS = '[noaa] Load Average Temp Data Success',
    LOAD_AVERAGE_TEMP_FAILURE = '[noaa] Load Average Temp Data Failure'
}

export class LoadLocations implements Action {
    readonly type = NoaaActionTypes.LOAD_ACTIONS;
}

export class LoadLocationsSuccess implements Action {
    readonly type = NoaaActionTypes.LOAD_ACTIONS_SUCCESS;
    constructor(public payload: Location[]) {}
}

export class LoadLocationsFailure implements Action {
    readonly type = NoaaActionTypes.LOAD_ACTIONS_FAILURE;
    constructor(public errorMsg: string){}
}

export class SelectCountry implements Action {
    readonly type = NoaaActionTypes.SELECT_COUNTRY;
    constructor(public payload: string) {}
}

export class SelectLocation implements Action {
    readonly type = NoaaActionTypes.SELECT_LOCATION;
    constructor(public payload: string) {}
}

export class LoadAverageTempData implements Action {
    readonly type = NoaaActionTypes.LOAD_AVERAGE_TEMP_DATA;
    constructor(public payload: string) {}
}

export class LoadAverageTempSuccess implements Action {
    readonly type = NoaaActionTypes.LOAD_AVERAGE_TEMP_SUCCESS;
    constructor(public payload:(string | number)[][]) {}
}

export class LoadAverageTempFailure implements Action {
    readonly type = NoaaActionTypes.LOAD_AVERAGE_TEMP_FAILURE;
    constructor(public errorMsg: string){}
}

export type NoaaActions = LoadLocations |
LoadLocationsSuccess |
LoadLocationsFailure |
SelectCountry        |
SelectLocation       |
LoadAverageTempData  |
LoadAverageTempSuccess |
LoadAverageTempFailure
;