import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {card} = context.muiTheme;

  return {
    root: {
      padding: 16,
      position: 'relative',
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px',
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
    },
  };
}

class CardTitle extends Component {
  static muiName = 'CardTitle';

  static propTypes = {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,
    /**
     * Can be used to render elements inside the Card Title.
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
     * Can be used to render a subtitle in the Card Title.
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
     * Can be used to render a title in the Card Title.
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

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      actAsExpander, // eslint-disable-line no-unused-vars
      children,
      expandable, // eslint-disable-line no-unused-vars
      showExpandableButton, // eslint-disable-line no-unused-vars
      style,
      subtitle,
      subtitleColor, // eslint-disable-line no-unused-vars
      subtitleStyle,
      title,
      titleColor, // eslint-disable-line no-unused-vars
      titleStyle,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const rootStyle = Object.assign({}, styles.root, style);
    const extendedTitleStyle = Object.assign({}, styles.title, titleStyle);
    const extendedSubtitleStyle = Object.assign({}, styles.subtitle, subtitleStyle);

    return (
      <div {...other} style={prepareStyles(rootStyle)}>
        <span style={prepareStyles(extendedTitleStyle)}>
          {title}
        </span>
        <span style={prepareStyles(extendedSubtitleStyle)}>
          {subtitle}
        </span>
        {children}
      </div>
    );
  }
}

export default CardTitle;
