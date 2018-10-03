const BLACKLIST = ['template', 'script', 'style'];

function isHidable(node) {
  return node.nodeType === 1 && BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1;
}

function siblings(container, mount, callback, currentNode) {
  mount = [].concat(mount); // eslint-disable-line no-param-reassign
  [].forEach.call(container.children, node => {
    if (mount.indexOf(node) === -1 && node !== currentNode && isHidable(node)) {
      callback(node);
    }
  });
}

export function ariaHidden(show, node) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.setAttribute('aria-hidden', 'false');
  }
}

export function hideSiblings(container, mountNode, currentNode) {
  siblings(container, mountNode, node => ariaHidden(true, node), currentNode);
}

export function showSiblings(container, mountNode, currentNode) {
  siblings(container, mountNode, node => ariaHidden(false, node), currentNode);
}
