import { EventEmitter, Injectable, Output } from '@angular/core';
import { PlaneFrame, PlaneLastFramesMap } from '../model/planeframe.type';
import { PlanesHistoryService } from './plane-frame-history.service';
import {
  genPlaneIcaos,
  genRandomInt,
  genRandomNumber,
} from './plane-frame-gen.utils';
import {
  ALT_STEP,
  LATITUDE_STEP,
  LONGIUDE_STEP,
  MAX_ALT_METERS,
  MAX_LATITUDE,
  MAX_LONGITUDE,
  MAX_SPEED_KM_H,
  MIN_ALT_METERS,
  MIN_LATITUDE,
  MIN_LONGITUDE,
  MIN_SPEED_KM_H,
  PLANES_ICAO_COUNT,
  SCHEDULERS_INTERVAL_S,
} from '../../config';

@Injectable({
  providedIn: 'root',
})
export class PlaneFrameGenerator {
  planeICAOs = <string[]>[];
  historyService!: PlanesHistoryService;

  @Output() newFramesGeneration = new EventEmitter<PlaneLastFramesMap>();

  constructor() {
    this.planeICAOs = genPlaneIcaos(PLANES_ICAO_COUNT);
    this.historyService = new PlanesHistoryService();

    setInterval(() => {
      this.generatePlaneFrames();
    }, SCHEDULERS_INTERVAL_S * 1000);
  }

  private getLastPlanePosition = (icao: string): PlaneFrame | undefined => {
    // TODO move to the history service?
    const planeHistory: PlaneFrame[] =
      this.historyService.historicPlanesPositions[`${icao}`];

    return (planeHistory || []).length > 0
      ? planeHistory[planeHistory.length - 1]
      : undefined;
  };

  private genLongitudeFromPrev = (icao: string): number => {
    const prevPlaneFrame = this.getLastPlanePosition(icao);
    if (!!prevPlaneFrame) {
      return genRandomNumber(
        Math.max(MIN_LONGITUDE, prevPlaneFrame.lon - LONGIUDE_STEP),
        Math.min(MAX_LONGITUDE, prevPlaneFrame.lon + LONGIUDE_STEP)
      );
    }
    return genRandomNumber(MIN_LONGITUDE, MAX_LONGITUDE);
  };

  private genLatitudeFromPrev = (icao: string): number => {
    const prevPlaneFrame = this.getLastPlanePosition(icao);
    if (!!prevPlaneFrame) {
      return genRandomNumber(
        Math.max(MIN_LATITUDE, prevPlaneFrame.lat - LATITUDE_STEP),
        Math.min(MAX_LATITUDE, prevPlaneFrame.lat + LATITUDE_STEP)
      );
    }
    return genRandomNumber(MIN_LATITUDE, MAX_LATITUDE);
  };

  private genAltitudeFromPrev = (icao: string): number => {
    const prevPlaneFrame = this.getLastPlanePosition(icao);
    if (!!prevPlaneFrame) {
      return genRandomInt(
        Math.max(MIN_ALT_METERS, prevPlaneFrame.alt - ALT_STEP),
        Math.min(MAX_ALT_METERS, prevPlaneFrame.alt + ALT_STEP)
      );
    }
    return genRandomInt(MIN_ALT_METERS, MAX_ALT_METERS);
  };

  private generatePlaneFrame = (icao: string): PlaneFrame =>
    ({
      icao,
      speed: genRandomNumber(MIN_SPEED_KM_H, MAX_SPEED_KM_H),
      alt: this.genAltitudeFromPrev(icao),
      lon: this.genLongitudeFromPrev(icao),
      lat: this.genLatitudeFromPrev(icao),
      timestamp: new Date().toLocaleString(),
    } as PlaneFrame);

  generatePlaneFrames(): PlaneLastFramesMap {
    const frames = Object.fromEntries(
      this.planeICAOs.map((icao: string) => [
        [icao],
        this.generatePlaneFrame(icao),
      ])
    );

    this.historyService.handleSaveNewFrames(frames);
    this.newFramesGeneration.emit(frames);

    return frames;
  }
}
