import { MeshPosition } from "./typings";

export class MeshObject {

  private tracking = 0

  constructor(protected position: MeshPosition, protected vectors?: any[]) {
    if(this.vectors){ this.seekBestTracking(); }
  }

  protected distanceTo(npos: MeshPosition) {

    let xDistance = this.position.x - npos.x;
    let yDistance = this.position.y - npos.y;
    if(xDistance < 0){ xDistance *= -1; }
    if(yDistance < 0){ yDistance *= -1; }
    return xDistance + yDistance;
  }

  private setTraking(auxVectorPoint) {
    if(auxVectorPoint < 0){ auxVectorPoint *= -1; }
    if(auxVectorPoint > this.tracking){ this.tracking = auxVectorPoint; }
  }

  private getAbsVector(index) {
    const selectedVector = this.vectors[index];

    return {
      x: selectedVector.x + this.position.x,
      y: selectedVector.y + this.position.y
    }
  }

  private seekBestTracking() {
    for (let i = this.vectors.length - 1; i > -1; i--) {
      for (let point in this.vectors[i]) {
        this.setTraking(point);
      }
    }
  }

  private isTouching(mesh) {}
}
