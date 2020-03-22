import { locationListFromLocationPages } from './locationListFromLocationPages';
import { Observable, of, interval } from 'rxjs';
import { ServiceReturnValue } from './noaa.types';
import { take } from 'rxjs/operators';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';


describe("getLocations function", () => {
  it("Handles Multiple pages seemlessly", (done) => {
    let results = [];
    locationListFromLocationPages(locationsFromArray).subscribe(
       (val) => results = results.concat(val),
        (err) => console.log(err),
        () => {
            expect(results.length).toEqual(17);
            expect(results[0].name).toEqual("Algiers, AG");
            expect(results[16].name).toEqual("Worthington, MN US")
            done();
        }
        );
    })

  it("Handles when only one page needs to be returned", (done) => {
    let results = [];
    locationListFromLocationPages(onePageLocation).subscribe(
        {
            next: (val) => results = [...results,...val],
            complete: () => {
                expect(results.length).toEqual(6);
                done();
            } 
        }
    )
  });

  it("works when the last page has is a full page", (done) => {
    let results = [];
    locationListFromLocationPages(lastPageIsFull).subscribe(
        {
            next: (val) => results = [...results,...val],
            complete: () => {
                expect(results.length).toEqual(12);
                done();
            } 
        }
    )
  });
});


function locationsFromArray(page: number): Observable<ServiceReturnValue> {
    return of(testData[page - 1]);
}

function onePageLocation(page: number): Observable<ServiceReturnValue> {
    return of(onePageTestData);
}

function lastPageIsFull(page: number): Observable<ServiceReturnValue> {
    return of(twoPagesOfSix[page - 1]);
}

const testData : ServiceReturnValue[] = [
    {
        metadata: {
            resultset: {
                offset: 1,
                count: 17,
                limit: 6
            }
        },
        results: [
            {
                mindate: "1877-04-07",
                maxdate: "2019-11-16",
                name: "Algiers, AG",
                datacoverage: 1,
                id: "CITY:AG000001"
            },
            {
                mindate: "1880-05-18",
                maxdate: "2019-11-16",
                name: "Constantine, AG",
                datacoverage: 0.7634,
                id: "CITY:AG000006"
            },
            {
                mindate: "1896-02-01",
               maxdate: "2019-11-18",
                name: "Bemidji, MN US",
                datacoverage: 1,
                id: "CITY:US270002"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "Brainerd, MN US",
                datacoverage: 1,
                id: "CITY:US270003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fairmont, MN US",
                datacoverage: 1,
                id: "CITY:US270006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Faribault, MN US",
                datacoverage: 1,
                id: "CITY:US270007"
            }
        ]
    },
   {
    metadata: {
        resultset: {
            offset: 7,
            count: 11,
            limit: 6
        }
    },
    results: [
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-17",
            name: "Fergus Falls, MN US",
            datacoverage: 1,
            id: "CITY:US270008"
        },
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-18",
            name: "Hutchinson, MN US",
            datacoverage: 1,
            id: "CITY:US270010"
        },
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-18",
            name: "Mankato, MN US",
            datacoverage: 1,
            id: "CITY:US270011"
        },
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-18",
            name: "Marshall, MN US",
            datacoverage: 1,
            id: "CITY:US270012"
        },
        {
            mindate: "1891-01-01",
           maxdate: "2019-11-18",
            name: "Minneapolis, MN US",
            datacoverage: 1,
            id: "CITY:US270013"
        },
        {
            mindate: "1893-08-08",
           maxdate: "2019-11-18",
            name: "New Ulm, MN US",
            datacoverage: 1,
            id: "CITY:US270014"
        }
    ]
   },
   {
    metadata: {
        resultset: {
            offset: 19,
            count: 5,
            limit: 6
        }
    },
    results: [      
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-18",
            name: "Owatonna, MN US",
            datacoverage: 1,
            id: "CITY:US270015"
        },
        {
            mindate: "1891-01-01",
           maxdate: "2019-11-18",
            name: "Saint Paul, MN US",
            datacoverage: 1,
            id: "CITY:US270017"
        },
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-18",
            name: "St. Cloud, MN US",
            datacoverage: 1,
            id: "CITY:US270018"
        },
        {
            mindate: "1893-03-01",
           maxdate: "2019-11-18",
            name: "Willmar, MN US",
            datacoverage: 1,
            id: "CITY:US270019"
        },
        {
            mindate: "1893-01-01",
           maxdate: "2019-11-17",
            name: "Worthington, MN US",
            datacoverage: 1,
            id: "CITY:US270020"
        }
    ]
   }
]

const onePageTestData : ServiceReturnValue = 
    {
        metadata: {
            resultset: {
                offset: 1,
                count: 6,
                limit: 12
            }
        },
        results: [
            {
                mindate: "1877-04-07",
                maxdate: "2019-11-16",
                name: "Algiers, AG",
                datacoverage: 1,
                id: "CITY:AG000001"
            },
            {
                mindate: "1880-05-18",
                maxdate: "2019-11-16",
                name: "Constantine, AG",
                datacoverage: 0.7634,
                id: "CITY:AG000006"
            },
            {
                mindate: "1896-02-01",
               maxdate: "2019-11-18",
                name: "Bemidji, MN US",
                datacoverage: 1,
                id: "CITY:US270002"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "Brainerd, MN US",
                datacoverage: 1,
                id: "CITY:US270003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fairmont, MN US",
                datacoverage: 1,
                id: "CITY:US270006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Faribault, MN US",
                datacoverage: 1,
                id: "CITY:US270007"
            }
        ]
    }

    const twoPagesOfSix : ServiceReturnValue[] = [
        {
            metadata: {
                resultset: {
                    offset: 1,
                    count: 12,
                    limit: 6
                }
            },
            results: [
                {
                    mindate: "1877-04-07",
                    maxdate: "2019-11-16",
                    name: "Algiers, AG",
                    datacoverage: 1,
                    id: "CITY:AG000001"
                },
                {
                    mindate: "1880-05-18",
                    maxdate: "2019-11-16",
                    name: "Constantine, AG",
                    datacoverage: 0.7634,
                    id: "CITY:AG000006"
                },
                {
                    mindate: "1896-02-01",
                   maxdate: "2019-11-18",
                    name: "Bemidji, MN US",
                    datacoverage: 1,
                    id: "CITY:US270002"
                },
                {
                    mindate: "1889-01-01",
                   maxdate: "2019-11-18",
                    name: "Brainerd, MN US",
                    datacoverage: 1,
                    id: "CITY:US270003"
                },
                {
                    mindate: "1893-01-01",
                   maxdate: "2019-11-18",
                    name: "Fairmont, MN US",
                    datacoverage: 1,
                    id: "CITY:US270006"
                },
                {
                    mindate: "1893-01-01",
                   maxdate: "2019-11-18",
                    name: "Faribault, MN US",
                    datacoverage: 1,
                    id: "CITY:US270007"
                }
            ]
        },
       {
        metadata: {
            resultset: {
                offset: 7,
                count: 12,
                limit: 6
            }
        },
        results: [
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-17",
                name: "Fergus Falls, MN US",
                datacoverage: 1,
                id: "CITY:US270008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hutchinson, MN US",
                datacoverage: 1,
                id: "CITY:US270010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Mankato, MN US",
                datacoverage: 1,
                id: "CITY:US270011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Marshall, MN US",
                datacoverage: 1,
                id: "CITY:US270012"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-18",
                name: "Minneapolis, MN US",
                datacoverage: 1,
                id: "CITY:US270013"
            },
            {
                mindate: "1893-08-08",
               maxdate: "2019-11-18",
                name: "New Ulm, MN US",
                datacoverage: 1,
                id: "CITY:US270014"
            }
        ]
       }
    ]