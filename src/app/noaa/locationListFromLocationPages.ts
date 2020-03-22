import { Observable, of, merge, interval } from 'rxjs';
import { mergeMap, take, pluck } from 'rxjs/operators'
import { ServiceReturnValue, Location } from './noaa.types'

export function locationListFromLocationPages(lookupFunc: (page: number) => Observable<ServiceReturnValue>) : Observable<Location[]> {
    return lookupFunc(1).pipe(
        mergeMap(results => pagingQuery(results))
      );

      function pagingQuery(input: ServiceReturnValue) : Observable<Location[]> {
        if (input.metadata.resultset.count <= input.metadata.resultset.limit){
          return of(input.results);
        } else {
          return merge(of(input.results), intervalQuery(input));
        }
      }

      function intervalQuery(input: ServiceReturnValue): Observable<Location[]> {
        const intervalQuery$ = interval(250);
        const numQueries = getNumQueries(input);
        return intervalQuery$.pipe(
          take(numQueries),
          mergeMap(i => singlePageQuery(i + 2, input.metadata.resultset.count, input.metadata.resultset.limit))
        )
      }

      function singlePageQuery(pageNum: number, count: number, limit: number) : Observable<any> {
        return lookupFunc(pageNum).pipe(
          pluck("results")
        )
      }

      function getNumQueries(firstResult: ServiceReturnValue): number{
        const mod = firstResult.metadata.resultset.count % firstResult.metadata.resultset.limit;
        const numQueries =  Math.trunc(firstResult.metadata.resultset.count / firstResult.metadata.resultset.limit);
        if (mod == 0) {
          return numQueries - 1 
        }
        
        return numQueries;
      }
}