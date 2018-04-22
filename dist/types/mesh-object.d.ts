import { MeshPosition } from "./typings";
export declare class MeshObject {
    protected position: MeshPosition;
    protected vectors: any[];
    private tracking;
    constructor(position: MeshPosition, vectors?: any[]);
    protected distanceTo(npos: MeshPosition): number;
    private setTraking(auxVectorPoint);
    private getAbsVector(index);
    private seekBestTracking();
    private isTouching(mesh);
}
