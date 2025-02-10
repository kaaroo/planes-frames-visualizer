import { Component, inject } from '@angular/core';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';
import { PlanesMapComponent } from '../planes-map/planes-map.component';
import { PlanesTableComponent } from '../planes-table/planes-table.component';
import { PlanesTabKmComponent } from '../planes-tab-km/planes-tab-km.component';
import { PlanesTabMilesComponent } from "../planes-tab-miles/planes-tab-miles.component";
import { PlanesTabAlterKmComponent } from "../planes-tab-alter-km/planes-tab-alter-km.component";

@Component({
  selector: 'app-planes-tracker',
  imports: [PlanesMapComponent, PlanesTabKmComponent, PlanesTabMilesComponent, PlanesTabAlterKmComponent],
  templateUrl: './planes-tracker.component.html',
  styleUrl: './planes-tracker.component.scss'
})
export class PlanesTrackerComponent {
  planeFramesService = inject(PlaneFrameGenerator)
}
