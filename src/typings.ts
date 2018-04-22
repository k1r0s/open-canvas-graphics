import { GameObject } from "./game-object"

export interface MeshPosition {
  x: number
  y: number
}

export interface MeshBounds {
  right: number
  left: number
  up: number
  down: number
}

export interface Renderable {
  render(context: CanvasRenderingContext2D, position?: MeshPosition)
}

export interface GameObjectCollection {
  [uid: string]: GameObject
}
