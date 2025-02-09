import { Pipe, PipeTransform } from '@angular/core';
import { PlaneFrame } from '../model/planeframe.type';

@Pipe({
  name: 'filterPlanesFrames'
})
export class FilterPlanesFramesPipe implements PipeTransform {

  transform(value: PlaneFrame[], searchTerm: string, maxCount: number=5): PlaneFrame[] {
    const text = searchTerm.toLowerCase();

    const filtered = !searchTerm ? value : value.filter((frame: PlaneFrame) => {
      return frame.icao.toLowerCase().includes(text);
    });

    return this.limit(filtered, maxCount);
  }

  private limit = (frames: PlaneFrame[], maxCount: number=5): PlaneFrame[] => 
    ( frames.length > maxCount ? frames.slice(0, maxCount) : frames)

}
