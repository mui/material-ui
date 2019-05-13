

export default function createTheme() {
    //
    const mapping = {
      xs: '@media (min-width:0px) and (max-width:599.95px)',
      sm: '@media (min-width:600px) and (max-width:959.95px)',
      md: '@media (min-width:960px) and (max-width:1279.95px)',
      lg: '@media (min-width:1280px) and (max-width:1919.95px)',
      xl: '@media (min-width:1920px)',
    };
    const breakpoints = {};
    Object.defineProperties(breakpoints, {
        keys: {
          get: () => {
            return Object.keys(mapping);
          },
          //writable: false,
          configurable: false,
          enumerable: true
        },
        only: {
          value: (key) => mapping[key],
          //writable: false,
          configurable: false,
          enumerable: true
        },
    });
    const obj = {};
    Object.defineProperties(obj, {
      breakpoints: {
        get:() => breakpoints,
        enumerable: true,
        configurable: false
      }
    });
    return obj;
}
