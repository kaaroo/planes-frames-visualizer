import { Component, inject, OnInit, signal } from '@angular/core';

import * as L from 'leaflet';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';
import { PlaneFrameHistoryMap } from '../../model/planeframe.type';
import { last } from 'rxjs';


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
  mapMarkers : L.Marker[] = [];

  planeFrameGen = inject(PlaneFrameGenerator)


  // framesSaved = 
  
  // public coordinates: [number] | undefined;
  
  ngOnInit(): void {
    this.configMap()
    this.addMarkers();

    this.planeFrameGen.historyService.framesSaved.subscribe(
      (value: PlaneFrameHistoryMap) => {
        console.log('Observable emitted the next value: ' + value);

        this.mapMarkers.forEach(marker => {
          marker.remove()
        });

        
        this.mapMarkers = Object.entries(value ||{}).reduce((acc, [icao, frames]) => {

          if (!frames.length) {
            return acc;
          }

          const lastFrame = frames[frames.length-1];
          const newMarker = L.marker([lastFrame.lat, lastFrame.lon], {title: icao});
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

      })
  }



  private defaultIcon: L.Icon = L.icon({
    iconUrl: './assets/leaflet/imageAirplane.png', // TODO change to airplane icon
    // iconSize: [410, 510],
    // iconAnchor: [200, 510]
  });

  configMap(){
    L.Marker.prototype.options.icon = this.defaultIcon;
    this.map = L.map('map', {}).setView(
      [LEAFLET_MAP_CENTER[0], LEAFLET_MAP_CENTER[1]], 
      LEAFLET_MAP_ZOOM
    );

    L.tileLayer(LEAFLET_TITLE_LAYER, {
      attribution: LEAFLET_ATTRIBUTION
    }).addTo(this.map);

    const initMarker = L.marker([LEAFLET_MAP_CENTER[0], LEAFLET_MAP_CENTER[1]]);
    this.mapMarkers = [initMarker]

    this.map && initMarker.addTo(this.map).bindPopup(
      "<p>I am a pop up</p>"
    );

  }

  addMarkers(){
  }

}

