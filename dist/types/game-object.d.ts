import { MeshObject } from "./mesh-object";
import { Renderable, MeshPosition } from "./typings";
export declare abstract class GameObject extends MeshObject implements Renderable {
    protected position: any;
    protected vectors: any;
    UID: number;
    protected width: number;
    protected height: number;
    private colliders;
    private _clickable;
    private _visible;
    constructor(position: any, vectors?: any);
    readonly visible: boolean;
    readonly clickable: boolean;
    toggleVisible(): void;
    toggleClickable(): void;
    tick(): void;
    abstract render(context: CanvasRenderingContext2D): any;
    inBounds(pos: MeshPosition): boolean;
    private offSetX(nextPosition?);
    private offSetY(nextPosition?);
    private addCollider(gameObj);
    private addColliders(...args);
    private getDistanceTo(gameObj);
    private getRelativePosition();
    private getBounds(nextPosition?);
    private willCollide(nextPosition);
}
