export const formatNumber = (value: number | string, locale?: string): string => {
  const numValue = typeof value === 'string' ? Number(value) : value;

  if (!Number.isFinite(numValue)) {
    return String(value);
  }

  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      return new Intl.NumberFormat(locale).format(numValue);
    } catch {
      return String(numValue);
    }
  }

  return String(numValue);
};

export const buildFormatNumber = (locale: string) => {
  return (value: number | string) => formatNumber(value, locale);
};
