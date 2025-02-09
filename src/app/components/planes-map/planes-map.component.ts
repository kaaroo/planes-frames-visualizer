import { Component, inject, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';
import { PlaneLastFramesMap } from '../../model/planeframe.type';


const LEAFLET_TITLE_LAYER = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const LEAFLET_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const LEAFLET_MAP_CENTER: number[] = [41.23, 2.09];
const LEAFLET_MAP_ZOOM = 3;



@Component({
  selector: 'app-planes-map',
  standalone: true,
  imports: [],
  templateUrl: './planes-map.component.html',
  styleUrl: './planes-map.component.scss'
})
export class PlanesMapComponent implements OnInit {
  planeFrameGen = inject(PlaneFrameGenerator)

  // lefalet map
  map?: L.Map
  markers: L.Marker[] = [];

  ngOnInit(): void {
    this.configMap();
    this.planeFrameGen.newFramesGeneration.subscribe(this.onPlanesPositionUpdate);
  }

  configMap() {
    // TODO change default icon
    this.map = L.map('map', {}).setView(
      [LEAFLET_MAP_CENTER[0], LEAFLET_MAP_CENTER[1]],
      LEAFLET_MAP_ZOOM
    );

    L.tileLayer(LEAFLET_TITLE_LAYER, {
      attribution: LEAFLET_ATTRIBUTION
    }).addTo(this.map);
  }

  onPlanesPositionUpdate = (newValue: PlaneLastFramesMap) => {
    {
      this.markers.forEach(marker => {
        marker.remove()
      });

      this.markers = Object.entries(newValue || {}).reduce((acc, [icao, lastFrame]) => {
        const newMarker = L.marker([lastFrame.lat, lastFrame.lon], { title: icao, shadowUrl: undefined } as L.BaseIconOptions);
        const toolTip = `
          icao: ${icao} <br>
          alt: ${lastFrame.alt} [m] <br>
          lon: ${lastFrame.lon} <br>
          lat: ${lastFrame.lat} <br>
          speed: ${lastFrame.speed} [km/h] <br>
        `;

        this.map && newMarker.addTo(this.map).bindTooltip(toolTip);

        return [...acc, newMarker];
      }, [] as L.Marker[]);
    }
  }

}

