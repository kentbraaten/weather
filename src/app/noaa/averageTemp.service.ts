import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { AverageTempData, AverageTempServiceReturnValue, DateRange } from './noaa.types';
import { averageTempDataFunc, requestHeader } from './service-meta-data';
import {  map, distinct, mergeMap, toArray, take } from 'rxjs/operators';

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
  {startDate: '2010-01-01', endDate: '2019-01-01'}
]

const getDateRange = (idx: number) => dateRanges[idx];

@Injectable()
export class AverageTempService {
  constructor(private http: HttpClient) { }
  
  getChartData(location: string): Observable<AverageTempData[]> {
    return interval(251).pipe(
      take(dateRanges.length),
      map(idx => getDateRange(idx)),
      mergeMap(range => this.getData(location, range.startDate, range.endDate)),
      toArray()
    )
  }

  getData(location: string, startDate: string, endDate: string): Observable<AverageTempData> {
    return this.http.get<AverageTempServiceReturnValue>(averageTempDataFunc(location, startDate, endDate),requestHeader())
    .pipe(
        map(results => results.results),
        mergeMap(l => l),
        distinct(at => at.date)
    );
  }
}



//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?data    tatypeid=TMAX, TMIN&limit=100&units=standard&startdate=2010-01-01&enddate=2018-01-01&locationid=CITY:US270013