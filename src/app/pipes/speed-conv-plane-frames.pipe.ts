import { Pipe, PipeTransform } from '@angular/core';
import { PlaneFrame, SpeedUnit } from '../model/planeframe.type';


const KPH_TO_MPH_CONVERSION = 1 / 1.609344

@Pipe({
  name: 'speedConversionPlaneFrames'
})
export class SpeedConversionPlaneFramesPipe implements PipeTransform {

  transform(value: PlaneFrame[], speedUnit: SpeedUnit): PlaneFrame[] {
    if (speedUnit == 'mph') {
      return value.map(data => ({
        ...data,
        speed: KPH_TO_MPH_CONVERSION * data.speed
      }))
    }
    return value;
  }
  
}
