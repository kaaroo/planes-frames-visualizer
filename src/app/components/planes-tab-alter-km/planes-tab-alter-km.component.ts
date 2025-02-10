import { Component } from '@angular/core';
import { PlanesTableComponent } from '../planes-table/planes-table.component';
import { FilterPlanesFramesPipe } from '../../pipes/filter-planes-frames.pipe';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SpeedConversionPlaneFramesPipe } from '../../pipes/speed-conv-plane-frames.pipe';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';

@Component({
  selector: 'app-planes-tab-alter-km',
  standalone: true,
  providers: [PlaneFrameGenerator],
  imports: [
    MatTableModule,
    FormsModule,
    FilterPlanesFramesPipe,
    SpeedConversionPlaneFramesPipe,
  ],
  templateUrl: './../planes-table/planes-table.component.html',
  styleUrl: './../planes-table/planes-table.component.scss',
})
export class PlanesTabAlterKmComponent extends PlanesTableComponent {
  override tableTitle = 'AlternativePlanesTab';
}
