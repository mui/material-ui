const React = require('react');
let { Paper } = require('material-ui');
import marked from 'marked';

const MarkdownElement = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      text: ''
    };
  },


  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
  },

  render() {
    const { text } = this.props,
    html = marked(text || '');

    return (
      <Paper style = {{marginBottom: '22px',padding: '0 24px 24px 24px'}}>
      <div className="markdown-body">
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Paper>);
  },
});

module.exports = MarkdownElement;
