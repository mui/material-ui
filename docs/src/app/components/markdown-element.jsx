const React = require('react');
let {Paper} = require('material-ui');
require('./mui-github-markdown.css');
import marked from 'marked';

const MarkdownElement = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
  },
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
    const {text} = this.props;
    const html = marked(text || '');

/* eslint-disable */
    return (
      <Paper style={{marginBottom: '22px', padding: '0 24px 24px 24px'}}>
        <div className="markdown-body">
          <div dangerouslySetInnerHTML={{__html: html}} />
        </div>
      </Paper>
    );
/* eslint-enable */
  },
});

module.exports = MarkdownElement;
