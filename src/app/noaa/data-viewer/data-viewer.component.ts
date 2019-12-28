import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNoaa from '../state/index';
import * as noaaActions from '../state/noaa.actions';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {

  constructor(private store: Store<fromNoaa.State>) { }
  private locationSubscription: Subscription;

  ngOnInit() {
    this.locationSubscription = this.store.select(fromNoaa.locationIdSelector)
      .subscribe(locId => {
        if (locId) {
          this.store.dispatch(new noaaActions.LoadAverageTempData(locId))
        }
      });
  }

  ngOnDistroy() {
    this.locationSubscription.unsubscribe();
  }

}
