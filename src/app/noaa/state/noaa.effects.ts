import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LocationsService } from '../locations.service';
import { Location, AverageTempData, LocationView } from '../noaa.types';
import * as noaaActions from  './noaa.actions';
import * as appActions from '../../state/app.actions';
import { mergeMap, map, finalize, toArray } from 'rxjs/operators';
import { AverageTempService } from '../averageTemp.service';
import { getLocationViewListObservable } from '../locationFuncs';

@Injectable()
export class NoaaEffects {
    constructor(private actions$: Actions,
        private locationsService: LocationsService,
        private averageTempService: AverageTempService) {}

    @Effect()
    loadLocations$ = this.actions$.pipe(
        ofType(noaaActions.NoaaActionTypes.LOAD_ACTIONS),
        mergeMap((action: noaaActions.LoadLocations) => 
            getLocationViewListObservable(this.locationsService.getData().
                pipe(mergeMap(l => l))).pipe(
                    toArray(),
                    map((locations: LocationView[]) => new noaaActions.LoadLocationsSuccess(locations))
                ) 
            )
        )

    @Effect()
    loadAverageTempData$ = this.actions$.pipe(
        ofType(noaaActions.NoaaActionTypes.LOAD_AVERAGE_TEMP_DATA),
        mergeMap((action: noaaActions.LoadAverageTempData) => this.averageTempService.getChartData(action.payload).pipe(
            map((chartData: (string | number)[][]) => {
                if (chartData.length > 0 && (chartData[0])[0] == '0000-00-00'){
                    return new appActions.StopWait();
                } else {
                    return new noaaActions.LoadAverageTempSuccess(chartData);
                }
            })
        )
    )
    )

    @Effect()
    loadAverageTempDataWait$ = this.actions$.pipe(
        ofType(noaaActions.NoaaActionTypes.LOAD_AVERAGE_TEMP_DATA),
                map((action: noaaActions.LoadAverageTempData) => new appActions.StartWait())
    )
}