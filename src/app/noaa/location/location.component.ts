import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, switchMap, map, toArray, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { LoadLocations, SelectCountry, SelectLocation } from '../state/noaa.actions';
import * as fromNoaa from '../state/index';
import * as locationFuncs from '../locationFuncs';
import {Location, LocationView, CountryView} from '../noaa.types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  @ViewChild('input',{static: true}) input: ElementRef;

  public lookup$ : Observable<Location>;
  public locations$ : Observable<LocationView[]>;
  public countries$ : Observable<CountryView[]>;
  public model : any;
  public selectedLocationId: string;
 
  constructor(
    private store: Store<fromNoaa.State> ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocations());
    this.locations$ = this.store.select(fromNoaa.getLocationsSelector);
    this.countries$ = locationFuncs.getCountriesList(this.locations$);
  }

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
            mergeMap(([locations, cc]) => locationFuncs.getCityList("United States", term, from(locations)))
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
