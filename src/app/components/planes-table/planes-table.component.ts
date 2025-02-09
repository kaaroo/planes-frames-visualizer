import { Component, inject, input, OnInit, signal, ViewChild } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';
import { PlaneFrame, PlaneFrameHistoryMap } from '../../model/planeframe.type';
import { FormsModule } from '@angular/forms';
import { FilterPlanesFramesPipe } from '../../pipes/filter-planes-frames.pipe';


@Component({
  selector: 'app-planes-table',
  standalone: true,
  imports: [MatTableModule, FormsModule, FilterPlanesFramesPipe],
  templateUrl: './planes-table.component.html',
  styleUrl: './planes-table.component.scss'
})
export class PlanesTableComponent implements OnInit {

  // filter input
  searchTerm = signal('');
  filterByICAO = signal<boolean>(true);

  // table settings
  displayedColumns: string[] = ['icao', 'alt', 'lat', 'lon', 'speed', 'timestamp'];
  dataSource = signal<PlaneFrame[]>([]);
  maxNumberOfRows = signal<number>(5);

  // services
  planeFrameGen = inject(PlaneFrameGenerator);

  ngOnInit(): void {
    this.planeFrameGen.historyService.framesSaved.subscribe(this.onPlanesPositionsUpdate);
  }

  onPlanesPositionsUpdate = (value: PlaneFrameHistoryMap): void => {
    const allValues: PlaneFrame[] =  Object.entries(value).reduce(
      (acc, [_, data]) => [...acc, ...data], [] as PlaneFrame[]
    ).sort( (a, b) => {
      return new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1
    })
    
    this.dataSource.set(allValues);
  }
}
