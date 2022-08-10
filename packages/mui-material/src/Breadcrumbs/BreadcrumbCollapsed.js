import * as React from 'react';
import PropTypes from 'prop-types';
import { emphasize } from '@mui/system';
import styled from '../styles/styled';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';

const BreadcrumbCollapsedButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  marginLeft: `calc(${theme.spacing(1)} * 0.5)`,
  marginRight: `calc(${theme.spacing(1)} * 0.5)`,
  ...(theme.palette.mode === 'light'
    ? { backgroundColor: theme.palette.grey[100], color: theme.palette.grey[700] }
    : { backgroundColor: theme.palette.grey[700], color: theme.palette.grey[100] }),
  borderRadius: 2,
  '&:hover, &:focus': {
    ...(theme.palette.mode === 'light'
      ? { backgroundColor: theme.palette.grey[200] }
      : { backgroundColor: theme.palette.grey[600] }),
  },
  '&:active': {
    boxShadow: theme.shadows[0],
    ...(theme.palette.mode === 'light'
      ? { backgroundColor: emphasize(theme.palette.grey[200], 0.12) }
      : { backgroundColor: emphasize(theme.palette.grey[600], 0.12) }),
  },
}));

const BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16,
});

/**
 * @ignore - internal component.
 */
function BreadcrumbCollapsed(props) {
  const { components, componentsProps, ...otherProps } = props;
  const ownerState = props;
  const CustomBreadcrumbCollapsedIcon =
    components && components.Collapsed ? components.Collapsed : <React.Fragment />;

  return (
    <li>
      <BreadcrumbCollapsedButton focusRipple {...otherProps} ownerState={ownerState}>
        <BreadcrumbCollapsedIcon
          as={components?.Collapsed ? CustomBreadcrumbCollapsedIcon : MoreHorizIcon}
          ownerState={ownerState}
          {...componentsProps?.collapsed}
        />
      </BreadcrumbCollapsedButton>
    </li>
  );
}

BreadcrumbCollapsed.propTypes = {
  /**
   * The components used for Collapsed item type
   * @default {
   *   Collapsed: MoreHorizIcon,
   * }
   */
  components: PropTypes.shape({
    Collapsed: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    collapsed: PropTypes.object,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default BreadcrumbCollapsed;
