import { Component, OnInit } from '@angular/core';
import { NoaaModule } from './noaa/noaa.module'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.reducer';
import { waitSelector } from './state/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'noaa-app';
  public opened: boolean;
  public waiting$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.waiting$ = this.store.select(waitSelector);
  }
}
