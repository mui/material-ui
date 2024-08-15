import { fireEvent } from './createRenderer';

export function touch(target: Element): void {
  fireEvent.touchStart(target);
  fireEvent.touchEnd(target);
}

export const mousePress: (...args: Parameters<(typeof fireEvent)['mouseUp']>) => void = (
  target,
  options,
) => {
  fireEvent.mouseDown(target, options);
  fireEvent.mouseUp(target, options);
  fireEvent.click(target, options);
};

export function keyPress(target: Element, options: { key: string; [key: string]: any }): void {
  fireEvent.keyDown(target, options);
  fireEvent.keyUp(target, options);
}
