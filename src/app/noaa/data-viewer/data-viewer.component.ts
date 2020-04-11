import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNoaa from '../state/index';
import * as noaaActions from '../state/noaa.actions';
import { Subscription, of, from, Observable } from 'rxjs';
import { filter, mergeMap, map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {

  constructor(private store: Store<fromNoaa.State>) { }
  private locationSubscription: Subscription;
  private averageTempData$: Observable<any>;
  columnNames = [];
  dataAvailable$: Observable<boolean>;
  chartName$: Observable<string>;
  chartType = "LineChart";
  chartName = "Average Temperture";
  chartOptions = {
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)'
    },
    width: 1100,
    height: 500
  };

  ngOnInit() {
    this.locationSubscription = this.store.select(fromNoaa.locationIdSelector)
      .subscribe(location => {
        if (location) {
          this.store.dispatch(new noaaActions.LoadAverageTempData(location))
        }
      });

      this.dataAvailable$ = this.store.select(fromNoaa.averageTempDataAvailableSelector);
      this.averageTempData$ = this.store.select(fromNoaa.averageTempSelector);
      this.chartName$ = this.store.select(fromNoaa.getChartNameSelector);
      this.columnNames = this.getChartColumnNames();
  }

  ngOnDistroy() {
    this.locationSubscription.unsubscribe();
  }

  private getChartColumnNames() {
    return ['Year', 'Average High']
  }


}
