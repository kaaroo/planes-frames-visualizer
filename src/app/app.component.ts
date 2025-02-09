import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { PlanesTrackerComponent } from "./components/planes-tracker/planes-tracker.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, PlanesTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'plane-frames-app';
}
