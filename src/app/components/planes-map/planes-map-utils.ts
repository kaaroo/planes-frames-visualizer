import { PlaneFrame } from '../../model/planeframe.type';

export const getTooltip = (frame: PlaneFrame) => `
    icao: ${frame.icao} <br>
    alt: ${frame.alt} [m] <br>
    lon: ${Math.round(frame.lon * 10000) / 10000} [°]<br>
    lat: ${Math.round(frame.lat * 10000) / 10000} [°] <br>
    speed: ${Math.round(frame.speed * 100) / 100} [km/h] <br>
`;
