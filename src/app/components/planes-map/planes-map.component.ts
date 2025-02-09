import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';


const LEAFLET_TITLE_LAYER = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const LEAFLET_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const LEAFLET_MAP_CENTER : number[] = [41.23, 2.09];
const LEAFLET_MAP_ZOOM = 3;



@Component({
  selector: 'app-planes-map',
  standalone: true,
  imports: [],
  templateUrl: './planes-map.component.html',
  styleUrl: './planes-map.component.scss'
})
export class PlanesMapComponent implements OnInit {
  map?: L.Map

  ngOnInit(): void {
    this.configMap()
  }

  configMap(){
    this.map = L.map('map', {}).setView(
      [LEAFLET_MAP_CENTER[0], LEAFLET_MAP_CENTER[1]], 
      LEAFLET_MAP_ZOOM
    );

    L.tileLayer(LEAFLET_TITLE_LAYER, {
      attribution: LEAFLET_ATTRIBUTION
    }).addTo(this.map);
  }

}
