import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, from } from 'rxjs';
import { AverageTempData, AverageTempServiceReturnValue, LocationView, DateRange } from './noaa.types';
import { averageTempDataFunc, requestHeader } from './service-meta-data';
import {  map, distinct, mergeMap, toArray, take, concatMap, filter } from 'rxjs/operators';
import { serviceDataToChartData } from './dataFuncs';
import {averageTempDataListFromPages} from './avergeTempFuncs';

const dateRanges = [
  {startDate: '1890-01-01', endDate: '1899-01-01'},
  {startDate: '1900-01-01', endDate: '1909-01-01'},
  {startDate: '1910-01-01', endDate: '1919-01-01'},
  {startDate: '1920-01-01', endDate: '1929-01-01'},
  {startDate: '1930-01-01', endDate: '1939-01-01'},
  {startDate: '1940-01-01', endDate: '1949-01-01'},
  {startDate: '1950-01-01', endDate: '1959-01-01'},
  {startDate: '1960-01-01', endDate: '1969-01-01'},
  {startDate: '1970-01-01', endDate: '1979-01-01'},
  {startDate: '1980-01-01', endDate: '1989-01-01'},
  {startDate: '1990-01-01', endDate: '1999-01-01'},
  {startDate: '2000-01-01', endDate: '2009-01-01'},
  {startDate: '2010-01-01', endDate: '2019-01-01'},
  {startDate: '0000-00-00', endDate: '0000-00-00'}
]

const getDateRange = (idx: number) => dateRanges[idx];

@Injectable()
export class AverageTempService {
  constructor(private http: HttpClient) { }
  
  getChartData(location: LocationView): Observable<(string | number) [][]> {
    return averageTempDataListFromPages(this.getHttpLokupFunc(this.http), location)
  }

  getHttpLokupFunc(http: HttpClient) {

    return (location: string, startDate: string, endDate: string): Observable<AverageTempData[]> =>  {
      return http.get<AverageTempServiceReturnValue>
          (averageTempDataFunc(location, startDate, endDate),requestHeader())
          .pipe(
            map(results => results.results)
          )
    }
  }

  lookupHttpData(location: string, startDate: string, endDate: string): Observable<AverageTempData[]> {
    return this.http.get<AverageTempServiceReturnValue>
        (averageTempDataFunc(location, startDate, endDate),requestHeader())
        .pipe(
          map(results => results.results)
        )
  }

  getData(location: string, startDate: string, endDate: string): Observable<(string | number) [][]> {
    return serviceDataToChartData(this.http.get<AverageTempServiceReturnValue>(averageTempDataFunc(location, startDate, endDate),requestHeader())
    .pipe(
        map(results => results.results),
    ));
  }

  theEnd : (string | number)[][] = [['0000-00-00', 0.0]];

  end() : Observable<(string | number)[][]> {
    return from([[['0000-00-00', 0.0]]]);
  }
}



//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?data    tatypeid=TMAX, TMIN&limit=100&units=standard&startdate=2010-01-01&enddate=2018-01-01&locationid=CITY:US270013