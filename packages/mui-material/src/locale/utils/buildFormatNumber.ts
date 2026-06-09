const buildFormatNumber = (locale: string) => {
  let formatter: Intl.NumberFormat | undefined;
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      formatter = new Intl.NumberFormat(locale);
    } catch (_e) {
      // Intl.NumberFormat throws RangeError on an invalid BCP 47 locale tag
      // and TypeError if the runtime is missing ICU data. We fall back to
      // String(value) below, which gives a locale-independent rendering.
    }
  }
  return (value: number) => {
    if (!Number.isFinite(value)) {
      return String(value);
    }
    return formatter ? formatter.format(value) : String(value);
  };
};

export default buildFormatNumber;
