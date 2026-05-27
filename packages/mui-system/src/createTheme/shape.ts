export interface Shape {
  borderRadius: number | string;
}

export type ShapeOptions = Partial<Shape>;

const shape: Shape = {
  borderRadius: 4,
};

export default shape;
