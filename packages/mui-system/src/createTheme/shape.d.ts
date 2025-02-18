export interface Shape {
  borderRadius: number;
}

export type ShapeOptions = Partial<Shape>;

declare const shape: Shape;

export default shape;
