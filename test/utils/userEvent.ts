import * as React from 'react';
import { click, mouseDown, mouseUp, keyDown, keyUp } from './fireDiscreteEvent';
import { act, fireEvent } from './createRenderer';

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

export function keyPress(target: Element, options: { key: string }): void {
  if (React.version.startsWith('18')) {
    fireEvent.keyDown(target, options);
    fireEvent.keyUp(target, options);
  } else {
    keyDown(target, options);
    keyUp(target, options);
    act(() => {});
  }
}
