export interface Shape {
  borderRadius: number | string;
}

export type ShapeOptions = Partial<Shape>;

declare const shape: Shape;

export default shape;
