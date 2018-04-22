import { raf } from "./req-animation-frame"
import { GameObject } from "./game-object"
import { GameObjectCollection, MeshPosition } from "./typings"

export class GameScene {

  private context: CanvasRenderingContext2D
  private allowedContext = "2d"
  private defaultFramesPerSec = 50
  private ticksPerSec = 10
  private canRender = false
  private stopped = true
  private collection: GameObjectCollection = {}
  private uicollection: GameObjectCollection = {}
  private clickListenerPool: Function[] = []
  private moveListenerPool: Function[] = []
  private rightClickListenerPool: Function[] = []
  private nextUID = 0
  private amount = 0
  private renderGovernor: number
  private tickGovernor: number

  constructor(public canvasEl: HTMLCanvasElement){
    this.context = canvasEl.getContext(this.allowedContext) as CanvasRenderingContext2D
    canvasEl.addEventListener("mousemove", evt => this.moveListenerPool.forEach(fn => fn(evt)))
    canvasEl.addEventListener("click", evt => this.clickListenerPool.forEach(fn => fn(evt)))
    canvasEl.addEventListener("contextmenu", evt => {
      evt.preventDefault()
      this.rightClickListenerPool.forEach(fn => fn(evt))
    })
  }

  public start(framesPerSec?) {
    this.stopped = false
    this.loop()
    this.renderGovernor = window.setInterval(_ => this.canRender = true, 1000 / framesPerSec || this.defaultFramesPerSec)
    this.tickGovernor = window.setInterval(_ => this.performTicks(), 1000 / this.ticksPerSec)
  }

  public stop(){
    this.stopped = true
    clearInterval(this.renderGovernor)
    clearInterval(this.tickGovernor)
  }

  public addObject(object: GameObject){
    object.UID = this.nextUID++
    this.collection[object.UID] = object
    this.amount++
  }

  public addUIElement(object: GameObject){
    object.UID = this.nextUID++
    this.uicollection[object.UID] = object
  }

  public addUIElements(...objs: GameObject[]){
    objs.forEach(gameObj => this.addUIElement(gameObj))
  }

  public addObjects(...objs: GameObject[]){
    objs.forEach(gameObj => this.addObject(gameObj))
  }

  public clickOnObject(cbk: Function) {
    this.clickListenerPool.push(evt =>
    cbk(this.gameObjectInBounds({
      x: evt.offsetX,
      y: evt.offsetY
    })))
  }

  public contextMenuOnObject(cbk: Function) {
    this.rightClickListenerPool.push(evt =>
    cbk(this.gameObjectInBounds({
      x: evt.offsetX,
      y: evt.offsetY
    })))
  }

  public moveOver(cbk: Function) {
    this.moveListenerPool.push(evt => cbk(evt))
  }

  private gameObjectInBounds(position: MeshPosition) {
    for (let uid in this.uicollection) {
      if(this.positionWithinObject(position, this.uicollection[uid])) {
        return this.uicollection[uid]
      }
    }

    for (let uid in this.collection) {
      if(this.positionWithinObject(position, this.collection[uid])) {
        return this.collection[uid]
      }
    }
    return null
  }

  private positionWithinObject(position: MeshPosition, gameObject: GameObject): boolean {
    return gameObject.clickable && gameObject.inBounds(position)
  }

  private performTicks() {
    for (let uid in this.collection) {
      this.collection[uid].tick()
    }
  }

  private loop() {
    if(this.canRender) {
      this.canRender = false
      this.clearCanvas()
      this.renderGameObjects()
      this.renderUIElements()
    }

    if(!this.stopped){
      raf(_ => this.loop())
    }
  }

  private renderGameObjects() {
    for (let uid in this.collection) {
      this.renderObject(this.collection[uid])
    }
  }

  private renderObject(object: GameObject) {
    if (!object.visible) return
    object.render(this.context)
  }

  private renderUIElements() {
    for (let uid in this.uicollection) {
      this.renderObject(this.uicollection[uid])
    }
  }

  private clearCanvas(){
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
  }

  private del(object: GameObject){
    this.amount--
    delete this.collection[object.UID]
  }
}
