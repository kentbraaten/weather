import {getCountriesList, getCityList, regionNamesFromLn, getLocationViewListObservable} from './locationFuncs';
import {Location} from './noaa.types';
import { from, of } from 'rxjs';
import { toArray } from 'rxjs/operators';


describe("regionNamesFromLn", () => {
    it("should return city, state and country when all are available", () => {
        const results = regionNamesFromLn("Minneapolis, MN US");
        expect(results.length).toBe(3);
        expect(results[0]).toBe("Minneapolis");
        expect(results[1]).toBe("Minnesota");
        expect(results[2]).toBe("United States");
    });

    it("should return city and country when state is not available", () => {
        const results = regionNamesFromLn("Oslo, NO");
        expect(results.length).toBe(3);
        expect(results[0]).toBe("Oslo");
        expect(results[1]).toBeNull()
        expect(results[2]).toBe("Norway");
    });

    it("should not through an exception of string has no commas", () => {
        const results = regionNamesFromLn("Oslo NO");
        expect(results.length).toBe(3);
        expect(results[0]).toBe("Oslo NO");
        expect(results[1]).toBeNull();
        expect(results[2]).toBe(" - Has no associated name");
    });
});

describe("getLocationViewListObservable", () => {
    it ("should return a view list", (done)=>{
        getLocationViewListObservable(from(testLocations)).
            pipe(toArray()).
                subscribe(l => {
                    expect(l.length).toBe(5);
               //     expect(l.filter(loc => loc.state == "Minnesota").length).toBe(2);
                //    expect(l.filter(loc => loc.country == "Norway").length).toBe(2);
                })
                done();
    });
});

const testLocations: Location[] = [
    {
        mindate: "1893-08-08",
        maxdate: "2019-11-18",
        name: "New Ulm, MN US",
        datacoverage: 1,
        id: "CITY:US270014"
    },
    {
        mindate: "1893-01-01",
       maxdate: "2019-11-18",
        name: "Mankato, MN US",
        datacoverage: 1,
        id: "CITY:US270011"
    },
    {
        mindate: "1895-11-01",
       maxdate: "2019-11-18",
        name: "Alexander City, AL US",
        datacoverage: 1,
        id: "CITY:US010001"
    },
    {
        mindate: "1882-12-31",
       maxdate: "2019-11-16",
        name: "Oslo, NO",
        datacoverage: 1,
        id: "CITY:NO000004"
    },
    {
        mindate: "1895-06-30",
       maxdate: "2019-11-16",
        name: "Stavanger, NO",
        datacoverage: 1,
        id: "CITY:NO000005"
    }
]