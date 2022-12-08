// there's probably a broader solution e.g. levering DOMWindow from 'jsodm'
// interface Window extends DOMWindow doesn't work because jsdom typings use
// triple slash directives. Technical dom.lib.d.ts should already have these properties
interface Window {
  DragEvent: typeof DragEvent;
  Event: typeof Event;
  HTMLButtonElement: HTMLButtonElement;
  HTMLParagraphElement: HTMLParagraphElement;
}
