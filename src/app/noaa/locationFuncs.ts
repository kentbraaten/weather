import {Location, LocationView} from './noaa.types';
import { distinct, map, filter, reduce, buffer, toArray, pluck, mergeMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

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

/*
export const getLocationHierarchy = (locations$: Observable<Location>): Observable<LocationNode> => {
    locations$.pipe(
        map(l => {
            return {
                city: cityNameFromLn(l.name),
                state: statenameFromLn(l.name)
            }
        })
    )

    return null;
}
*/

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
    ["DE,","Delaware"],	
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