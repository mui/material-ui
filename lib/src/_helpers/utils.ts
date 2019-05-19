export function handleKeydown(
  e: KeyboardEvent,
  keyHandlers: Record<KeyboardEvent['key'], (e: KeyboardEvent) => void>
) {
  const handler = keyHandlers[e.key];
  if (handler) {
    handler(e);
  }

  // if event was handled prevent other side effects (e.g. page scroll)
  e.preventDefault();
}
