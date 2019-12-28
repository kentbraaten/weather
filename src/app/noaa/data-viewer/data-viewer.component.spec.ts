import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewerComponent } from './data-viewer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from '../state/noaa.reducer';
import { GoogleChartsModule } from 'angular-google-charts';

describe('DataViewerComponent', () => {
  let component: DataViewerComponent;
  let fixture: ComponentFixture<DataViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataViewerComponent ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature("noaa",reducer),
        EffectsModule.forRoot([]),
        GoogleChartsModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
