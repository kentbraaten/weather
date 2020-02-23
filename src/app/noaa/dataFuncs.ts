import {Observable} from 'rxjs';
import {AverageTempServiceReturnValue, AverageTempData} from './noaa.types';
import { map, filter, mergeMap, distinct, toArray, groupBy, reduce } from 'rxjs/operators';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

class AverageTempAcumpulator{

    constructor(private averageTempSum: number, private readingsCount: number){}

    public reduce(value: AverageTempData) : AverageTempAcumpulator{
        if (value.datatype == "TMAX") {
            return new AverageTempAcumpulator(this.averageTempSum + value.value, this.readingsCount + 1);
        }
        return this;
    }

    public getReducedValue(): number {
        if (this.readingsCount == 0){
            return 0;
        }
        return this.averageTempSum / this.readingsCount;
    }
}

const averageTempCmp = function(at1: (string | number) [], at2: (string | number) []) : number {
    if (at1[1] < at2[1]) {
        return 1;
    } else if (at1[1] > at2[1]){
        return -1;
    }
    return 0;
}

export const hotestYears = function(numRows: number, allYears: Observable<(string | number) [][]>) : Observable<(string | number) [][]>{
    return allYears.pipe(
        map(l => {
            var lcopy = [...l];
            lcopy.sort(averageTempCmp);
            if (lcopy.length > numRows){
                return lcopy.slice(0,numRows);
            }
            return lcopy;
        })
    )
}

export const serviceDataToChartData = function(tempDataObsrv: Observable<AverageTempData[]>) : Observable<(string | number) [][]>{
    return tempDataObsrv.pipe(
        filter(results => results && results.length > 0),
        mergeMap(l => l),
        groupBy(v => v.date),
        mergeMap(v => reduceByDate(v, v.key)),
        toArray()
    );
}

export const reduceChartDataToTopXHighs = function(chartData: Observable<(string | number) [][]>) : any {
    return chartData.pipe(

    );
}

const reduceByDate = (avTempByDate: Observable<AverageTempData>, dateStr: string): Observable<(string | number) []> =>  {
    const seed: AverageTempAcumpulator = new AverageTempAcumpulator(0,0);
    return avTempByDate.pipe(
        reduce((acc: AverageTempAcumpulator, value: AverageTempData) => acc.reduce(value), seed),
        map((acc: AverageTempAcumpulator) => [dateStr.slice(0,4), acc.getReducedValue()])
    );
}