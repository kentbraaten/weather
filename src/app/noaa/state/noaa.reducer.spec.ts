import {initialState, reducer} from "./noaa.reducer";
import * as locationActions from "./noaa.actions";

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
        mindate: "1894-01-01",
       maxdate: "2019-11-18",
        name: "Bellevue, WA US",
        datacoverage: 1,
        id: "CITY:US530003"
    },

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
        expect(newState.locations.length).toBe(4);
    });

    it ("SELECT_COUNTRY should set the country code", () => {
        const selectCountry = new locationActions.SelectCountry("US");
        const newState = reducer(initialState, selectCountry);
        expect(newState.countryCode).toBe("US");
    });

    it ("SELECTION_LOCATION should set a location id", () => {
        const selectLocation = new locationActions.SelectLocation("CITY:US530001");
        const newState = reducer(initialState, selectLocation);
        expect(newState.locationId).toBe("CITY:US530001");
    });

    it ("LOAD_AVERAGE_TEMP_SUCCESS should load average temp data", () => {
        const selectLocation = new locationActions.SelectLocation("CITY:US530001");
        const midState = reducer(initialState, selectLocation);
        const loadAverageTempData = new locationActions.LoadAverageTempSuccess(averageTempTestData);
        const newState = reducer(midState, loadAverageTempData);
        expect(newState.averageTempData.length).toBe(10);
    });
});