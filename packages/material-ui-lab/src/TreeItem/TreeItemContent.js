import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { experimentalStyled } from '@material-ui/core/styles';
import useTreeItem from './useTreeItem';

const TreeItemContentIconContainer = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiTreeItem',
    slot: 'IconContainer',
    overridesResolver: (props, styles) => styles.iconContainer,
  },
)({
  marginRight: 4,
  width: 15,
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  '& svg': {
    fontSize: 18,
  },
});

const TreeItemContentLabel = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiTreeItem',
    slot: 'Label',
    overridesResolver: (props, styles) => styles.label,
  },
)(({ theme }) => ({
  width: '100%',
  paddingLeft: 4,
  position: 'relative',
  ...theme.typography.body1,
}));
/**
 * @ignore - internal component.
 */
const TreeItemContent = React.forwardRef(function TreeItemContent(props, ref) {
  const {
    className,
    classes,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    ...other
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const handleClick = (event) => {
    handleExpansion(event);
    handleSelection(event);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
    <div
      {...other}
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      <TreeItemContentIconContainer className={classes.iconContainer}>
        {icon}
      </TreeItemContentIconContainer>
      <TreeItemContentLabel className={classes.label}>{label}</TreeItemContentLabel>
    </div>
  );
});

TreeItemContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
};

export default TreeItemContent;
