export const reflow = (node) => node.scrollTop;

export function getTransitionProps(props, options) {
  const { timeout, easing, style = {} } = props;

  return {
    duration:
      style.transitionDuration || typeof timeout === 'number'
        ? timeout
        : timeout[options.mode] || 0,
    easing:
      style.transitionTimingFunction || typeof easing === 'string'
        ? easing
        : easing[options.mode] || 'ease',
    delay: style.transitionDelay,
  };
}
