const BLACKLIST = ['template', 'script', 'style'];

function isHideable(node) {
  return node.nodeType === 1 && BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1;
}

function siblings(container, mount, currentNode, callback) {
  const blacklist = [mount, currentNode];

  [].forEach.call(container.children, node => {
    if (blacklist.indexOf(node) === -1 && isHideable(node)) {
      callback(node);
    }
  });
}

export function ariaHidden(node, show) {
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

export function ariaHiddenSiblings(container, mountNode, currentNode, show) {
  siblings(container, mountNode, currentNode, node => ariaHidden(node, show));
}
