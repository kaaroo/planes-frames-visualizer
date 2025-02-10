// plane generation config
export var MAX_SPEED_KM_H = 2200;
export var MIN_SPEED_KM_H = 0;

export var MIN_LONGITUDE = 0;
export var MAX_LONGITUDE = 180;
export var LONGIUDE_STEP = 7;

export var MIN_LATITUDE = -90;
export var MAX_LATITUDE = 90;
export var LATITUDE_STEP = 7;

export var MAX_ALT_METERS = 40000;
export var MIN_ALT_METERS = 0;
export var ALT_STEP = 200;

export var SCHEDULERS_INTERVAL_S = 1;

export var PLANES_ICAO_COUNT = 5;
export var ICAO_length = 4;

// leaflet config
export var LEAFLET_TITLE_LAYER =
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export var LEAFLET_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export var LEAFLET_MAP_CENTER: number[] = [41.23, 2.09];
export var LEAFLET_MAP_ZOOM = 3;
export var LEAFLET_ICON_URL = '/assets/leaflet/marker.svg'; // TODO change default icon
export var LEAFLET_ICON_SIZE: number[] = [30, 30];

// others
export var ALPHABET_CHARS = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
export var ALPHABET_LENGTH = ALPHABET_CHARS.length;
