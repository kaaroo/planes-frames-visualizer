import { PlaneFrameHistoryMap, PlaneLastFramesMap } from '../model/planeframe.type';


export class PlanesHistoryService {
  historicPlanesPositions: PlaneFrameHistoryMap = {}; 
  // TODO private, consider observable

  constructor() {
  }

  handleSaveNewFrames = (frames: PlaneLastFramesMap): void => {
    this.historicPlanesPositions = Object.fromEntries(Object.entries(frames).map(([icao, position]) => {
      const prev_postions = this.historicPlanesPositions[`${icao}`];

      if ((prev_postions || []).length == 0) {
        return [[icao], [position]]
      }

      const new_positions = (prev_postions || []).length < 20
        ? [...prev_postions, position]
        : [...prev_postions.slice(1), position];

      return [[icao], new_positions]
    }));
  }

}
