import { act } from './createRenderer';

export default async function flushMicrotasks() {
  if (/jsdom/.test(window.navigator.userAgent)) {
    // This is only needed for JSDOM and causes issues in real browsers
    await act(async () => {});
  }
}
