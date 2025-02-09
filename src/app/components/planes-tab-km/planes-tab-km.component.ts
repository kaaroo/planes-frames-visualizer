import { Component, signal } from '@angular/core';
import { PlanesTableComponent } from '../planes-table/planes-table.component';
import { FilterPlanesFramesPipe } from "../../pipes/filter-planes-frames.pipe";
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planes-tab-km',
  standalone: true,
  imports: [MatTableModule, FormsModule, FilterPlanesFramesPipe],
  templateUrl: './../planes-table/planes-table.component.html',
  styleUrl: './../planes-table/planes-table.component.scss'
})
export class PlanesTabKmComponent extends PlanesTableComponent{
  override filterByICAO = signal<boolean>(true);
  override tableTitle = "PlanesTabKph";
}
