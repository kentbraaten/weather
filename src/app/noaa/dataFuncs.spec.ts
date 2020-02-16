import {AverageTempData} from './noaa.types';
import { serviceDataToChartData } from './dataFuncs';
import { of } from 'rxjs';

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