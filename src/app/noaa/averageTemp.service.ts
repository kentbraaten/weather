import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AverageTempData, AverageTempServiceReturnValue, LocationView } from './noaa.types';
import { averageTempDataFunc, requestHeader } from './service-meta-data';
import { map } from 'rxjs/operators';
import { averageTempDataListFromPages } from './avergeTempFuncs';


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
}