export default {

  isDescendant(parent, child) {
    let node = child.parentNode;

    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },

  offset(el) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  },

  getStyleAttributeAsNumber: function(el, attr) {
    let attrStyle = el.style[attr];
    let attrNum = 0;
    if (attrStyle && attrStyle.length) {
      attrNum = parseInt(attrStyle);
    }

    return attrNum;
  },

  addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },

  removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className
        .replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },

  toggleClass(el, className) {
    if (this.hasClass(el, className))
      this.removeClass(el, className);
    else
      this.addClass(el, className);
  },

  forceRedraw(el) {
    let originalDisplay = el.style.display;

    el.style.display = 'none';
    el.style.display = originalDisplay;
  },

  withoutTransition(el, callback) {
    let originalTransition = el.style.transition;

    //turn off transition
    el.style.transition = null;

    callback();

    //force a redraw
    this.forceRedraw(el);

    //put the transition back
    el.style.transition = originalTransition;
  },

};
