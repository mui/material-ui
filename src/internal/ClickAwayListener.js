// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';

const isDescendant = (el, target) => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

export type Props = {
  children: React.Node,
  onClickAway: (event: Event) => void,
};

/**
 * @ignore - internal component.
 */
class ClickAwayListener extends React.Component<Props> {
  props: Props;
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mounted = false;

  handleClickAway = (event: Event) => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (this.mounted) {
      const el = findDOMNode(this);

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
        onMouseup={this.handleClickAway}
        onTouchend={this.handleClickAway}
      >
        {this.props.children}
      </EventListener>
    );
  }
}

export default ClickAwayListener;
