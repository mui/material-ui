const BLACKLIST = ['template', 'script', 'style'];

const isHidable = ({ nodeType, tagName }: Element) =>
  nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;

export type SiblingsCallback = (node: Element) => void;
const siblings = (container: Element, mount: Element, cb: SiblingsCallback) => {
  const mounts = [].concat(mount);
  [].forEach.call(container.children, (node: Element) => {
    if (mounts.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

export function ariaHidden(show: boolean, node: Element) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

export function hideSiblings(container: Element, mountNode: Element) {
  siblings(container, mountNode, node => ariaHidden(true, node));
}

export function showSiblings(container: Element, mountNode: Element) {
  siblings(container, mountNode, node => ariaHidden(false, node));
}
