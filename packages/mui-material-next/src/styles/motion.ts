import { MD3Duration, MD3Easing, MotionOptions } from './Theme.types';

// Follows https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
export const duration: MD3Duration = {
  short1: '50ms',
  short2: '100ms',
  short3: '150ms',
  short4: '200ms',
  medium1: '250ms',
  medium2: '300ms',
  medium3: '350ms',
  medium4: '400ms',
  long1: '450ms',
  long2: '500ms',
  long3: '550ms',
  long4: '600ms',
  extraLong1: '700ms',
  extraLong2: '800ms',
  extraLong3: '900ms',
  extraLong4: '1000ms',
};

export const easing: MD3Easing = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  legacy: 'cubic-bezier(0.4, 0, 0.2, 1)',
  legacyDecelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
  legacyAccelerate: 'cubic-bezier(0.4, 0, 1.0, 1)',
};

function formatMs(milliseconds: number) {
  return `${Math.round(milliseconds)}ms`;
}

function getAutoHeightDuration(height: number) {
  if (!height) {
    return 0;
  }

  const constant = height / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export default function createMotions(inputMotion: MotionOptions = {}) {
  const mergedEasing = {
    ...easing,
    ...inputMotion.easing,
  };

  const mergedDuration = {
    ...duration,
    ...inputMotion.duration,
  };

  const create = (
    props = ['all'],
    options: { duration?: number | string; easing?: string | string; delay?: number | string } = {},
  ) => {
    const {
      duration: durationOption = mergedDuration.medium1,
      easing: easingOption = mergedEasing.standard,
      delay = 0,
      ...other
    } = options;

    if (process.env.NODE_ENV !== 'production') {
      const isString = (value: any) => typeof value === 'string';
      // IE11 support, replace with Number.isNaN
      // eslint-disable-next-line no-restricted-globals
      const isNumber = (value: any) => !isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }

      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(
          `MUI: Argument "duration" must be a number or a string but found ${durationOption}.`,
        );
      }

      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }

      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }

      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
      }
    }

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${
            typeof durationOption === 'string' ? durationOption : formatMs(durationOption)
          } ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`,
      )
      .join(',');
  };

  return {
    getAutoHeightDuration,
    create,
    ...inputMotion,
    easing: mergedEasing,
    duration: mergedDuration,
  };
}
