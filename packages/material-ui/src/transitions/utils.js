export const reflow = node => node.scrollTop;

export function getTransitionProps({ timeout, style = {} }, options) {
  return {
    duration:
      style.transitionDuration || typeof timeout === 'number' ? timeout : timeout[options.mode],
    delay: style.transitionDelay,
  };
}
