import * as React from 'react';
import { click, mouseDown, mouseUp } from './fireDiscreteEvent';
import { act, fireEvent } from './createClientRender';

export function touch(target: Element): void {
  fireEvent.touchStart(target);
  fireEvent.touchEnd(target);
}

export function mousePress(target: Element): void {
  if (React.version.startsWith('18')) {
    fireEvent.mouseDown(target);
    fireEvent.mouseUp(target);
    fireEvent.click(target);
  } else {
    mouseDown(target);
    mouseUp(target);
    click(target);
    act(() => {});
  }
}
