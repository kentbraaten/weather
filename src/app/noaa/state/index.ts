import * as fromNoaa from './noaa.reducer';
import * as fromRoot from '../../state/app.reducer';
import {Location, LocationNode} from '../noaa.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinct, map, filter, reduce, buffer, toArray, pluck } from 'rxjs/operators';
import { SelectorContext } from '@angular/compiler';

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
    ns => ns.locationId);

export const averageTempSelector = createSelector(getNoaaFeatureState,
    ns => ns.averageTempData);

export const averageTempDataAvailableSelector = createSelector(getNoaaFeatureState,
    ns => ns.averageTempData && ns.averageTempData.length != 0);


