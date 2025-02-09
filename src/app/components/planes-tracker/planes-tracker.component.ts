import { Component, inject } from '@angular/core';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';
import { PlanesMapComponent } from '../planes-map/planes-map.component';
import { PlanesTableComponent } from '../planes-table/planes-table.component';

@Component({
  selector: 'app-planes-tracker',
  imports: [PlanesMapComponent, PlanesTableComponent],
  templateUrl: './planes-tracker.component.html',
  styleUrl: './planes-tracker.component.scss'
})
export class PlanesTrackerComponent {
  planeFramesService = inject(PlaneFrameGenerator)
}
