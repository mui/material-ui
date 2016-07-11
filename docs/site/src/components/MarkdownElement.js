import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));

const styleSheet = createStyleSheet('MarkdownElement', () => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px',
  },
}));

class MarkdownElement extends Component {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    text: '',
  };

  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function(code, lang) {
        return hljs.highlight(lang, code).value;
      },
    });
  }

  render() {
    const {
      className,
      text,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    /* eslint-disable react/no-danger */
    return (
      <div
        className={ClassNames(classes.root, 'markdown-body', className)}
        dangerouslySetInnerHTML={{__html: marked(text)}}
      />
    );
    /* eslint-enable */
  }
}

export default MarkdownElement;
