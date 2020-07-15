import { ParsableDate } from '../constants/prop-types';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';

export function getTextFieldAriaText(rawValue: ParsableDate, utils: MuiPickersAdapter) {
  return rawValue && utils.isValid(utils.date(rawValue))
    ? `Choose date, selected date is ${utils.format(utils.date(rawValue), 'fullDate')}`
    : 'Choose date';
}

export const getDisplayDate = (
  utils: MuiPickersAdapter,
  value: ParsableDate,
  inputFormat: string
) => {
  const date = utils.date(value);
  const isEmpty = value === null;

  if (isEmpty) {
    return '';
  }

  return utils.isValid(date) ? utils.formatByString(date, inputFormat) : '';
};

export function pick12hOr24hFormat(
  userFormat: string | undefined,
  ampm: boolean | undefined,
  formats: { localized: string; '12h': string; '24h': string }
) {
  if (userFormat) {
    return userFormat;
  }

  if (typeof ampm === 'undefined') {
    return formats.localized;
  }

  return ampm ? formats['12h'] : formats['24h'];
}

const MASK_USER_INPUT_SYMBOL = '_';
export const staticDateWith2DigitTokens = new Date('2019-11-21T22:30:00.000');
export const staticDateWith1DigitTokens = new Date('2019-01-01T09:00:00.000');

export function checkMaskIsValidForCurrentFormat(
  mask: string,
  format: string,
  acceptRegex: RegExp,
  utils: MuiPickersAdapter
) {
  const formattedDateWith1Digit = utils.formatByString(
    utils.date(staticDateWith1DigitTokens),
    format
  );
  const inferredFormatPatternWith1Digits = formattedDateWith1Digit.replace(
    acceptRegex,
    MASK_USER_INPUT_SYMBOL
  );

  const inferredFormatPatternWith2Digits = utils
    .formatByString(utils.date(staticDateWith2DigitTokens), format)
    .replace(acceptRegex, '_');

  const isMaskValid =
    inferredFormatPatternWith2Digits === mask && inferredFormatPatternWith1Digits === mask;

  // @ts-ignore Ignore this warning for luxon because it is appearing mostly always (related to the formats structure of luxon itself)
  if (!isMaskValid && utils.lib !== 'luxon' && process.env.NODE_ENV !== 'production') {
    console.warn(
      `The mask "${mask}" you passed is not valid for the format used ${format}. Falling down to uncontrolled not-masked input.`
    );
  }

  return isMaskValid;
}

export const maskedDateFormatter = (mask: string, acceptRegexp: RegExp) => (value: string) => {
  return value
    .split('')
    .map((char, i) => {
      acceptRegexp.lastIndex = 0;

      if (i > mask.length - 1) {
        return '';
      }

      const maskChar = mask[i];
      const nextMaskChar = mask[i + 1];

      const acceptedChar = acceptRegexp.test(char) ? char : '';
      const formattedChar =
        maskChar === MASK_USER_INPUT_SYMBOL ? acceptedChar : maskChar + acceptedChar;

      if (i === value.length - 1 && nextMaskChar && nextMaskChar !== MASK_USER_INPUT_SYMBOL) {
        // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
        return formattedChar ? formattedChar + nextMaskChar : '';
      } else {
        return formattedChar;
      }
    })
    .join('');
};
