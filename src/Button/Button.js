import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

function createButtonColorRule(main, contrast, hover) {
  return {
    color: main,
    '& raised': {
      color: contrast,
      backgroundColor: main,
      '&:hover': {
        backgroundColor: hover,
      },
    },
  };
}

export const styleSheet = createStyleSheet('Button', (theme) => {
  const {palette, shadows, transitions, typography} = theme;

  return {
    root: {
      ...typography.button,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 88,
      height: 36,
      padding: '0px 16px',
      borderRadius: 2,
      color: palette.text.primary,
      backgroundColor: 'transparent',
      transition: transitions.multi(['background-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: palette.text.divider,
      },
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    raised: {
      color: palette.getContrastText(palette.grey[300]),
      backgroundColor: palette.grey[300],
      boxShadow: shadows[2],
      '&:hover': {
        backgroundColor: palette.grey.A100,
      },
      '&:active': {
        boxShadow: shadows[8],
      },
    },
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      boxShadow: shadows[6],
      '&:active': {
        boxShadow: shadows[12],
      },
    },
    primary: createButtonColorRule(
      palette.primary[500],
      palette.getContrastText(palette.primary[500]),
      palette.primary[700]
    ),
    accent: createButtonColorRule(
      palette.accent.A200,
      palette.getContrastText(palette.accent.A200),
      palette.accent.A400
    ),
  };
});

/**
 * Buttons communicate the action that will occur when the user
 * touches them.
 *
 * Material buttons trigger an ink reaction on press. They may display
 * text, imagery, or both. Flat buttons and raised buttons are the
 * most commonly used types.
 *
 * ```js
 * import Button from 'material-ui/Button';
 *
 * const Component = () => <Button>Hello World</Button>;
 * ```
 */
export default class Button extends Component {
  static propTypes = {
    accent: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fab: PropTypes.bool,
    primary: PropTypes.bool,
    raised: PropTypes.bool,
    ripple: PropTypes.bool,
    type: PropTypes.string,
  };

  static defaultProps = {
    component: 'button',
    ripple: true,
    raised: false,
    type: 'button',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      accent,
      children,
      className,
      fab,
      primary,
      raised,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [classes.root]: true,
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.primary]: primary,
      [classes.accent]: accent,
    }, className);

    return (
      <ButtonBase className={classNames} {...other}>
        <span className={classes.label}>{children}</span>
      </ButtonBase>
    );
  }
}
