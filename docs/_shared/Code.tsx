import clsx from 'clsx';
import React from 'react';
import { highlight } from '../utils/prism';
import { withStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    margin: '0',
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
  margin: {
    margin: '10px 0 30px',
  },
});

type CodeProps = {
  children: string;
  withMargin?: boolean;
  language?: 'jsx' | 'typescript' | 'markup';
} & WithStyles<typeof styles>;

const Code: React.SFC<CodeProps> = ({ classes, language = 'jsx', children, withMargin }) => {
  const highlightedCode = highlight(children, language);
  return (
    <div className={clsx(classes.root, { [classes.margin]: withMargin })}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};

Code.defaultProps = {
  withMargin: false,
  language: 'jsx',
};

export default withStyles(styles)(Code);
