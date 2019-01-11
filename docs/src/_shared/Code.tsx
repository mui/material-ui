import React from 'react';
import classnames from 'classnames';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import lightStyle from 'react-syntax-highlighter/dist/styles/prism/prism';
import darkStyle from 'react-syntax-highlighter/dist/styles/prism/darcula';

// @ts-ignore
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
// @ts-ignore
import typescript from 'react-syntax-highlighter/dist/languages/prism/typescript';
// @ts-ignore
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import { ThemeContext } from '../App';

registerLanguage('jsx', jsx);
registerLanguage('typescript', typescript);

const styles = (theme: Theme) => ({
  root: {
    margin: '0',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1em',
    color: theme.palette.text.primary,
    padding: 10,
    backgroundColor: theme.palette.background.paper,

    '& pre': {
      borderRadius: 3,
      overflow: 'auto !important',
      margin: '0 !important',
      backgroundColor: theme.palette.background.paper + ' !important',
    },
  },
  margin: {
    margin: '10px 0 30px',
  },
});

type CodeProps = {
  text: string;
  withMargin?: boolean;
  language?: 'jsx' | 'typescript' | 'markup';
} & WithStyles<typeof styles>;

const Code: React.SFC<CodeProps> = ({ classes, language, text, withMargin }) => {
  return (
    <div className={classnames(classes.root, { [classes.margin]: withMargin })}>
      <ThemeContext.Consumer>
        {theme => (
          <SyntaxHighlighter language={language} style={theme === 'light' ? lightStyle : darkStyle}>
            {text}
          </SyntaxHighlighter>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};

Code.defaultProps = {
  withMargin: false,
  language: 'jsx',
};

export default withStyles(styles)(Code);
