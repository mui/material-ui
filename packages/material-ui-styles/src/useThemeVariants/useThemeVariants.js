import useTheme from '../useTheme';
import propsToClassKey from '../propsToClassKey';

const useThemeVariants = (props, name) => {
  const { classes = {} } = props;
  const theme = useTheme();

  let variantsClasses = '';
  if (theme && theme.variants && theme.variants[name]) {
    const themeVariants = theme.variants[name];

    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsClasses = `${variantsClasses}${classes[propsToClassKey(themeVariant.props)]} `;
      }
    });
  }

  return variantsClasses;
};

export default useThemeVariants;
