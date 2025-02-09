import { EventEmitter, Injectable, Output } from '@angular/core';
import { PlaneFrameHistoryMap, PlaneLastFramesMap } from '../model/planeframe.type';

@Injectable({
  providedIn: 'root',

})
export class PlanesHistoryService {
  historicPlanesPositions: PlaneFrameHistoryMap = {}; 

  @Output() framesSaved = new EventEmitter<PlaneFrameHistoryMap>();

  constructor() {
  }

  handleSaveNewFrames = (frames: PlaneLastFramesMap): void => {
    const positions = this.historicPlanesPositions = Object.fromEntries(Object.entries(frames).map(([icao, position]) => {
      const prevPostions = this.historicPlanesPositions[`${icao}`];

      if ((prevPostions || []).length == 0) {
        return [[icao], [position]]
      }

      const newPositions = (prevPostions || []).length < 20
        ? [...prevPostions, position]
        : [...prevPostions.slice(1), position];
      
      return [[icao], newPositions]
    }
  ))
  this.framesSaved.emit(positions);
  }

}
