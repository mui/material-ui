import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/internal/transitions/Collapse';
import MarkdownElement from './MarkdownElement';

const requireDemos = require.context('../demos', true, /\.js$/);
const requireDemoSource = require.context('!raw!../demos', true, /\.js$/);

const styleSheet = createStyleSheet('Demo', (theme) => {
  return {
    root: {
      position: 'relative',
      backgroundColor: '#eee',
    },
    demo: theme.mixins.gutters({
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 20,
    }),
    codeButton: {
      position: 'absolute',
      top: 2,
      right: 7,
    },
    code: {
      padding: 0,
      margin: 0,
      maxHeight: 400,
      overflow: 'auto',
      '@raw pre': {
        margin: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    codeContainer: {
      position: 'relative',
      '&:after': {
        content: '\'\'',
        display: 'block',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 50,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
      },
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

  state = {
    codeOpen: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.demo !== this.props.demo ||
      nextState.codeOpen !== this.state.codeOpen
    );
  }

  handleCodeButtonClick = () =>
    this.setState({
      codeOpen: !this.state.codeOpen,
    });

  render() {
    const DemoComponent = requireDemos(`./${this.props.demo}`).default;
    const demoSource = requireDemoSource(`./${this.props.demo}`);
    const classes = this.context.styleManager.render(styleSheet);

    const code = `\`\`\`js\n${demoSource}\n\`\`\``;

    return (
      <div className={classes.root}>
        <Collapse containerClassName={classes.codeContainer} in={this.state.codeOpen}>
          <MarkdownElement className={classes.code} text={code} />
        </Collapse>
        <div className={classes.demo}>
          <DemoComponent />
        </div>
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
