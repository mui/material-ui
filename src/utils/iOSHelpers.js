/**
* Returns a number of pixels from the top of the screen for given dom element.
*
* @param {object} dom element
* @returns {number} A position from the top of the screen in pixels
*/
export const getOffsetTop = (elem) => {
  let yPos = elem.offsetTop;
  let tempEl = elem.offsetParent;

  while (tempEl != null) {
    yPos += tempEl.offsetTop;
    tempEl = tempEl.offsetParent;
  }

  return yPos;
};


export const isIOS = () => /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
