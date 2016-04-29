export function handleKeyboardFocus(event, keyboardFocused) {
  const zDepth = (keyboardFocused && !this.props.disabled) ? this.state.initialZDepth + 1 : this.state.initialZDepth;

  this.setState({
    zDepth: zDepth,
    keyboardFocused: true,
  });

  this.props.onKeyboardFocus(event, keyboardFocused);
}

export function handleMouseDown(event) {
  // only listen to left clicks
  if (event.button === 0) {
    this.setState({
      zDepth: this.state.initialZDepth + 1,
    });
  }

  this.props.onMouseDown(event);
}

export function handleMouseEnter(event) {
  if (!this.state.keyboardFocused && !this.state.touched) {
    this.setState({
      hovered: true,
    });
  }

  this.props.onMouseEnter(event);
}

export function handleMouseLeave(event) {
  if (!this.state.keyboardFocused) {
    this.setState({
      zDepth: this.state.initialZDepth,
      hovered: false,
    });
  }

  this.props.onMouseLeave(event);
}

export function handleMouseUp(event) {
  this.setState({
    zDepth: this.state.initialZDepth,
  });

  this.props.onMouseUp(event);
}

export function handleTouchEnd(event) {
  this.setState({
    zDepth: this.state.initialZDepth,
  });

  this.props.onTouchEnd(event);
}

export function handleTouchStart(event) {
  this.setState({
    touch: true,
    zDepth: this.state.initialZDepth + 1,
  });

  this.props.onTouchStart(event);
}
