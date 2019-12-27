import * as locationActions from './noaa.actions';
import {initialState, reducer} from './noaa.reducer';
import {getCountriesList, getLocationsSelector, getCityList} from './index';
import { from } from 'rxjs';

const testActions = [
    {
        mindate: "1893-01-01",
       maxdate: "2019-11-18",
        name: "Winchester, VA US",
        datacoverage: 1,
        id: "CITY:US510018"
    },
    {
        mindate: "1891-07-01",
       maxdate: "2019-11-18",
        name: "Aberdeen, WA US",
        datacoverage: 1,
        id: "CITY:US530001"
    },
    {
        mindate: "1891-07-01",
       maxdate: "2019-11-18",
        name: "Anacortes, WA US",
        datacoverage: 1,
        id: "CITY:US530002"
    },
    {
        mindate: "1892-02-29",
       maxdate: "2019-11-16",
        name: "Paris, FR",
        datacoverage: 1,
        id: "CITY:FR000018"
    },
    {
        mindate: "1894-01-01",
       maxdate: "2019-11-18",
        name: "Bellevue, WA US",
        datacoverage: 1,
        id: "CITY:US530003"
    },

];

describe("getCountriesList", () => {
    it("Should return a list of countries",(done)=> {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        const locations = getLocationsSelector({ noaa: newState });
        var results;
        getCountriesList("", from(locations)).subscribe(
            (ct) => results = ct
        );
        done();
        expect(results.length).toBe(2);
        expect(results.filter(i => i.code == "US").length).toBe(1);
        expect(results.filter(i => i.code == "FR").length).toBe(1);
    });

    it("Should filter based on input",(done)=> {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        const locations = getLocationsSelector({ noaa: newState });
        var results;
        getCountriesList("U", from(locations)).subscribe(
            (ct) => results = ct
        );
        done();
        expect(results.length).toBe(1);
        expect(results.filter(i => i.code == "US").length).toBe(1);
    });

    it("filtering should be case in-sensitive",(done)=> {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        const locations = getLocationsSelector({ noaa: newState });
        var results;
        getCountriesList("f", from(locations)).subscribe(
            (ct) => results = ct
        );
        done();
        expect(results.length).toBe(1);
        expect(results.filter(i => i.code == "FR").length).toBe(1);
    });
});

describe("getCityList", () => {
    it("should return only cities associated with the country",(done) => {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        const locations = getLocationsSelector({ noaa: newState});
        var results;
        expect(locations.length).toBe(5);
        getCityList("FR", "", from(locations)).subscribe(
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
        getCityList("US", "A", from(locations)).subscribe(
            l => results = l
        );
        done();
        expect(results.length).toBe(2);
        expect(results.filter(c => c.name == "Aberdeen").length).toBe(1);
        expect(results.filter(c => c.name == "Anacortes").length).toBe(1);
    });
});