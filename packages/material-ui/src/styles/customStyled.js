import seStyled from '@material-ui/styled-engine';
import defaultTheme from './defaultTheme';

function isEmpty(obj) {
  let result = true;

  Object.keys(obj).forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      result = false;
    }
  });

  return result;
}

export default function styled(tag, options) {
  const defaultStyledResolver = seStyled(tag, options);

  const customStyledResolver = (...styles) => {
    const stylesWithDefaultTheme = styles.map((stylesArg) => {
      return typeof stylesArg === 'function'
        ? ({ theme: themeInput, ...rest }) =>
            stylesArg({ theme: isEmpty(themeInput) ? defaultTheme : themeInput, ...rest })
        : stylesArg;
    });

    return defaultStyledResolver(...stylesWithDefaultTheme);
  };

  return customStyledResolver;
}
