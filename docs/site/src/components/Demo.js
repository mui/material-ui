import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import IconButton from 'material-ui/IconButton';

const requireDemos = require.context('../demos', true, /\.js$/);

const styleSheet = createStyleSheet('Demo', (theme) => {
  return {
    demo: theme.mixins.gutters({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#eee',
      paddingTop: 20,
      paddingBottom: 20,
    }),
    codeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  };
});

export default class Demo extends Component {
  static propTypes = {
    demo: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.demo !== this.props.demo;
  }

  handleCodeButtonClick = () => {};

  render() {
    const DemoComponent = requireDemos(`./${this.props.demo}`).default;
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.demo}>
        <DemoComponent />
        <IconButton
          onClick={this.handleCodeButtonClick}
          className={classes.codeButton}
        >
          code
        </IconButton>
      </div>
    );
  }
}
