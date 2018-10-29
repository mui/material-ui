import clamp from '../utils/clamp';

function getMousePosition(event) {
  if (event.changedTouches && event.changedTouches[0]) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    };
  }

  return {
    x: event.pageX,
    y: event.pageY,
  };
}

function getOffset(node) {
  const { pageYOffset, pageXOffset } = global;
  const { left, bottom } = node.getBoundingClientRect();

  return {
    bottom: bottom + pageYOffset,
    left: left + pageXOffset,
  };
}

export function calculatePercent(node, event, isVertical, isRtl) {
  const { width, height } = node.getBoundingClientRect();
  const { bottom, left } = getOffset(node);
  const { x, y } = getMousePosition(event);

  const value = isVertical ? bottom - y : x - left;
  const onePercent = (isVertical ? height : width) / 100;

  return isRtl && !isVertical ? 100 - clamp(value / onePercent) : clamp(value / onePercent);
}

export function preventPageScrolling(event) {
  event.preventDefault();
}
