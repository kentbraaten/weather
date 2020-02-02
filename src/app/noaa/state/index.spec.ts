import * as locationActions from './noaa.actions';
import {initialState, reducer} from './noaa.reducer';
import {getCountriesList, getCityList, regionNamesFromLn} from '../locationFuncs';
import {getLocationsSelector} from './index';
import { from, of } from 'rxjs';
import { doesNotThrow } from 'assert';

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
    },
    {
        mindate: "1894-01-01",
       maxdate: "2019-11-18",
       city: "Toronto",
       state: null,
       country: "Canada",
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
        expect(locations.length).toBe(6);
        getCityList("United States", "A", from(locations)).subscribe(
            l => results = l
        );
        done();
        expect(results.length).toBe(2);
        expect(results.filter(c => c.name == "Aberdeen").length).toBe(1);
        expect(results.filter(c => c.name == "Anacortes").length).toBe(1);
    });
});

describe("getCountriesList", () => {
    it("should return a distinct list of country names", (done) => {
        getCountriesList(of(testActions))
            .subscribe(
                {
                    next: (l) => {
                        expect(l.length).toEqual(3);
                        done();
                    }
                }
            )
    });

    it("It should return a sorted list of country names", (done) => {
        getCountriesList(of(testActions))
            .subscribe({
                    next: (l) => {
                        expect(l[0].country).toEqual("Canada");
                        expect(l[1].country).toEqual("France");
                        expect(l[2].country).toEqual("United States");
                        done();
                    }
                }
            )
    })
});