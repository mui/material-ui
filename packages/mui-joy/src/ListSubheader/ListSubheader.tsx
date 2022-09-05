import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListSubheaderOwnerState, ListSubheaderTypeMap } from './ListSubheaderProps';
import { getListSubheaderUtilityClass } from './listSubheaderClasses';
import ListSubheaderDispatch from './ListSubheaderContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getListSubheaderUtilityClass, {});
};

const ListSubheaderRoot = styled('div', {
  name: 'JoyListSubheader',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListSubheaderOwnerState }>(({ theme, ownerState }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  marginInline: 'var(--List-item-marginInline)',
  paddingBlock: 'var(--List-item-paddingY)',
  paddingInlineStart: 'var(--List-item-paddingLeft)',
  paddingInlineEnd: 'var(--List-item-paddingRight)',
  minBlockSize: 'var(--List-item-minHeight)',
  fontSize: 'calc(var(--List-item-fontSize) * 0.75)',
  fontWeight: theme.vars.fontWeight.lg,
  fontFamily: theme.vars.fontFamily.body,
  letterSpacing: theme.vars.letterSpacing.md,
  textTransform: 'uppercase',
  ...(ownerState.sticky && {
    position: 'sticky',
    top: 'var(--List-item-stickyTop, 0px)', // integration with Menu and Select.
    zIndex: 1,
    background: 'var(--List-item-stickyBackground)',
  }),
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  color: theme.vars.palette[ownerState.color!]?.[400], // make the subheader less contrast
}));

const ListSubheader = React.forwardRef(function ListSubheader(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListSubheader',
  });

  const {
    component,
    className,
    children,
    id: idOverride,
    sticky = false,
    variant = 'plain',
    color = 'neutral',
    ...other
  } = props;
  const id = useId(idOverride);
  const setSubheaderId = React.useContext(ListSubheaderDispatch);

  React.useEffect(() => {
    if (setSubheaderId) {
      setSubheaderId(id || '');
    }
  }, [setSubheaderId, id]);

  const ownerState = {
    ...props,
    id,
    sticky,
    variant,
    color,
  };

  const classes = useUtilityClasses();

  return (
    <ListSubheaderRoot
      ref={ref}
      id={id}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </ListSubheaderRoot>
  );
}) as OverridableComponent<ListSubheaderTypeMap>;

ListSubheader.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the component has sticky position (with top = 0).
   * @default false
   */
  sticky: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default ListSubheader;
