export interface BorderRadius {
  paper: number;
  button: number;
}

export type BorderRadiusOptions = Partial<BorderRadius>;

declare const borderRadius: BorderRadius;

export default borderRadius;
