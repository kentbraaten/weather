import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  @Input() chartName: string;
  @Input() averageTempData: (string | number)[][];
  @Input() showChart: boolean;

  constructor(private store: Store<fromNoaa.State>) { }
  private locationSubscription: Subscription;
  
  columnNames = [];
  chartType = "LineChart";
  chartOptions = {
    chart: {
      title: 'Average High Temputure',
      subtitle: 'In Farenheit'
    }
  };

  ngOnInit() {
    this.locationSubscription = this.store.select(fromNoaa.locationIdSelector)
      .subscribe(location => {
        if (location) {
          this.store.dispatch(new noaaActions.LoadAverageTempData(location))
        }
      });
      
      this.columnNames = this.getChartColumnNames();
  }

  ngOnDistroy() {
    this.locationSubscription.unsubscribe();
  }

  private getChartColumnNames() {
    return ['Year', 'Average High']
  }
}
