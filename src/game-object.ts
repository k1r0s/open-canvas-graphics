import { MeshObject } from "./mesh-object";
import { Renderable, MeshPosition, MeshBounds } from "./typings";

export abstract class GameObject extends MeshObject implements Renderable {

  public UID: number
  protected width = 0
  protected height = 0
  private colliders: GameObject[] = []
  private _clickable: boolean = true
  private _visible: boolean = true

  constructor(protected position, protected vectors?) {
    super(position, vectors)
  }

  get visible() {
    return this._visible
  }

  get clickable() {
    return this._clickable
  }

  public toggleVisible(){
    this._visible = !this._visible
  }

  public toggleClickable(){
    this._clickable = !this._clickable
  }

  public tick(){}

  public abstract render(context: CanvasRenderingContext2D)

  public inBounds(pos: MeshPosition): boolean {
    if (!this.visible) return false

    const bounds = this.getBounds()

    return bounds.down > pos.y &&
    bounds.left < pos.x &&
    bounds.right > pos.x &&
    bounds.up < pos.y
  }

  private offSetX(nextPosition?: MeshPosition) {
    return nextPosition ?
    nextPosition.x + this.width : this.position.x + this.width
  }

  private offSetY(nextPosition?: MeshPosition) {
    return nextPosition ?
    nextPosition.y + this.height : this.position.y + this.height
  }

  private addCollider(gameObj: GameObject) {
    this.colliders.push(gameObj)
  }

  private addColliders(...args: GameObject[]) {
    args.forEach(gameObj => this.addCollider(gameObj))
  }

  private getDistanceTo(gameObj: GameObject) {
    const distance = this.getRelativePosition() - gameObj.getRelativePosition()
    return distance < 0 ? distance * -1 : distance
  }

  private getRelativePosition() {
    const xCenter = this.position.x + (this.width / 2)
    const yCenter = this.position.y + (this.height / 2)
    return xCenter + yCenter
  }

  private getBounds(nextPosition?: MeshPosition): MeshBounds {
    return {
      left: nextPosition ? nextPosition.x : this.position.x,
      right: this.offSetX(nextPosition),
      up: nextPosition ? nextPosition.y : this.position.y,
      down: this.offSetY(nextPosition)
    }
  }

  private willCollide(nextPosition: MeshPosition): boolean {

    if(!this.colliders.length){ return false; }

    const nextBounds = this.getBounds(nextPosition);

    return this.colliders.some(gameObj => {
      const subjectBounds = gameObj.getBounds();

      return nextBounds.down > subjectBounds.up &&
      nextBounds.left < subjectBounds.right &&
      nextBounds.right > subjectBounds.left &&
      nextBounds.up < subjectBounds.down;

    })
  }
}
