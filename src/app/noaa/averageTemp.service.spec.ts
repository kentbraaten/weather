import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NoaaModule} from './noaa.module';
import { AverageTempService } from './AverageTemp.service';
import { AverageTempData } from './noaa.types';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { toArray } from 'rxjs/operators';

describe('AverageTempService.getData()', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports:[
        HttpClientModule, 
        NoaaModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers:[AverageTempService]
    }));

    it ("should return data", (done) => {
        let received = false;
        const service: AverageTempService = TestBed.get(AverageTempService);
        service.getData("CITY:US270013", "2000-01-01", "2010-01-01").subscribe(at => 
          {
            received = true;
          },
          (err) => console.log(err),
          () => {
            done();
            expect(received).toBeTruthy();
          });
    });

    it ("should have one value for each year", (done) => {
      let data: AverageTempData[];
      const service: AverageTempService = TestBed.get(AverageTempService);
      service.getData("CITY:US270013", "2001-01-01", "2010-01-01").pipe(toArray()).subscribe(at => 
        {
          data = at;
        },
        (err) => console.log(err),
        () => {
          done();
          expect(data.length).toBe(10);
          expect(data.filter(at => at[0].startsWith("2001")).length).toBe(1);
        });
  });

});

/*
describe('AverageTempService.getAllData()', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientModule, 
      NoaaModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([])
    ],
    providers:[AverageTempService]
  }));

  it ("should return data", (done) => {
      let received = false;
      const service: AverageTempService = TestBed.get(AverageTempService);
      service.getCentryWorthOfData("CITY:US270013").subscribe(at => 
        {
          received = true;
        },
        (err) => console.log(err),
        () => {
          done();
          expect(received).toBeTruthy();
        });
  });

}); */