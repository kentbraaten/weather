import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LocationsService } from '../locations.service';
import { Location, AverageTempData } from '../noaa.types';
import * as noaaActions from  './noaa.actions';
import { mergeMap, map } from 'rxjs/operators';
import { AverageTempService } from '../averageTemp.service';

@Injectable()
export class NoaaEffects {
    constructor(private actions$: Actions,
        private locationsService: LocationsService,
        private averageTempService: AverageTempService) {}

    @Effect()
    loadLocations$ = this.actions$.pipe(
        ofType(noaaActions.NoaaActionTypes.LOAD_ACTIONS),
        mergeMap((action: noaaActions.LoadLocations) => this.locationsService.getData().pipe(
            map((locations: Location[]) => new noaaActions.LoadLocationsSuccess(locations))) 
        )
    )

    @Effect()
    loadAverageTempData$ = this.actions$.pipe(
        ofType(noaaActions.NoaaActionTypes.LOAD_AVERAGE_TEMP_DATA),
        mergeMap((action: noaaActions.LoadAverageTempData) => this.averageTempService.getChartData(action.payload).pipe(
            map((chartData: AverageTempData[]) => new noaaActions.LoadAverageTempSuccess(chartData))
        )
    )
    )
}