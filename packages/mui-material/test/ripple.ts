import { act, fireEvent } from '@mui/internal-test-utils';

function delay(ms: number) {
  return new Promise((r) => {
    setTimeout(r, ms);
  });
}

export async function asyncFireEvent(node: Element, event: keyof typeof fireEvent, options?: any) {
  await act(async () => {
    fireEvent[event](node, options);
    await delay(1);
  });
}

export function startTouch(node: Element, options?: any) {
  return asyncFireEvent(node, 'mouseDown', options);
}

export async function stopTouch(node: Element) {
  return asyncFireEvent(node, 'mouseUp');
}

export async function startFocus(node: HTMLElement) {
  await act(async () => {
    node.blur();
    fireEvent.keyDown(document.body, { key: 'Tab' });
    node.focus();
    await delay(1);
  });
}

export async function stopFocus(node: HTMLElement) {
  await act(async () => {
    node.blur();
    await delay(1);
  });
}
