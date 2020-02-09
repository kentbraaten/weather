import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, switchMap, map, toArray, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { LoadLocations, SelectCountry, SelectLocation, SelectStateRegion } from '../state/noaa.actions';
import * as fromNoaa from '../state/index';
import * as locationFuncs from '../locationFuncs';
import {Location, LocationView, CountryView, StateRgnView} from '../noaa.types';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  @ViewChild('citySelect', {static: false}) citySelect: NgSelectComponent;
  @ViewChild('stateSelect', {static: false}) stateSelect: NgSelectComponent;

  public lookup$ : Observable<Location>;
  public locations$ : Observable<LocationView[]>;
  public cityLocations$ : Observable<LocationView[]>;
  public countries$ : Observable<CountryView[]>;
  public stateRgns$ : Observable<StateRgnView[]>;
  public selectedCountry$ : Observable<string>;
  public selectedStateRegion$ : Observable<string>;
  public stateRegbind : StateRgnView;
  public model : any;
  public selectedLocationId: string;

 
  constructor(
    private store: Store<fromNoaa.State> ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocations());
    this.locations$ = this.store.select(fromNoaa.getLocationsSelector);
    this.selectedCountry$ = this.store.select(fromNoaa.getCountrySelector);
    this.selectedStateRegion$ = this.store.select(fromNoaa.getStateRegion);
    this.stateRgns$ = locationFuncs.getStateRegionList(this.locations$, this.selectedCountry$);
    this.countries$ = locationFuncs.getCountriesList(this.locations$);
    this.cityLocations$ = locationFuncs.getCitiesList(this.locations$, this.selectedCountry$, this.selectedStateRegion$);
  }

  locationSelected(selectedLocation: LocationView) {
    if (selectedLocation){
      this.store.dispatch(new SelectLocation(selectedLocation.id));
    }
  }

  selectCountry($event) {
    const country = ($event && $event.country) ? $event.country : "";
    this.store.dispatch(new SelectCountry(country));
    this.citySelect.handleClearClick();
    this.stateSelect.handleClearClick();
  }

  selectState($event) {
    const state = ($event && $event.state) ? $event.state : "";
    this.store.dispatch(new SelectStateRegion(state));
    this.citySelect.handleClearClick();
  }
}
