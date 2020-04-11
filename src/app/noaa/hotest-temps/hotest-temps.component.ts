import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromNoaa from '../state/index';
import {hotestYears} from '../dataFuncs';

@Component({
  selector: 'app-hotest-temps',
  templateUrl: './hotest-temps.component.html',
  styleUrls: ['./hotest-temps.component.css']
})
export class HotestTempsComponent implements OnInit {
  private hotestYears$ : Observable<(string|number)[][]>
  private dataAvailable$: Observable<boolean>;
  constructor(private store: Store<fromNoaa.State>) { }

  ngOnInit() {
    this.hotestYears$ = hotestYears(5, this.store.select(fromNoaa.averageTempSelector));
    this.dataAvailable$ = this.store.select(fromNoaa.averageTempDataAvailableSelector);
  }

}
