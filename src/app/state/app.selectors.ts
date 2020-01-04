import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AppState}  from './app.reducer';


export const getAppFeatureState = createFeatureSelector<AppState>("app");

export const waitSelector = createSelector(getAppFeatureState, (as: AppState):boolean => {
    return as.isWaiting
});