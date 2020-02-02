import {initialState, reducer} from "./noaa.reducer";
import * as locationActions from "./noaa.actions";

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

const averageTempTestData = [
    ["2001", 54.1],
    ["2002", 55.1],
    ["2003", 60.1],
    ["2004", 49.1],
    ["2005", 53.1],
    ["2006", 52.1],
    ["2007", 55.1],
    ["2008", 56.1],
    ["2009", 55.1],
    ["2010", 61.1],
    ];

describe("LocationReducer", () => {
    it("LOAD_ACCTION_SUCCESS should add locations to state",()=> {
        const loadAction = new locationActions.LoadLocationsSuccess(testActions);
        const newState = reducer(initialState, loadAction);
        expect(newState.locations.length).toBe(5);
    });

    it ("SELECT_COUNTRY should set the country code", () => {
        const selectCountry = new locationActions.SelectCountry("US");
        const newState = reducer(initialState, selectCountry);
        expect(newState.countryCode).toBe("US");
    });

    it ("SELECT_COUNTRY should clear location and state region", () => {
        const itermediateState = {
            ...initialState,
            countryCode: "US",
            stateRegion: "North Dakota",
            locationId: "CITY:US530001",
            averageTempData: averageTempTestData
        }
        const selectCountry = new locationActions.SelectCountry("Canada");
        const newState = reducer(itermediateState, selectCountry);

        expect(newState.countryCode).toEqual("Canada");
        expect(newState.stateRgn).toEqual("");
        expect(newState.locationId).toEqual("");
        expect(newState.locationId.length).toEqual(0);
    });

    it ("SELECT_STATE_REGION should set the state, region and average temp data", () => {
        const region = new locationActions.SelectStateRegion("Montana");
        const newState = reducer(initialState, region);
        expect(newState.stateRgn).toBe("Montana");
    });

    it ("SELECT_STATE_REGION should clear location and average temp data", () => {
        const itermediateState = {
            ...initialState,
            countryCode: "US",
            StateRegion: "North Dakota",
            locationId: "CITY:US530001",
            averageTempData: averageTempTestData
        }
        const selectStateRgn = new locationActions.SelectStateRegion("Iowa");
        const newState = reducer(itermediateState, selectStateRgn);

        expect(newState.countryCode).toEqual("US");
        expect(newState.stateRgn).toEqual("Iowa");
        expect(newState.locationId).toEqual("");
        expect(newState.locationId.length).toEqual(0);
    });

    it ("SELECT_STATE_REGION should clear location", () => {
        const region = new locationActions.SelectStateRegion("Minnesota");
        const newState = reducer(initialState, region);
        expect(newState.locationId).toBe("");
    });

    it ("SELECTION_LOCATION should set a location id", () => {
        const selectLocation = new locationActions.SelectLocation("CITY:US530001");
        const intermediateState = {
            ...initialState,
            countryCode: "United States",
            stateRgn: "New York",
            locationid: ""
        }
        const newState = reducer(intermediateState, selectLocation);
        expect(newState.locationId).toBe("CITY:US530001");
        expect(newState.countryCode).toEqual("United States");
        expect(newState.stateRgn).toEqual("New York");
    });

    it ("LOAD_AVERAGE_TEMP_SUCCESS should load average temp data", () => {
        const selectLocation = new locationActions.SelectLocation("CITY:US530001");
        const midState = reducer(initialState, selectLocation);
        const loadAverageTempData = new locationActions.LoadAverageTempSuccess(averageTempTestData);
        const newState = reducer(midState, loadAverageTempData);
        expect(newState.averageTempData.length).toBe(10);
    });
});