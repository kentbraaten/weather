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

  var data = [];

  it('should return data', (done) => {
    const service: LocationsService = TestBed.get(LocationsService);
    
    service.getData().subscribe((item) =>
    {
      data.push(item);
    }, 
      (err) => console.log(err), 
      () => {
        expect(data.length).toBe(1);
        expect(data[0].length).toBeGreaterThan(600);
        expect(data[0][0].name).toBeTruthy
        done();
      })
});
/*
  it('should do stuff', () => {
    const service: WeatherDataService = TestBed.get(WeatherDataService);
   // service.getData().subscribe(d => console.log(d));
  });
*/
});
