import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotestTempsComponent } from './hotest-temps.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/noaa.reducer';

describe('HotestTempsComponent', () => {
  let component: HotestTempsComponent;
  let fixture: ComponentFixture<HotestTempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotestTempsComponent ],
      imports: [StoreModule.forRoot({}),
        StoreModule.forFeature("noaa",reducer)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotestTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
