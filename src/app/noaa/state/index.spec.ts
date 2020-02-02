import * as locationActions from './noaa.actions';
import {initialState, reducer} from './noaa.reducer';
import {getCountriesList, regionNamesFromLn, getCitiesList, getStateRegionList} from '../locationFuncs';
import {getLocationsSelector} from './index';
import { from, of } from 'rxjs';


const testActions = [
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
    },
    {
        mindate: "1893-01-01",
       maxdate: "2019-11-18",
       city: "Winchester",
       state: "Verginia",
       country: "United States",
        datacoverage: 1,
        id: "CITY:US510018"
    }
];

describe("getCitiesList", () => {
    it("should return only cities associated with the selected country",(done) => {
        getCitiesList(of(testActions),of("France"), of("")).subscribe(
            {
                next: (locs) => {
                    expect(locs.length).toEqual(1);
                    expect(locs[0].city).toEqual("Paris");
                    done();
                }
            }
        );
    })

    it ("should return all cities if country is the empty string", (done) => {
        getCitiesList(of(testActions),of(""), of("")).subscribe(
            {
                next: (locs) => {
                    expect(locs.length).toEqual(6);
                    done();
                }
            }
        )
    });
});