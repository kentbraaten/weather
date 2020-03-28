import { TestBed } from '@angular/core/testing';


import { HttpClientModule } from '@angular/common/http';
import { NoaaModule} from './noaa.module';
import { LocationsService } from './locations.service';
import { MockLocationsService } from './mock-locations.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientModule, 
      NoaaModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([])],
    providers:[LocationsService, MockLocationsService]
  }));

  it('should be created', () => {
    const service: LocationsService = TestBed.get(LocationsService);
    expect(service).toBeTruthy();
  });

});
