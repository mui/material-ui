import { act } from './createRenderer';

export default async function flushMicrotasks() {
  await act(async () => {});
}
