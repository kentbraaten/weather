import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, switchMap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { LoadLocations, SelectCountry, SelectLocation } from '../state/noaa.actions';
import * as fromNoaa from '../state/index';
import * as locationFuncs from '../locationFuncs';
import {Location} from '../noaa.types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  @ViewChild('input',{static: true}) input: ElementRef;

  public lookup$ : Observable<Location>;
  public model : any;
 
  constructor(
    private store: Store<fromNoaa.State> ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocations());
  }

  searchCountries = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
      switchMap((term)=> this.store.select(fromNoaa.getLocationsSelector).pipe(
        mergeMap(locs => locationFuncs.getCountriesList(term, from(locs)))
      )
    ));

    searchCities = (text$: Observable<string>) => {
      const ccPlusLocation$ = combineLatest(
        [
          this.store.select(fromNoaa.getLocationsSelector),
          this.store.select(fromNoaa.getCountrySelector)
        ]
      );
      return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
          switchMap((term)=> ccPlusLocation$.pipe(
            mergeMap(([locations, cc]) => locationFuncs.getCityList(cc, term, from(locations)))
          )
        ));
    }


    selectCountry($event) {
      this.store.dispatch(new SelectCountry($event.item.code));
    }

    selectLocation($event) {
      this.store.dispatch(new SelectLocation($event.item.id));
    }

    countryFormatter = (value: any) => value.name;
}
