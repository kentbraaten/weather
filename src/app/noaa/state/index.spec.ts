import * as locationActions from './noaa.actions';
import {initialState, reducer} from './noaa.reducer';
import {getCountriesList, getCityList, regionNamesFromLn} from '../locationFuncs';
import {getLocationsSelector} from './index';
import { from } from 'rxjs';

const testActions = [
    {
        mindate: "1893-01-01",
       maxdate: "2019-11-18",
       city: "Winchester",
       state: "Verginia",
       country: "United States",
        datacoverage: 1,
        id: "CITY:US510018"
    },
    {
        mindate: "1891-07-01",
       maxdate: "2019-11-18",
       city: "Aberdeen",
       state: "Washington",
       country: "United States",
        datacoverage: 1,
        id: "CITY:US530001"
    },
    {
        mindate: "1891-07-01",
       maxdate: "2019-11-18",
       city: "Anacortes",
       state: "Washington",
       country: "United States",
        datacoverage: 1,
        id: "CITY:US530002"
    },
    {
        mindate: "1892-02-29",
       maxdate: "2019-11-16",
       city: "Paris",
       state: null,
       country: "France",
        datacoverage: 1,
        id: "CITY:FR000018"
    },
    {
        mindate: "1894-01-01",
       maxdate: "2019-11-18",
       city: "Bellevue",
       state: "Washington",
       country: "United States",
        datacoverage: 1,
        id: "CITY:US530003"
    }

];

describe("getCityList", () => {
    it("should return only cities associated with the country",(done) => {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        const locations = getLocationsSelector({ noaa: newState});
        var results;
        expect(locations.length).toBe(5);
        getCityList("France", "", from(locations)).subscribe(
            l => results = l
        );
        done();
        expect(results.length).toBe(1);
        expect(results.filter(c => c.name == "Paris").length).toBe(1);
    });

    it("should filter based on term",(done) => {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        const locations = getLocationsSelector({ noaa: newState});
        var results;
        expect(locations.length).toBe(5);
        getCityList("United States", "A", from(locations)).subscribe(
            l => results = l
        );
        done();
        expect(results.length).toBe(2);
        expect(results.filter(c => c.name == "Aberdeen").length).toBe(1);
        expect(results.filter(c => c.name == "Anacortes").length).toBe(1);
    });
});