import * as fromNoaa from './noaa.reducer';
import * as fromRoot from '../../state/app.reducer';
import {Location} from '../noaa.types';
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

export const locationIdSelector = createSelector(getNoaaFeatureState,
    ns => ns.locationId);

export const averageTempSelector = createSelector(getNoaaFeatureState,
    ns => ns.averageTempData);

export const averageTempDataAvailableSelector = createSelector(getNoaaFeatureState,
    ns => ns.averageTempData && ns.averageTempData.length != 0);

export const getCountriesList = (key: string, locations$: Observable<Location>): Observable<any> =>{
    const lowerKey = key.toLocaleLowerCase();
    const seed: string[] = [];
    //buffer
    return locations$.pipe(
        map(l => l.name),
        distinct(s => s.slice(s.length - 2)),
        map(n => {
            let code = n.slice(n.length - 2);
            return {
                code: code,
                name: countryNameFromCode(code)
            }
        }),
            
        filter(n => key == "" || n.name.toLowerCase().startsWith(lowerKey)),
        toArray()
    )
}

export const getCityList = (countryCode: string, cityName: string, locations$: Observable<Location>) : Observable<any> => {
    const lowerCityName = cityName.toLowerCase();
    return locations$.pipe(
        filter(l => ccodeFromLn(l.name) == countryCode),
        map(l => {
            return {
                id: l.id,
                name: cityNameFromLn(l.name)
            }
        }),
        filter(n => lowerCityName =="" || n.name.toLowerCase().startsWith(lowerCityName)),
        toArray()
    )
}

const ccodeFromLn = (ln: string) => ln.slice(ln.length - 2);
const cityNameFromLn = (ln: string) => ln.slice(0,ln.indexOf(","));

const countryNameFromCode = (code: string) =>{
    const name = countriesMap.get(code);
    if (name) {
        return name;
    }
    return code + " - Has no associated name";
}

const countriesMap = new Map(
    [
        ["AG","Algeria"],
        ["AM","Armenia"],
        ["AS","Australia"],
        ["AU","Austria"],
        ["CA", "Canada"],
        ["BE", "Belgium"],
        ["BK", "Bosnia and Herzegovina"],
        ["BO", "Belarus"],
        ["DA", "Denmark"],
        ["EL", "Denmark"],
        ["EN", "Ireland"],
        ["EZ", "Czechia"],
        ["FR", "France"],
        ["GG", "Georgia"],
        ["GM", "Germany"],
        ["HR", "Croatia"],
        ["IT", "Italy"],
        ["LH", "Lithuania"],
        ["MD", "Moldova"],
        ["NL", "Netherlands"],
        ["NO", "Norway"],
        ["US", "United States"]
    ]
)

