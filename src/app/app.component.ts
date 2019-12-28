import { Component } from '@angular/core';
import { NoaaModule } from './noaa/noaa.module'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'noaa-app';
  public opened: boolean;
}
