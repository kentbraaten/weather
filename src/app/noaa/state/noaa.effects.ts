import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LocationsService } from '../locations.service';
import { Location } from '../noaa.types';
import * as noaaActions from  './noaa.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class NoaaEffects {
    constructor(private actions$: Actions,
        private locationsService: LocationsService) {}

    @Effect()
    loadLocations$ = this.actions$.pipe(
        ofType(noaaActions.NoaaActionTypes.LOAD_ACTIONS),
        mergeMap((action: noaaActions.LoadLocations) => this.locationsService.getData().pipe(
            map((locations: Location[]) => new noaaActions.LoadLocationsSuccess(locations))) 
        )
    )
}