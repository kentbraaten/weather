import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location/location.component';
import { LocationsService } from './locations.service';
import { AverageTempService } from './averageTemp.service';
import { MockLocationsService } from './mock-locations.service';
import { reducer } from './state/noaa.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NoaaEffects } from './state/noaa.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataViewerComponent } from './data-viewer/data-viewer.component';

@NgModule({
  declarations: [LocationComponent, DataViewerComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("noaa",reducer),
    EffectsModule.forFeature([NoaaEffects]),
    NgbModule,
    FormsModule
  ],
  providers: [ {provide: LocationsService, useClass: LocationsService}, AverageTempService],
  exports: [
    LocationComponent,
    DataViewerComponent
  ]
})
export class NoaaModule { }
