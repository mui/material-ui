export default function addEventListener(
  node: Node,
  event: string,
  handler: (e: Event) => never,
  capture?: boolean,
): { remove(): void };
