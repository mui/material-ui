import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import MarkdownElement from './MarkdownElement';

const requireDocs = require.context('./../../../../docs', true, /^((?![\\/]site|node_modules[\\/]).)*\.md$/);

export const styleSheet = createStyleSheet('MarkdownDocs', (theme) => {
  return {
    content: {
      '@raw h1': {
        ...theme.typography.display2,
        color: theme.palette.text.secondary,
        margin: '1em 0 0.7em',
      },
      '@raw h2': {
        ...theme.typography.display1,
        color: theme.palette.text.secondary,
        margin: '1em 0 0.7em',
      },
      '@raw p, @raw ul': {
        lineHeight: '1.6',
      },
    },
  };
});

export default class MarkdownDocs extends Component {

  static propTypes = {
    route: PropTypes.object,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    text: '',
  };

  componentWillMount() {
    const path = this.props.route.path;
    this.setState({text: requireDocs(`.${path}.md`)});
  }

  componentWillReceiveProps(nextProps) {
    const path = nextProps.route.path;
    this.setState({text: requireDocs(`.${path}.md`)});
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.content}>
        <MarkdownElement text={this.state.text} />
      </div>
    );
  }
}
