// @flow

export type TransitionDuration = number | { enter: number, exit: number };
export type TransitionCallback = (element: HTMLElement) => void;
export type TransitionClasses = {
  appear?: string,
  appearActive?: string,
  enter?: string,
  enterActive?: string,
  exit?: string,
  exitActive?: string,
};
