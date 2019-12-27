import { Injectable } from '@angular/core';
import { NoaaModule } from './noaa.module';
import { HttpClient } from '@angular/common/http';
import { Observable, of, merge, interval } from 'rxjs';
import { cityLocationsFunc, requestHeader } from './service-meta-data';
import { mergeMap, take, pluck } from 'rxjs/operators';
import { Location, ServiceReturnValue } from './noaa.types';

const urlFunc = cityLocationsFunc(1000);

@Injectable()
export class LocationsService {
  constructor(private http: HttpClient) { }

  getData(): Observable<Location[]> {
    return this.http.get<ServiceReturnValue>(urlFunc(1),requestHeader()).pipe(
      mergeMap(results => this.pagingQuery(results))
    );
  }

  private pagingQuery(input: ServiceReturnValue) : Observable<Location[]> {
    if (input.metadata.resultset.count <= input.metadata.resultset.limit){
      return of(input.results);
    } else {
      return merge(of(input.results), this.intervalQuery(input));
    }
  }

  private intervalQuery(input: ServiceReturnValue): Observable<any> {
    const intervalQuery$ = interval(250);
    return intervalQuery$.pipe(
      take(this.getNumQueries(input)),
      mergeMap(i => this.singlePageQuery(i, input.metadata.resultset.count, input.metadata.resultset.limit))
    )
  }

  private singlePageQuery(pageNum: number, count: number, limit: number) : Observable<any> {
    return this.http.get<any>(urlFunc(count * limit + 1),requestHeader()).pipe(
      pluck("results")
    )
  }

  private getNumQueries(firstResult: ServiceReturnValue): number{
    const mod = firstResult.metadata.resultset.count % firstResult.metadata.resultset.limit;
    const numQueries =  Math.trunc(firstResult.metadata.resultset.count / firstResult.metadata.resultset.limit);
    if (mod == 0) {
      return numQueries - 1 
    }
    return numQueries;
  }
}
