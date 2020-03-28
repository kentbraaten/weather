import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cityLocationsFunc, requestHeader } from './service-meta-data';
import { Location, ServiceReturnValue } from './noaa.types';
import {locationListFromLocationPages} from './locationListFromLocationPages';

const urlFunc = cityLocationsFunc(1000);

@Injectable()
export class LocationsService {
  constructor(private http: HttpClient) { }

  getData(): Observable<Location[]> {
    return locationListFromLocationPages((page: number) => 
          this.http.get<ServiceReturnValue>(urlFunc(page),requestHeader()));
  }
}
