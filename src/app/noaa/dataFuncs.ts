import {Observable} from 'rxjs';
import {AverageTempServiceReturnValue, AverageTempData} from './noaa.types';
import { map, filter, mergeMap, distinct, toArray } from 'rxjs/operators';

export const serviceDataToChartData = function(tempDataObsrv: Observable<AverageTempData[]>) : Observable<(string | number) [][]>{
    return tempDataObsrv.pipe(
        filter(results => results && results.length > 0),
        mergeMap(l => l),
        map(result => [result.date.slice(0,4), result.value]),
        distinct(at => at[0]),
        toArray()
    )
}