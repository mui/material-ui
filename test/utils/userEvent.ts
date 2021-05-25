import { click, mouseDown, mouseUp } from './fireDiscreteEvent';
import { act, fireEvent } from './createClientRender';

export function touch(target: Element): void {
  fireEvent.touchStart(target);
  fireEvent.touchEnd(target);
}

export function mousePress(target: Element): void {
  mouseDown(target);
  mouseUp(target);
  click(target);
  // Flush scheduled effects
  act(() => {});
}
