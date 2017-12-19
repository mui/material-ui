export type Contrast = 'light' | 'dark';
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
  contrastDefaultColor: Contrast;
}

export { default as common } from './common';
export { default as red } from './red';
export { default as pink } from './pink';
export { default as purple } from './purple';
export { default as deepPurple } from './deepPurple';
export { default as indigo } from './indigo';
export { default as blue } from './blue';
export { default as lightBlue } from './lightBlue';
export { default as cyan } from './cyan';
export { default as teal } from './teal';
export { default as green } from './green';
export { default as lightGreen } from './lightGreen';
export { default as lime } from './lime';
export { default as yellow } from './yellow';
export { default as amber } from './amber';
export { default as orange } from './orange';
export { default as deepOrange } from './deepOrange';
export { default as brown } from './brown';
export { default as grey } from './grey';
export { default as blueGrey } from './blueGrey';
