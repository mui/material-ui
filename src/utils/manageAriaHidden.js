// @flow weak

const BLACKLIST = ['template', 'script', 'style'];

const isHidable = ({ nodeType, tagName }) =>
  nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;

const siblings = (container, mount, cb) => {
  mount = [].concat(mount); // eslint-disable-line no-param-reassign
  [].forEach.call(container.children, node => {
    if (mount.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

export function ariaHidden(show, node) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

export function hideSiblings(container, mountNode) {
  siblings(container, mountNode, node => ariaHidden(true, node));
}

export function showSiblings(container, mountNode) {
  siblings(container, mountNode, node => ariaHidden(false, node));
}
