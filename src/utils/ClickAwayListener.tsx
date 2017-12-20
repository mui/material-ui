import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

const isDescendant = (el: Node, target: Node): boolean => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

export interface ClickAwayListenerProps {
  children: React.ReactNode;
  onClickAway: (event: MouseEvent) => void;
}

/**
 * Listen for click events that are triggered outside of the component children.
 */
class ClickAwayListener extends React.Component<ClickAwayListenerProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickAway: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mounted = false;

  handleClickAway = (event: MouseEvent) => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (this.mounted) {
      const el = ReactDOM.findDOMNode(this);

      if (
        event.target instanceof HTMLElement &&
        document.documentElement &&
        document.documentElement.contains(event.target) &&
        !isDescendant(el, event.target)
      ) {
        this.props.onClickAway(event);
      }
    }
  };

  render() {
    return (
      <EventListener
        target="document"
        onMouseUp={this.handleClickAway}
        onTouchEnd={this.handleClickAway}
      >
        {this.props.children}
      </EventListener>
    );
  }
}

export default ClickAwayListener;
