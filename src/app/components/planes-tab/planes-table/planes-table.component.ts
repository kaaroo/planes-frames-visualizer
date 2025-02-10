import { Component, inject, OnInit, signal } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { PlaneFrameGenerator } from '../../../service/plane-frame-gen.service';
import {
  PlaneFrame,
  PlaneFrameHistoryMap,
  SpeedUnit,
} from '../../../model/planeframe.type';
import { FormsModule } from '@angular/forms';
import { FilterPlanesFramesPipe } from '../../../pipes/filter-planes-frames.pipe';
import { SpeedConversionPlaneFramesPipe } from '../../../pipes/speed-conv-plane-frames.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-planes-table',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    FilterPlanesFramesPipe,
    SpeedConversionPlaneFramesPipe,
    DecimalPipe,
  ],
  templateUrl: './planes-table.component.html',
  styleUrl: './planes-table.component.scss',
})
export class PlanesTableComponent implements OnInit {
  // filter input
  protected searchTerm = signal('');
  protected filterByICAO = signal<boolean>(false);
  protected speedUnit = signal<SpeedUnit>('kph');

  // table settings
  protected tableTitle = 'Planes positions';
  protected displayedColumns: string[] = [
    'icao',
    'alt',
    'lat',
    'lon',
    'speed',
    'timestamp',
  ];

  protected dataSource = signal<PlaneFrame[]>([]);
  protected maxNumberOfRows = signal<number>(5);

  // services
  protected planeFrameGen = inject(PlaneFrameGenerator);

  ngOnInit(): void {
    this.planeFrameGen.historyService.framesSaved.subscribe(
      this.onPlanesPositionsUpdate
    );
  }

  onPlanesPositionsUpdate = (value: PlaneFrameHistoryMap): void => {
    const allValues: PlaneFrame[] = Object.entries(value)
      .reduce((acc, [_, data]) => [...acc, ...data], [] as PlaneFrame[])
      .sort((a, b) => {
        return new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1;
      });

    this.dataSource.set(allValues);
  };
}
