import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoaaModule } from './noaa/noaa.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationsService } from './noaa/locations.service';
import { MockLocationsService } from './noaa/mock-locations.service';
import { AverageTempService } from './noaa/averageTemp.service';
import { MockAverageTempService } from './noaa/mock-averageTemp.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoaaModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        GoogleChartsModule.forRoot(),
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    TestBed.overrideProvider(LocationsService, {useValue: new MockLocationsService});
    TestBed.overrideProvider(AverageTempService, {useValue: new MockAverageTempService});
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'noaa-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('noaa-app');
  });
});
