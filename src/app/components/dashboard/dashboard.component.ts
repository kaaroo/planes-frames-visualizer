import { Component, inject, signal } from '@angular/core';
import { PlaneLastFramesMap } from '../../model/planeframe.type';
import { PlaneFrameGenerator } from '../../service/plane-frame-gen.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  // providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  planeFramesService = inject(PlaneFrameGenerator); // should be moved to the child components later

  ngOnInit(): void {
    const frames : PlaneLastFramesMap = this.planeFramesService.generatePlaneFrames()
    // this.lastPlanesPositions.set(frames);
  }

  onClick(): void {
    const frames : PlaneLastFramesMap = this.planeFramesService.generatePlaneFrames()
  }

  
}
