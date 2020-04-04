import {Observable, from, interval } from "rxjs";
import {take, concatMap, map, tap} from "rxjs/operators";
import { LocationView, AverageTempData } from "./noaa.types";
import { serviceDataToChartData } from './dataFuncs';

interface DateRange 
{
    startDate: string,
    endDate: string
}

export function averageTempDataListFromPages(
    lookupFunc: (locId: string, startDate: string, endDate: string) => 
        Observable<AverageTempData[]>,
    loc: LocationView) : Observable<(string | number)[][]> { 

    const ranges = createDateRangeArray([],parseInt(loc.mindate.slice(0,4)),
            parseInt(loc.maxdate.slice(0,4)));
    return interval(251).pipe(
        take(ranges.length),
        map(idx => ranges[idx]),
        concatMap((range) => {
            if (range.startDate == "0000-00-00"){
                return from(end());
            }
            return serviceDataToChartData(lookupFunc(loc.id, range.startDate, range.endDate))
        }));

    function end() : Observable<(string | number)[][]> {
        return from([[['0000-00-00', 0.0]]]);
      }

    function createDateRangeArray(accum: DateRange[], start: number, end: number ) : DateRange[] {
        if (start >= end){
            return [...accum, {startDate: "0000-00-00", endDate: "0000-00-00"}];
        }
        const pageEnd = start + 10 <= end ? start + 10 : end;
        return createDateRangeArray([...accum, {startDate: `${start}-01-01`, endDate: `${pageEnd}-01-01`}],
                start + 10, end);
    }
}