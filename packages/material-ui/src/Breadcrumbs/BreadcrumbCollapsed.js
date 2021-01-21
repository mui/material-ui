import * as React from 'react';
import PropTypes from 'prop-types';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { emphasize } from '../styles/colorManipulator';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';
import breadcrumbCollapsedClasses, {
  getBreadcrumbCollapsedUtilityClass,
} from './breadcrumbCollapsedClasses';

const overridesResolver = (props, styles) => {
  return deepmerge(styles.root || {}, {
    [`& .${breadcrumbCollapsedClasses.button}`]: styles.button,
    [`& .${breadcrumbCollapsedClasses.icon}`]: styles.icon,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
    button: ['button'],
    icon: ['icon'],
  };

  return composeClasses(slots, getBreadcrumbCollapsedUtilityClass, classes);
};

const BreadcrumbCollapsedRoot = experimentalStyled(
  'li',
  {},
  {
    name: 'PrivateBreadcrumbCollapsed',
    slot: 'Root',
    overridesResolver,
  },
)({});

const BreadcrumbCollapsedButton = experimentalStyled(
  ButtonBase,
  {},
  {
    name: 'PrivateBreadcrumbCollapsed',
    slot: 'Button',
  },
)(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700],
  borderRadius: 2,
  '&:hover, &:focus': {
    backgroundColor: theme.palette.grey[200],
  },
  '&:active': {
    boxShadow: theme.shadows[0],
    backgroundColor: emphasize(theme.palette.grey[200], 0.12),
  },
}));

const BreadcrumbCollapsedIcon = experimentalStyled(
  MoreHorizIcon,
  {},
  {
    name: 'PrivateBreadcrumbCollapsed',
    slot: 'Icon',
  },
)(() => ({
  width: 24,
  height: 16,
}));

/**
 * @ignore - internal component.
 */
const BreadcrumbCollapsed = React.forwardRef(function BreadcrumbCollapsed(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'PrivateBreadcrumbCollapsed' });
  const { ...other } = props;

  const styleProps = { ...props };

  const classes = useUtilityClasses(styleProps);

  return (
    <BreadcrumbCollapsedRoot className={classes.root} styleProps={styleProps}>
      <BreadcrumbCollapsedButton
        className={classes.button}
        focusRipple
        {...other}
        styleProps={styleProps}
      >
        <BreadcrumbCollapsedIcon className={classes.icon} styleProps={styleProps} />
      </BreadcrumbCollapsedButton>
    </BreadcrumbCollapsedRoot>
  );
});

BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default BreadcrumbCollapsed;
