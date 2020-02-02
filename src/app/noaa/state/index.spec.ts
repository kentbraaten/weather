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

    it ("should return all that belong to the specified state", (done) => {
        getCitiesList(of(testActions),of("United States"), of("Washington")).subscribe(
            {
                next: (locs) => {
                    expect(locs.length).toEqual(3);
                    locs.forEach(loc => expect(loc.state).toEqual("Washington"));
                    done();
                }
            }
        )
    });
});

describe("getStateRegionList", () => {
    it("should return a unique list of state regions", (done) => {
        getStateRegionList(of(testActions), of("United States")).subscribe(
            {
                next: (stateRgns) => {
                    expect(stateRgns.length).toEqual(2);
                    expect(stateRgns[0]).not.toEqual(stateRgns[1]);
                    done();
                }
            }
        )
    });

    it("should sort the state regions", (done) => {
        getStateRegionList(of(testActions), of("United States")).subscribe(
            {
                next: (stateRgns) => {
                    expect(stateRgns[0].state).toEqual("Verginia");
                    expect(stateRgns[1].state).toEqual("Washington");
                    done();
                }
            }
        )
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