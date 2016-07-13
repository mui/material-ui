import React, {Component, PropTypes, isValidElement} from 'react';
import Avatar from '../Avatar';

function getStyles(props, context) {
  const {card} = context.muiTheme;

  return {
    root: {
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'normal',
      paddingRight: '90px',
    },
    avatar: {
      marginRight: 16,
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15,
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14,
    },
  };
}

class CardHeader extends Component {
  static muiName = 'CardHeader';

  static propTypes = {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,
    /**
     * This is the [Avatar](/#/components/avatar) element to be displayed on the Card Header.
     * If `avatar` is an `Avatar` or other element, it will be rendered.
     * If `avatar` is a string, it will be used as the image `src` for an `Avatar`.
     */
    avatar: PropTypes.node,
    /**
     * Can be used to render elements inside the Card Header.
     */
    children: PropTypes.node,
    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,
    /**
     * If true, this card component will include a button to expand the card.
     */
    showExpandableButton: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Can be used to render a subtitle in Card Header.
     */
    subtitle: PropTypes.node,
    /**
     * Override the subtitle color.
     */
    subtitleColor: PropTypes.string,
    /**
     * Override the inline-styles of the subtitle.
     */
    subtitleStyle: PropTypes.object,
    /**
     * Override the inline-styles of the text.
     */
    textStyle: PropTypes.object,
    /**
     * Can be used to render a title in Card Header.
     */
    title: PropTypes.node,
    /**
     * Override the title color.
     */
    titleColor: PropTypes.string,
    /**
     * Override the inline-styles of the title.
     */
    titleStyle: PropTypes.object,
  };

  static defaultProps = {
    avatar: null,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      actAsExpander, // eslint-disable-line no-unused-vars
      avatar: avatarProp,
      children,
      expandable, // eslint-disable-line no-unused-vars
      showExpandableButton, // eslint-disable-line no-unused-vars
      style,
      subtitle,
      subtitleStyle,
      textStyle,
      title,
      titleStyle,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let avatar = avatarProp;

    if (isValidElement(avatarProp)) {
      avatar = React.cloneElement(avatar, {
        style: Object.assign(styles.avatar, avatar.props.style),
      });
    } else if (avatar !== null) {
      avatar = <Avatar src={avatarProp} style={styles.avatar} />;
    }

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {avatar}
        <div style={prepareStyles(Object.assign(styles.text, textStyle))}>
          <span style={prepareStyles(Object.assign(styles.title, titleStyle))}>
            {title}
          </span>
          <span style={prepareStyles(Object.assign(styles.subtitle, subtitleStyle))}>
            {subtitle}
          </span>
        </div>
        {children}
      </div>
    );
  }
}

export default CardHeader;
