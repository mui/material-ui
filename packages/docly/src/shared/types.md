// @flow

export type Theme = {
  roundness: number,
  palette: {
    primary: {
      normal: string,
      hover: string,
      active: string,
      pressed: string,
      disabled: string,
    },
    secondary: {
      normal: string,
      hover: string,
      active: string,
      pressed: string,

      disabled: string,
    },
    brand: {
      normal: string,
      hover: string,
      active: string,
      pressed: string,
      disabled: string,
    },
  },
  fonts: {
    thin: string,
    regular: string,
    medium: string,
    semiBold: string,
    bold: string,
    size: Object,
  },
};

export type ThemeShape = $Shape<{
  ...Theme,
  palette: $Shape<$PropertyType<Theme, 'palette'>>,
  fonts: $Shape<$PropertyType<Theme, 'fonts'>>,
}>;
