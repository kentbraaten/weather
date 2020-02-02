import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, switchMap, map, toArray, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { LoadLocations, SelectCountry, SelectLocation, SelectStateRegion } from '../state/noaa.actions';
import * as fromNoaa from '../state/index';
import * as locationFuncs from '../locationFuncs';
import {Location, LocationView, CountryView, StateRgnView} from '../noaa.types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  @ViewChild('input',{static: true}) input: ElementRef;

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

  /*
  hit for clearing the state a location dropdowns - use a Viewchild
    @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  // Call to clear
  this.ngSelectComponent.handleClearClick();
  */
  locationSelected(selectedLocation: LocationView) {
    this.store.dispatch(new SelectLocation(selectedLocation.id));
  }

  countrySelected(country: string){
    this.store.dispatch(new this.selectCountry(country));
  }

  groupByCountry(location: LocationView) {
    location.state ? `${location.country}-${location.state}` : location.country;
  }

  runLookup(term: string) {
    console.log("This is what was typed " + term);
  }

  compareLocations(item: LocationView, selected: LocationView)  {
    if (selected.country && item.country) {
        return item.country === selected.country;
    }
    if (item.city && selected.city) {
        return item.city === selected.city;
    }
    return false;
  };

  selectCountry($event) {
    const country = ($event && $event.country) ? $event.country : "";
    this.store.dispatch(new SelectCountry(country));
  }

  selectState($event) {
    const state = ($event && $event.state) ? $event.state : "";
    this.store.dispatch(new SelectStateRegion(state));
  }

  selectLocation($event) {
    this.store.dispatch(new SelectLocation($event.item.id));
  }

  countryFormatter = (value: any) => value.name;
}
