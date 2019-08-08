import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import url from 'url';
import Inspector from 'react-inspector';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: 0,
    // Match <Inspector /> default theme.
    backgroundColor: theme.palette.type === 'light' ? theme.palette.common.white : '#242424',
    minHeight: theme.spacing(40),
    width: '100%',
  },
  switch: {
    paddingBottom: theme.spacing(1),
  },
});

function DefaultTheme(props) {
  const { classes, theme: docsTheme } = props;
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState();
  const { t } = useSelector(state => ({ t: state.options.t }));

  React.useEffect(() => {
    const URL = url.parse(document.location.href, true);
    const expandPath = URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    const newPaths =
      typeof expandPath === 'string'
        ? expandPath.split('.').reduce((acc, path) => {
            const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
            acc.push(last + path);
            return acc;
          }, [])
        : expandPath;

    setExpandPaths(newPaths);
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: docsTheme.palette.type,
    },
    direction: docsTheme.direction,
  });

  return (
    <div className={classes.root}>
      <FormControlLabel
        className={classes.switch}
        control={
          <Switch
            checked={checked}
            onChange={(event, value) => {
              setChecked(value);
            }}
          />
        }
        label={t('expandAll')}
      />
      <Inspector
        theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
        data={theme}
        expandPaths={expandPaths}
        expandLevel={checked ? 100 : 1}
        key={`${checked}-${theme.palette.type}`} // Remount
      />
    </div>
  );
}

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      between: PropTypes.func.isRequired,
      down: PropTypes.func.isRequired,
      keys: PropTypes.arrayOf(PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs'])).isRequired,
      only: PropTypes.func.isRequired,
      up: PropTypes.func.isRequired,
      values: PropTypes.shape({
        lg: PropTypes.number.isRequired,
        md: PropTypes.number.isRequired,
        sm: PropTypes.number.isRequired,
        xl: PropTypes.number.isRequired,
        xs: PropTypes.number.isRequired,
      }).isRequired,
      width: PropTypes.func.isRequired,
    }).isRequired,
    direction: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
    mixins: PropTypes.shape({
      gutters: PropTypes.func.isRequired,
      toolbar: PropTypes.object.isRequired,
    }).isRequired,
    overrides: PropTypes.object,
    palette: PropTypes.shape({
      action: PropTypes.shape({
        active: PropTypes.string.isRequired,
        disabled: PropTypes.string.isRequired,
        disabledBackground: PropTypes.string.isRequired,
        hover: PropTypes.string.isRequired,
        hoverOpacity: PropTypes.number.isRequired,
        selected: PropTypes.string.isRequired,
      }).isRequired,
      augmentColor: PropTypes.func.isRequired,
      background: PropTypes.shape({
        default: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
      }).isRequired,
      common: PropTypes.shape({
        black: PropTypes.string.isRequired,
        white: PropTypes.string.isRequired,
      }).isRequired,
      contrastThreshold: PropTypes.number.isRequired,
      divider: PropTypes.string.isRequired,
      error: PropTypes.shape({
        contrastText: PropTypes.string.isRequired,
        dark: PropTypes.string.isRequired,
        light: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
      }).isRequired,
      getContrastText: PropTypes.func.isRequired,
      grey: PropTypes.shape({
        '100': PropTypes.string.isRequired,
        '200': PropTypes.string.isRequired,
        '300': PropTypes.string.isRequired,
        '400': PropTypes.string.isRequired,
        '50': PropTypes.string.isRequired,
        '500': PropTypes.string.isRequired,
        '600': PropTypes.string.isRequired,
        '700': PropTypes.string.isRequired,
        '800': PropTypes.string.isRequired,
        '900': PropTypes.string.isRequired,
        A100: PropTypes.string.isRequired,
        A200: PropTypes.string.isRequired,
        A400: PropTypes.string.isRequired,
        A700: PropTypes.string.isRequired,
      }).isRequired,
      primary: PropTypes.shape({
        contrastText: PropTypes.string.isRequired,
        dark: PropTypes.string.isRequired,
        light: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
      }).isRequired,
      secondary: PropTypes.shape({
        contrastText: PropTypes.string.isRequired,
        dark: PropTypes.string.isRequired,
        light: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.shape({
        disabled: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
      }).isRequired,
      tonalOffset: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['dark', 'light']).isRequired,
    }).isRequired,
    props: PropTypes.object,
    shadows: PropTypes.object.isRequired,
    shape: PropTypes.shape({
      borderRadius: PropTypes.number.isRequired,
    }).isRequired,
    spacing: PropTypes.func.isRequired,
    status: PropTypes.shape({
      danger: PropTypes.string.isRequired,
    }).isRequired,
    transitions: PropTypes.shape({
      create: PropTypes.func.isRequired,
      duration: PropTypes.shape({
        complex: PropTypes.number.isRequired,
        enteringScreen: PropTypes.number.isRequired,
        leavingScreen: PropTypes.number.isRequired,
        short: PropTypes.number.isRequired,
        shorter: PropTypes.number.isRequired,
        shortest: PropTypes.number.isRequired,
        standard: PropTypes.number.isRequired,
      }).isRequired,
      easing: PropTypes.shape({
        easeIn: PropTypes.string.isRequired,
        easeInOut: PropTypes.string.isRequired,
        easeOut: PropTypes.string.isRequired,
        sharp: PropTypes.string.isRequired,
      }).isRequired,
      getAutoHeightDuration: PropTypes.func.isRequired,
    }).isRequired,
    typography: PropTypes.shape({
      body1: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      body2: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      button: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      caption: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      fontFamily: PropTypes.string,
      fontSize: PropTypes.number.isRequired,
      fontWeightBold: PropTypes.oneOfType([
        PropTypes.oneOf([
          '-moz-initial',
          'bold',
          'bolder',
          'inherit',
          'initial',
          'lighter',
          'normal',
          'revert',
          'unset',
        ]),
        PropTypes.number,
      ]),
      fontWeightLight: PropTypes.oneOfType([
        PropTypes.oneOf([
          '-moz-initial',
          'bold',
          'bolder',
          'inherit',
          'initial',
          'lighter',
          'normal',
          'revert',
          'unset',
        ]),
        PropTypes.number,
      ]),
      fontWeightMedium: PropTypes.oneOfType([
        PropTypes.oneOf([
          '-moz-initial',
          'bold',
          'bolder',
          'inherit',
          'initial',
          'lighter',
          'normal',
          'revert',
          'unset',
        ]),
        PropTypes.number,
      ]),
      fontWeightRegular: PropTypes.oneOfType([
        PropTypes.oneOf([
          '-moz-initial',
          'bold',
          'bolder',
          'inherit',
          'initial',
          'lighter',
          'normal',
          'revert',
          'unset',
        ]),
        PropTypes.number,
      ]),
      h1: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      h2: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      h3: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      h4: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      h5: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      h6: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      overline: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      pxToRem: PropTypes.func.isRequired,
      subtitle1: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
      subtitle2: PropTypes.shape({
        /**
         * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
         *
         * **Initial value**: Varies from one browser to another
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  |  Yes   | **12** | **3** |
         * @see
         */
        color: PropTypes.string.isRequired,
        /**
         * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
         *
         * **Initial value**: depends on user agent
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontFamily: PropTypes.string.isRequired,
        /**
         * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
         *
         * **Initial value**: `medium`
         *
         * | Chrome | Firefox | Safari |  Edge  |   IE    |
         * | :----: | :-----: | :----: | :----: | :-----: |
         * | **1**  |  **1**  | **1**  | **12** | **5.5** |
         * @see
         */
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        /**
         * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        fontStyle: PropTypes.string.isRequired,
        /**
         * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **2**  |  **1**  | **1**  | **12** | **3** |
         * @see
         */
        fontWeight: PropTypes.oneOfType([
          PropTypes.oneOf([
            '-moz-initial',
            'bold',
            'bolder',
            'inherit',
            'initial',
            'lighter',
            'normal',
            'revert',
            'unset',
          ]),
          PropTypes.number,
        ]).isRequired,
        /**
         * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
         *
         * **Initial value**: `normal`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
         *
         * **Initial value**: `none`
         *
         * | Chrome | Firefox | Safari |  Edge  |  IE   |
         * | :----: | :-----: | :----: | :----: | :---: |
         * | **1**  |  **1**  | **1**  | **12** | **4** |
         * @see
         */
        textTransform: PropTypes.oneOf([
          '-moz-initial',
          'capitalize',
          'full-size-kana',
          'full-width',
          'inherit',
          'initial',
          'lowercase',
          'none',
          'revert',
          'unset',
          'uppercase',
        ]),
      }).isRequired,
    }).isRequired,
    zIndex: PropTypes.shape({
      appBar: PropTypes.number.isRequired,
      drawer: PropTypes.number.isRequired,
      mobileStepper: PropTypes.number.isRequired,
      modal: PropTypes.number.isRequired,
      snackbar: PropTypes.number.isRequired,
      tooltip: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles, { withTheme: true })(DefaultTheme);
