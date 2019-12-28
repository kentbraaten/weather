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
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 54.1
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 58.1
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 55.3
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00218450",
        attributes: "0",
        value: 56.5
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014922",
        attributes: "0",
        value: 55.1
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 54.8
    },
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 55.3
    },
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00218450",
        attributes: "0",
        value: 57.5
    },
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014922",
        attributes: "0",
        value: 56.2
    },
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
        expect(newState.averageTempData.length).toBe(9);
    });
});