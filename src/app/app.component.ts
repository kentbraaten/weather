import { Component, OnInit, Input } from '@angular/core';
import { NoaaModule } from './noaa/noaa.module'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.reducer';
import { waitSelector } from './state/app.selectors';
import * as Noaa from './noaa/state/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'noaa-app';
  public opened: boolean;
  public waiting$: Observable<boolean>;
  public chartName$: Observable<string>;
  public dataAvailable$: Observable<boolean>;
  public averageTempData$: Observable<(string | number)[][]>;

  constructor(private store: Store<AppState>,
              private noaaStore: Store<Noaa.State>) { }
  ngOnInit() {
    this.waiting$ = this.store.select(waitSelector);
    this.chartName$ = this.noaaStore.select(Noaa.getChartNameSelector);
    this.averageTempData$ = this.store.select(Noaa.averageTempSelector);
    this.dataAvailable$ = this.store.select(Noaa.averageTempDataAvailableSelector);
  }
}
