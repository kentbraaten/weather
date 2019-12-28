import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNoaa from '../state/index';
import * as noaaActions from '../state/noaa.actions';
import { Subscription, of, from } from 'rxjs';
import { filter, mergeMap, map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {

  constructor(private store: Store<fromNoaa.State>) { }
  private locationSubscription: Subscription;
  private dataSubscription: Subscription;
  chartData = [];
  columnNames = [];
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
      .subscribe(locId => {
        if (locId) {
          this.store.dispatch(new noaaActions.LoadAverageTempData(locId))
        }
      });
      this.dataSubscription = this.store.select(fromNoaa.averageTempSelector)
  /*        .pipe(
            mergeMap(l => l),
            map(avt => [avt.date.slice(0,4),avt.value]),
            toArray()
          )*/
          .subscribe(
            l => {
              from(l).pipe(
                map(avt => [avt.date.slice(0,4),avt.value]),
                toArray()
              ).subscribe(
                l => this.chartData = l
              )
            }
          );
      this.columnNames = this.getChartColumnNames();
  }

  ngOnDistroy() {
    this.locationSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  private getChartColumnNames() {
    return ['Year', 'Average High']
  }


}
