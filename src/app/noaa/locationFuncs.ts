import {Location, LocationView, CountryView, StateRgnView} from './noaa.types';
import { distinct, map, filter, toArray, mergeMap } from 'rxjs/operators';
import { Observable, from, combineLatest } from 'rxjs';

const countryComparFunc = (c1: CountryView, c2: CountryView): number => {
    if (c1.country > c2.country) {
        return 1;
    } else if (c1.country < c2.country){
        return -1;
    }
    return 0;
}

const stateComparFunc = (c1: StateRgnView, c2: StateRgnView): number => {
    if (c1.state > c2.state) {
        return 1;
    } else if (c1.state < c2.state){
        return -1;
    }
    return 0;
}

export const getCountriesList = (locations$: Observable<LocationView[]>): Observable<CountryView[]> =>{
    return locations$.pipe(
        mergeMap(loc => from(loc).pipe(
            map(loc => {return {country: loc.country}}),
            distinct(c => c.country),
            toArray(),
            map(countryNames => countryNames.sort(countryComparFunc))
        ))
    )
}

export const getStateRegionList = (locations$: Observable<LocationView[]>,
    countrySelector$: Observable<String>): Observable<StateRgnView[]> => {
    return combineLatest(locations$, countrySelector$).pipe(
        mergeMap(([locations, selectedCountry])=> {
            return from(locations).pipe(
                filter(loc => loc.country == selectedCountry),
                map(loc => {return {state: loc.state}}),
                distinct(sr => sr.state),
                toArray(),
                map(stateNames => stateNames.sort(stateComparFunc))
            )
        })
    )
} 

export const getCitiesList = (locations$: Observable<LocationView[]>,
                                countrySelector$: Observable<string>,
                                stateRgnSelector$: Observable<string>): Observable<LocationView[]> =>{
    return combineLatest(locations$, countrySelector$, stateRgnSelector$).pipe(
        mergeMap(([locations, selectCountry, selectedState]) => {
            return from(locations).pipe(
                filter(loc => (selectCountry == "" || loc.country == selectCountry) &&
                              (selectedState == "" || loc.state == selectedState)
                     ),
                toArray()
            )
        })
    );             
}

export const getLocationViewListObservable = (source : Observable<Location> ): Observable<LocationView> => {
    return source.pipe(
        map(l => {
            const regions = regionNamesFromLn(l.name);
            return {
                mindate: l.mindate,
                maxdate: l.maxdate,
                city: regions[0],
                state: regions[1],
                country: regions[2],
                id: l.id
            }
        })
    )
}

const ccodeFromLn = (ln: string) => ln.slice(ln.length - 2);

const cityNameFromLn = (ln: string) => regionNamesFromLn(ln)[0];

export const regionNamesFromLn = (ln: string) : string[] => {
    const regionNames = ln.split(',');
    const city = regionNames[0] ? regionNames[0] : "";
    const stateCountry = regionNames.length >= 2 ? regionNames[1].slice(1).split(" ") : [""];
    const state = stateCountry.length == 2 ? stateNameFromCode(stateCountry[0]) : null;
    const country = stateCountry.length == 2 ? countryNameFromCode(stateCountry[1]) : 
                                                    countryNameFromCode(stateCountry[0]); 

    return state ? [city, state, country] : [city, null, country];
}
    
const countryNameFromCode = (code: string) =>{
    const name = countriesMap.get(code);
    if (name) {
        return name;
    }
    return code + " - Has no associated name";
}

const stateNameFromCode = (code: string) => {
    const name = stateMap.get(code);
    return name ? name : `${code}  Has no associated name`;
}

const stateMap = new Map(
[
    ["AL", "Alabama"],
    ["AK", "Alaska"],
    ["AZ", "Arizona"],
    ["AR", "Arkansas"],
    ["CA", "California"],
    ["CO", "Colorado"],	
    ["CT","Connecticut"],	
    ["DE","Delaware"],	
    ["FL","Florida"],	
    ["GA","Georgia"],	
    ["HI","Hawaii"],	
    ["ID","Idaho"],	
    ["IL","Illinois"],	
    ["IN","Indiana"],	
    ["IA","Iowa"],	
    ["KS","Kansas"],	
    ["KY","Kentucky"],	
    ["LA","Louisiana"],	
    ["ME","Maine"],	
    ["MD","Maryland"],	
    ["MA","Massachusetts"],	
    ["MI","Michigan"],	
    ["MN","Minnesota"],	
    ["MS", "Mississippi"],	
    ["MO", "Missouri"],
    ["MT", "Montana"],	
    ["NE", "Nebraska"],	
    ["NV", "Nevada"],
    ["NH", "New Hampshire"],
    ["NJ", "New Jersey"],	
    ["NM", "New Mexico"],
    ["NY", "New York"],
    ["NC", "North Carolina"],
    ["ND", "North Dakota"],
    ["OH", "Ohio"],
    ["OK", "Oklahoma"],
    ["OR", "Oregon"],
    ["PA", "Pennsylvania"],
    ["RI", "Rhode Island"],
    ["SC", "South Carolina"],
    ["SD", "South Dakota"],
    ["TN", "Tennessee"],
    ["TX", "Texas"],
    ["UT", "Utah"],
    ["VT", "Vermont"],
    ["VA", "Virginia"],
    ["WA", "Washington"],
    ["WV", "West Virginia"],
    ["WI","Wisconsin"],
    ["WY", "Wyoming"]   
]
)

const countriesMap = new Map(
    [
        ["AE","United Arab Emirates"],
        ["AG","Algeria"],
        ["AM","Armenia"],
        ["AS","Australia"],
        ["AU","Austria"],
        ["CA", "Canada"],
        ["BE", "Belgium"],
        ["BK", "Bosnia and Herzegovina"],
        ["BO", "Belarus"],
        ["BN", "Benin"],
        ["BR", "Brazil"],
        ["DA", "Denmark"],
        ["EL", "Denmark"],
        ["EI", "Ireland"],
        ["EN", "Estonia"],
        ["EZ", "Czechia"],
        ["FG", "French Guiana"],
        ["FR", "France"],
        ["GG", "Georgia"],
        ["GM", "Germany"],
        ["HR", "Croatia"],
        ["HU", "Hungry"],
        ["IC", "Iceland"],
        ["IN", "India"],
        ["IS", "Isreal"],
        ["IT", "Italy"],
        ["JA", "Japan"],
        ["KG", "Kyrgyzstan"],
        ["KZ", "Kazakhstan"],
        ["LH", "Lithuania"],
        ["LU", "Luxembourg"],
        ["MD", "Moldova"],
        ["MX", "Mexico"],
        ["NG", "Niger"],
        ["NL", "Netherlands"],
        ["NO", "Norway"],
        ["PK", "Pakistan"],
        ["PL", "Poland"],
        ["RB", "Serbia"],
        ["RO", "Romania"],
        ["RP", "Philippines"],
        ["RQ", "Philippines"],
        ["RS", "Russia"],
        ["SF", "South Africa"],
        ["SI", "Slovenia"],
        ["SP", "Spain"],
        ["SW", "Sweden"],
        ["SZ", "Switzerland"],
        ["TI", "Tajikistan"],
        ["TS", "Tunisia"],
        ["UK", "United Kingdom"],
        ["US", "United States"],
        ["UZ", "Uzbekistan"]
    ]
)