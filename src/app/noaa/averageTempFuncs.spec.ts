import { Observable, of, from, interval } from 'rxjs';
import { AverageTempData, LocationView } from './noaa.types';
import { filter, toArray, tap, mergeMap, take} from 'rxjs/operators';
import { averageTempDataListFromPages } from './avergeTempFuncs';
import { serviceDataToChartData, hotestYears } from './dataFuncs';
import * as R from "rambda";

const lookupFunc = (locId: string, startDate: string, endDate: string)=> {
    const startNum = parseInt(startDate);
    const endNum = parseInt(endDate);
    const between = (cmpNum: number, startDate: string, endDate: string ) => 
                                         startNum <= cmpNum && cmpNum <= endNum;
    return from(mockData)
    .pipe(
        filter(avt=> between(parseInt(avt.date.slice(0,4)), startDate, endDate)),
        toArray()
    )  
}

const avTmpPageLookupFunc = R.curry(averageTempDataListFromPages)(lookupFunc);

describe("averageTempDataListFromPages", () => {
    it("combines data from several pages plus a terminating row", (done)=>{
        let values = [];
        avTmpPageLookupFunc(mockLocation)
        .subscribe(
            {
                next: (avtl) => values = [...values, ...avtl],
                error: (e) => console.log(e),
                complete: () => {
                    expect(10).toEqual(values.length);
                    done();
                }
            }
        )
    });

    it("Uses date range in location object to calculate ranges", (done)=>{
        let values = [];
        avTmpPageLookupFunc(mockShortedRanges)
        .subscribe(
            {
                next: (avtl) => values = [...values, ...avtl],
                error: (e) => console.log(e),
                complete: () => {
                    expect(7).toEqual(values.length);
                    done();
                }
            }
        )
    });

    it("Adds a AverageTempData record with year '0000-00-00' to the end of the list", (done)=>{
        let values = [];
        avTmpPageLookupFunc(mockShortedRanges)
        .subscribe(
            {
                next: (avtl) => values = [...values, ...avtl],
                error: (e) => console.log(e),
                complete: () => {
                    expect("0000-00-00").toEqual(values[6][0]);
                    done();
                }
            })
    });

    it("Pages do not overlap", (done)=> {
        let values = [];
        avTmpPageLookupFunc(mockShortedRanges)
        .subscribe(
            {
                next: (avtl) => values = [...values, ...avtl],
                error: (e) => console.log(e),
                complete: () => {
                    const years = new Set();
                    values.forEach(v => years.add(v[0]));
                    expect(years.size).toEqual(values.length);
                    done();
                }
            })
    });
});

const mockLocation: LocationView = {
    id: "CITY000000",
    maxdate: "2030-01-01",
    mindate: "2000-01-01",
    city: "Minot",
    state: "ND",
    country: "US"
};

const mockShortedRanges: LocationView = {
    id: "CITY000000",
    maxdate: "2020-01-01",
    mindate: "2000-01-01",
    city: "Minot",
    state: "ND",
    country: "US"
};

const mockData = [
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 54.1
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 58.1
    },
    {
        date: "2009-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 55.3
    },
    {
        date: "2010-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 54.1
    },
    {
        date: "2015-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 58.1
    },
    {
        date: "2019-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 55.3
    },
    {
        date: "2020-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 54.1
    },
    {
        date: "2022-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 58.1
    },
    {
        date: "2029-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 55.3
    }

];

