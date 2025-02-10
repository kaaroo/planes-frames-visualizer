import { Component, inject, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';
import { PlaneLastFramesMap } from '../../model/planeframe.type';
import { getTooltip } from './planes-map-utils';
import {
  LEAFLET_ATTRIBUTION,
  LEAFLET_ICON_URL,
  LEAFLET_MAP_CENTER,
  LEAFLET_MAP_ZOOM,
  LEAFLET_TITLE_LAYER,
} from '../../../config';

@Component({
  selector: 'app-planes-map',
  standalone: true,
  imports: [],
  templateUrl: './planes-map.component.html',
  styleUrl: './planes-map.component.scss',
})
export class PlanesMapComponent implements OnInit {
  framesGenerator = inject(PlaneFrameGenerator);

  map?: L.Map;
  markers: L.Marker[] = [];

  ngOnInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: LEAFLET_ICON_URL,
      iconSize: [30, 30],
    });

    this.configMap();
    this.framesGenerator.newFramesGeneration.subscribe(
      this.onPlanesPositionUpdate
    );
  }

  configMap() {
    this.map = L.map('map', {}).setView(
      [LEAFLET_MAP_CENTER[0], LEAFLET_MAP_CENTER[1]],
      LEAFLET_MAP_ZOOM
    );

    L.tileLayer(LEAFLET_TITLE_LAYER, {
      attribution: LEAFLET_ATTRIBUTION,
    }).addTo(this.map);
  }

  onPlanesPositionUpdate = (newValue: PlaneLastFramesMap) => {
    {
      this.markers.forEach((marker) => {
        marker.remove();
      });

      this.markers = Object.entries(newValue || {}).reduce(
        (acc, [icao, lastFrame]) => {
          const newMarker = L.marker([lastFrame.lat, lastFrame.lon], {
            title: icao,
          } as L.BaseIconOptions);
          this.map &&
            newMarker.addTo(this.map).bindTooltip(getTooltip(lastFrame));

          return [...acc, newMarker];
        },
        [] as L.Marker[]
      );
    }
  };
}
