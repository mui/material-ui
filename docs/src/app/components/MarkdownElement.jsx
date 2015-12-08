import React from 'react';
import marked from 'marked';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from 'material-ui/lib/mixins/style-propable';

require('./mui-github-markdown.css');

const styles = {
  root: {
    marginTop: 10,
    marginBottom: 14,
    padding: '0 10px',
  },
};

const MarkdownElement = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    text: React.PropTypes.string,
  },
  mixins: [
    PureRenderMixin,
  ],
  getDefaultProps() {
    return {
      text: '',
    };
  },

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
        return require('highlight.js').highlight(lang, code).value;
      },
    });
  },

  render() {
    const {
      style,
      text,
    } = this.props;

/* eslint-disable */
    return (
      <div
        style={StylePropable.mergeStyles(styles.root, style)}
        className="markdown-body"
        dangerouslySetInnerHTML={{__html: marked(text)}}
      />
    );
/* eslint-enable */
  },
});

export default MarkdownElement;
