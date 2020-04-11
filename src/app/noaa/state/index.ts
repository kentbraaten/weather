import * as fromNoaa from './noaa.reducer';
import * as fromRoot from '../../state/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    noaa: fromNoaa.NoaaState;
}

export const getNoaaFeatureState = createFeatureSelector<fromNoaa.NoaaState>("noaa");

export const getLocationsSelector = createSelector(getNoaaFeatureState,
    ns => ns.locations);

export const getCountrySelector = createSelector(getNoaaFeatureState,
    ns => ns.countryCode);

export const getStateRegion = createSelector(getNoaaFeatureState,
    ns => ns.stateRgn);

export const locationIdSelector = createSelector(getNoaaFeatureState,
    ns => ns.selectedLocation);

export const averageTempSelector = createSelector(getNoaaFeatureState,
    ns => ns.averageTempData);

export const averageTempDataAvailableSelector = createSelector(getNoaaFeatureState,
    ns => ns.averageTempData && ns.averageTempData.length != 0);


