// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiGridTileTitlebar', (theme) => {
  const { mixins } = theme;

  return {
    titleBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 48,
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
    },
    titleBarBottom: {
      bottom: 0,
    },
    titleBarTop: {
      top: 0,
    },
    titleBarWithSubtitle: {
      height: 68,
    },
    titleWrap: {
      flexGrow: 1,
      marginLeft: mixins.gutters({}).paddingLeft,
      // TODO: Do we need left *and* right if they're always the same value?
      marginRight: mixins.gutters({}).paddingRight,
      color: 'white',
      overflow: 'hidden',
    },
    titleWrapActionLeft: {
      marginLeft: 0,
    },
    titleWrapActionRight: {
      marginRight: 0,
    },
    title: {
      fontSize: '16px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    subtitle: {
      fontSize: '12px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    actionIconPositionLeft: {
      order: -1,
    },
    childImg: {
      height: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%',
    },
  };
});

/**
 * ```jsx
 *  <GridTileTitlebar title="GridTile" />
 *  ```
 */
export default class GridTileTitlebar extends Component {
  static propTypes = {
    /**
     * An IconButton element to be used as secondary action target
     * (primary action target is the tile itself).
     */
    actionIcon: PropTypes.element,
    /**
     * Position of secondary action IconButton.
     */
    actionPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * The CSS `className` of the root element.
     */
    className: PropTypes.string,
    /**
     * String or element serving as subtitle (support text).
     */
    subtitle: PropTypes.node,
    /**
     * The CSS `className` of the subtitle.
     */
    subtitleClassName: PropTypes.string,
    /**
     * Title to be displayed on tile.
     */
    title: PropTypes.node.isRequired,
    /**
     * The CSS `className` of the title.
     */
    titleClassName: PropTypes.string,
    /**
     * Position of the title bar.
     */
    titlePosition: PropTypes.oneOf(['top', 'bottom']),
  };

  static defaultProps = {
    titlePosition: 'bottom',
    actionPosition: 'right',
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      actionIcon,
      actionPosition,
      className: classNameProp,
      subtitle,
      subtitleClassName: subtitleClassNameProp,
      title,
      titleClassName: titleClassNameProp,
      titlePosition, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const actionPos = actionIcon && actionPosition;

    const className = classNames(
      classes.titleBar,
      {
        [classes.titleBarBottom]: titlePosition === 'bottom',
        [classes.titleBarTop]: titlePosition === 'top',
        [classes.titleBarWithSubtitle]: subtitle,
      },
      classNameProp,
    );

    // Remove the margin between the title / subtitle wrapper, and the Action Icon
    const titleWrapClassName = classNames(
      classes.titleWrap,
      {
        [classes.titleWrapActionLeft]: actionPos === 'left',
        [classes.titleWrapActionRight]: actionPos === 'right',
      },
    );

    const titleClassName = classNames(
      classes.title,
      titleClassNameProp,
    );

    const subtitleClassName = classNames(
      classes.subtitle,
      subtitleClassNameProp,
    );

    const actionIconClassName = classNames(
      {
        [classes.actionIconPositionLeft]: actionPos === 'left',
      },
    );

    return (
      <div key="titlebar" className={className} {...other}>
        <div className={titleWrapClassName}>
          <div className={titleClassName}>
            {title}
          </div>
          {subtitle ? (
            <div className={subtitleClassName}>
              {subtitle}
            </div>
          ) : null}
        </div>
        {actionIcon ? (
          <div className={actionIconClassName}>
            {actionIcon}
          </div>
        ) : null}
      </div>
    );
  }
}
