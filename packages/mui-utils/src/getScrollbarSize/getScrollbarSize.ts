// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
export default function getScrollbarSize(win: Window | Document = window): number {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const doc = win instanceof Window ? win.document : win;
  const documentWidth = doc.documentElement.clientWidth;
  return win instanceof Window ? win.innerWidth : (doc.defaultView?.innerWidth ?? 0) - documentWidth;
}
