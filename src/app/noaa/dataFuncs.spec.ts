import {AverageTempData} from './noaa.types';
import { serviceDataToChartData, hotestYears } from './dataFuncs';
import { of } from 'rxjs';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

describe("serviceDataToChartData", () => {
    it("Should return one row of data for each year", (done) => {
        serviceDataToChartData(of(averageTempData))
            .subscribe({
                next: (data: (string | number) [][]) => {
                    expect(data.length).toEqual(4);
                    expect(data[0][0]).toEqual("2000");
                    expect(data[1][0]).toEqual("2001");
                    expect(data[2][0]).toEqual("2002");
                    expect(data[3][0]).toEqual("2003");
                    done();
                } 
            })
    })

    it("Should return an average of high tempertures", (done) => {
        serviceDataToChartData(of(averageTempData))
            .subscribe({
                next: (data: (string | number)[][]) => {
                    expect(data[0][1]).toBe(31.666666666666668);
                    done();
                }
            }

            )
    })
});

describe("hotestYears", () => {
    it ("should return the hotest years sorted hotest first", (done) => {
        hotestYears(5, of(chartData)).subscribe(
            {
                next: (sortedList: (string | number) [][] ) => {
                    expect(sortedList[0][0]).toEqual("2008");
                    expect(sortedList[0][1]).toEqual(46);
                    expect(sortedList[1][0]).toEqual("2012");
                    expect(sortedList[1][1]).toEqual(45);
                    expect(sortedList[2][0]).toEqual("2006");
                    expect(sortedList[2][1]).toEqual(44);
                    expect(sortedList[3][0]).toEqual("2005");
                    expect(sortedList[3][1]).toEqual(43);
                    expect(sortedList[4][0]).toEqual("2009");
                    expect(sortedList[4][1]).toEqual(42);
                    done();
                }
            }
        );
    })

    it("should return num rows requested", (done) => {
        hotestYears(4, of(chartData)).subscribe(
            {
                next: (l) => {
                    expect(l.length).toEqual(4);
                    done();
                }
            }
        )
    });

    it ("should handle more rows requested than available", (done) => {
        hotestYears(20, of(chartData)).subscribe({
            next: l => {
                expect(l.length).toEqual(14);
                done();
            }
        })
    })
});

const chartData: (string | number) [][] = [
    ["2001", 32],
    ["2002", 28],
    ["2003", 33],
    ["2004", 35],
    ["2005", 43],
    ["2006", 44],
    ["2007", 30],
    ["2008", 46],
    ["2009", 42],
    ["2010", 27],
    ["2011", 30],
    ["2012", 45],
    ["2013", 36],
    ["2014", 40]
];


const averageTempData: AverageTempData[] =[
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 25
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 35
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 35
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 15
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 20
    },
    {
        date: "2000-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 15
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
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 55.6
    },
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094963",
        attributes: "W",
        value: 56.1
    },
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 20
    },
    {
        date: "2001-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USW00094963",
        attributes: "W",
        value: 22
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 54.3
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00215838",
        attributes: "0",
        value: 54.9
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00218450",
        attributes: "0",
        value: 56.3
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014922",
        attributes: "0",
        value: 55.1
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014927",
        attributes: "W",
        value: 55.2
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 54.4
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094963",
        attributes: "W",
        value: 55.5
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014927",
        attributes: "W",
        value: 15
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 17
    },
    {
        date: "2002-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094963",
        attributes: "W",
        value: 16
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00211448",
        attributes: "0",
        value: 54.4
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00214884",
        attributes: "0",
        value: 57.2
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USC00218450",
        attributes: "0",
        value: 56.4
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014922",
        attributes: "0",
        value: 55.1
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00014927",
        attributes: "W",
        value: 55.8
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 54.9
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMAX",
        station: "GHCND:USW00094963",
        attributes: "W",
        value: 55.6
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USW00094960",
        attributes: "W",
        value: 20
    },
    {
        date: "2003-01-01T00:00:00",
        datatype: "TMIN",
        station: "GHCND:USW00094963",
        attributes: "W",
        value: 30
    }
]