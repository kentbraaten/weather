import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LocationComponent } from './location.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoaaModule } from '../noaa.module';
import { reducer } from '../state/noaa.reducer';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        StoreModule.forFeature("noaa",reducer),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgbModule,
        CommonModule,
        HttpClientTestingModule,
        NoaaModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', 
      () => {
            expect(component).toBeTruthy();
          }
      );
});
