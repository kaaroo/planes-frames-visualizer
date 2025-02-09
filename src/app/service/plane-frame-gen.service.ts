import { EventEmitter, Injectable, Output } from '@angular/core';
import { PlaneFrame, PlaneLastFramesMap } from '../model/planeframe.type';
import { PlanesHistoryService } from './plane-frame-history.service';

// TODO create constants & utils module and move those to utils

var MAX_SPEED_KM_S = 300000;
var MAX_SPEED_KM_H = 3600 * MAX_SPEED_KM_S;
var MIN_SPEED_KM_H = 0

var MIN_LONGITUDE = 0
var MAX_LONGITUDE = 180
var LONGIUDE_STEP = 7

var MIN_LATITUDE = -90
var MAX_LATITUDE = 90
var LATITUDE_STEP = 7

var MAX_ALT_METERS = 40000
var MIN_ALT_METERS = 0
var ALT_STEP = 200

var SCHEDULERS_INTERVAL_S = 1

var PLANES_ICAO_COUNT = 5;

const available_characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
const number_of_options = available_characters.length;

const ICAO_length = 4;


const genRandomNumber = (min: number, max: number) => {
  if (min > max) {
    throw new Error(`Cannot generate random number for given max (${max}) and min (${min})`);
  }

  return Math.random() * (max - min) + min;
}

const genRandomInt = (min: number, max: number) => Math.floor(genRandomNumber(min, max));

const getRandomChar = (): string => available_characters[genRandomInt(0, number_of_options)]

const genPlaneIcao = (): string => [...Array(ICAO_length).keys()].reduce((acc, _) => {
  acc += getRandomChar();
  return acc;
}, "");

const genPlaneIcaos = (icaos_number: number = 5): string[] => {
  const icaos_number_int = Math.floor(icaos_number);

  const plane_icaos = new Set<string>();

  while (plane_icaos.size < icaos_number_int) {
    const icao = genPlaneIcao();
    plane_icaos.add(icao);
  }

  return [...plane_icaos];
}


@Injectable({
  providedIn: 'root',

})
export class PlaneFrameGenerator {
  planeICAOs = <string[]>([]);
  historyService!: PlanesHistoryService;

  @Output() newFramesGeneration = new EventEmitter<PlaneLastFramesMap>();

  constructor() {
    this.planeICAOs = genPlaneIcaos(PLANES_ICAO_COUNT);
    this.historyService = new PlanesHistoryService();

    setInterval(() => { this.generatePlaneFrames() }, SCHEDULERS_INTERVAL_S * 1000);
  }

  private getLastPlanePosition = (icao: string): PlaneFrame | undefined => { // TODO move to the history service?
    const planeHistory: PlaneFrame[] = this.historyService.historicPlanesPositions[`${icao}`];

    return (planeHistory || []).length > 0 ? planeHistory[planeHistory.length-1] : undefined;
  }

  private genLongitudeFromPrev = (icao: string): number => {
    const prevPlaneFrame = this.getLastPlanePosition(icao);
    if (!!prevPlaneFrame) {
      return genRandomNumber(
        Math.max(MIN_LONGITUDE, prevPlaneFrame.lon - LONGIUDE_STEP),
        Math.min(MAX_LONGITUDE, prevPlaneFrame.lon + LONGIUDE_STEP)
      );
    }
    return genRandomNumber(MIN_LONGITUDE, MAX_LONGITUDE);
  }

  private genLatitudeFromPrev = (icao: string): number => {
    const prevPlaneFrame = this.getLastPlanePosition(icao);
    if (!!prevPlaneFrame) {
      return genRandomNumber(
        Math.max(MIN_LATITUDE, prevPlaneFrame.lat - LATITUDE_STEP),
        Math.min(MAX_LATITUDE, prevPlaneFrame.lat + LATITUDE_STEP)
      );
    }
    return genRandomNumber(MIN_LATITUDE, MAX_LATITUDE);
  }

  private genAltitudeFromPrev = (icao: string): number => {
    const prevPlaneFrame = this.getLastPlanePosition(icao);
    if (!!prevPlaneFrame) {
      return genRandomInt(
        Math.max(MIN_ALT_METERS, prevPlaneFrame.alt - ALT_STEP),
        Math.min(MAX_ALT_METERS, prevPlaneFrame.alt + ALT_STEP)
      );
    }
    return genRandomInt(MIN_ALT_METERS, MAX_ALT_METERS);
  }

  private generatePlaneFrame = (icao: string): PlaneFrame => ({
    icao,
    speed: genRandomNumber(MIN_SPEED_KM_H, MAX_SPEED_KM_H),
    alt: this.genAltitudeFromPrev(icao),
    lon: this.genLongitudeFromPrev(icao),
    lat: this.genLatitudeFromPrev(icao),
    timestamp: new Date().toUTCString(),
  }) as PlaneFrame


  generatePlaneFrames(): PlaneLastFramesMap {
    const frames = Object.fromEntries(this.planeICAOs.map((icao: string) =>
      [[icao], this.generatePlaneFrame(icao)]));

    this.historyService.handleSaveNewFrames(frames);
    this.newFramesGeneration.emit(frames)

    return frames;
  }
}
