

export default function createTheme() {
    //
    const mapping = {
      xs: '@media (min-width:0px) and (max-width:599.95px)',
      sm: '@media (min-width:600px) and (max-width:959.95px)',
      md: '@media (min-width:960px) and (max-width:1279.95px)',
      lg: '@media (min-width:1280px) and (max-width:1919.95px)',
      xl: '@media (min-width:1920px)',
    };
    const obj = {};
    return Object.defineProperties(obj, {
        keys: {
          get: () => {
            return Object.keys(mapping);
          },
          writable: false,
          configurable: false,
        },
        only: {
          value: (key) => mapping[key],
          writable: false,
          configurable: false,
        },
    });
}
