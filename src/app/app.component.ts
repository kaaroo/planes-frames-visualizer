import { Component } from '@angular/core';
import { PlanesTrackerComponent } from './components/planes-tracker/planes-tracker.component';

@Component({
  selector: 'app-root',
  imports: [PlanesTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'plane-frames-app';
}
