import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule }    from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { NoaaModule } from './noaa/noaa.module'

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Weather App Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
    NoaaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
