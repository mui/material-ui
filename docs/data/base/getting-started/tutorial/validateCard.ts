export default function validateCard(val: string | undefined): {
  valid: boolean;
  brand: 'visa' | 'mastercard' | 'amex' | null;
} {
  if (!val) {
    return {
      valid: false,
      brand: null,
    };
  }

  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(val)) {
    return {
      valid: true,
      brand: 'visa',
    };
  }

  if (/^5[1-5]\d{14}$|^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$/.test(val)) {
    return {
      valid: true,
      brand: 'mastercard',
    };
  }

  if (/^3[47][0-9]{13}$/.test(val)) {
    return {
      valid: true,
      brand: 'amex',
    };
  }

  return {
    valid: false,
    brand: null,
  };
}
