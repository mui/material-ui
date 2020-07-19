import clsx from 'clsx';
import React from 'react';
import { highlight } from '../utils/prism';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1em',
    color: theme.palette.text.primary,
    padding: 5,
    backgroundColor: theme.palette.background.paper,

    '& pre': {
      borderRadius: 3,
      overflow: 'auto !important',
      margin: '0 !important',
      backgroundColor: theme.palette.background.paper + ' !important',
    },
  },
  inlineRoot: {
    padding: 0,
    '& pre': {
      padding: 0,
    },
  },
  inlineCode: {
    fontSize: 14,
    // color: theme.palette.secondary.main,
    whiteSpace: 'pre-wrap',
  },
  margin: {
    margin: '10px 0 30px',
  },
}));

interface CodeProps {
  children: string;
  inline?: boolean;
  withMargin?: boolean;
  language?: 'jsx' | 'typescript' | 'markup';
}

const Code: React.FC<CodeProps> = ({ language = 'typescript', inline, children, withMargin }) => {
  const classes = useStyles();
  const highlightedCode = highlight(children, language);

  return (
    <div
      className={clsx(classes.root, {
        [classes.margin]: withMargin,
        [classes.inlineRoot]: inline,
      })}
    >
      <pre>
        <code
          className={clsx({ [classes.inlineCode]: inline })}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

Code.defaultProps = {
  withMargin: false,
  language: 'jsx',
};

export default Code;
