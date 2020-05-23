import LuxonUtils from '@date-io/luxon';
import DateFnsUtils from '@date-io/date-fns';
import { utilsToUse } from '../test-utils';
import {
  maskedDateFormatter,
  pick12hOr24hFormat,
  checkMaskIsValidForCurrentFormat,
} from '../../_helpers/text-field-helper';

describe('test-field-helper', () => {
  it('maskedDateFormatter for date', () => {
    const formatterFn = maskedDateFormatter('__/__/____', /[\d]/gi);

    expect(formatterFn('21')).toBe('21/');
    expect(formatterFn('21/1')).toBe('21/1');
    expect(formatterFn('211/')).toBe('21/1');
    expect(formatterFn('21/12')).toBe('21/12/');
    expect(formatterFn('21/12/21')).toBe('21/12/21');
    expect(formatterFn('21/12/2010')).toBe('21/12/2010');
    expect(formatterFn('21-12-2010')).toBe('21/12/2010');
    expect(formatterFn('2f')).toBe('2');
  });

  it('maskedDateFormatter for time', () => {
    const formatterFn = maskedDateFormatter('__:__ _M', /[\dap]/gi);

    expect(formatterFn('10')).toBe('10:');
    expect(formatterFn('10:00')).toBe('10:00 ');
    expect(formatterFn('10:00 A')).toBe('10:00 AM');
  });

  it('pick12hOr24hFormat', () => {
    expect(
      pick12hOr24hFormat(undefined, true, { localized: 'T', '12h': 'hh:mm a', '24h': 'HH:mm' })
    ).toBe('hh:mm a');
    expect(
      pick12hOr24hFormat(undefined, undefined, { localized: 'T', '12h': 'hh:mm a', '24h': 'HH:mm' })
    ).toBe('T');
    expect(
      pick12hOr24hFormat(undefined, false, { localized: 'T', '12h': 'hh:mm a', '24h': 'HH:mm' })
    ).toBe('HH:mm');
  });

  test.each`
    format                                             | mask                     | expected
    ${utilsToUse.formats.keyboardDate}                 | ${'__.__.____'}          | ${false}
    ${utilsToUse.formats.keyboardDate}                 | ${'__/__/____'}          | ${true}
    ${utilsToUse.formats.fullTime}                     | ${'__:__ _M'}            | ${false}
    ${utilsToUse.formats.keyboardDateTime}             | ${'__/__/____ __:__ _M'} | ${false}
    ${utilsToUse.formats.keyboardDateTime12h}          | ${'__/__/____ __:__ _M'} | ${true}
    ${utilsToUse.formats.keyboardDateTime24h}          | ${'__/__/____ __:__'}    | ${true}
    ${{ dateFns: 'MM/dd/yyyy', moment: 'MM/DD/YYYY' }} | ${'__/__/____'}          | ${true}
    ${{ dateFns: 'MMMM yyyy', moment: 'MMMM YYYY' }}   | ${'__/__/____'}          | ${false}
  `(
    'checkMaskIsValidFormat returns $expected for mask $mask and format $format',
    ({ format, mask, expected }) => {
      const formatForCurrentLib =
        typeof format === 'string'
          ? format
          : utilsToUse instanceof DateFnsUtils || utilsToUse instanceof LuxonUtils
          ? format.dateFns
          : format.moment;

      if (process.env.UTILS === 'luxon') {
        return; // luxon has awful formatting strategy we are not supporting mask for luxon's localized formats
      }

      expect(
        checkMaskIsValidForCurrentFormat(mask, formatForCurrentLib, /[\dap]/gi, utilsToUse)
      ).toBe(expected);
    }
  );
});
