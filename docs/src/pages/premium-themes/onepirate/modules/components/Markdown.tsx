import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = (theme: Theme) =>
  createStyles({
    listItem: {
      marginTop: theme.spacing(1),
    },
  });

const options = {
  overrides: {
    h1: {
      component: (props: TypographyProps) => (
        <Typography gutterBottom variant="h4" {...props} />
      ),
    },
    h2: {
      component: (props: TypographyProps) => (
        <Typography gutterBottom variant="h6" {...props} />
      ),
    },
    h3: {
      component: (props: TypographyProps) => (
        <Typography gutterBottom variant="subtitle1" {...props} />
      ),
    },
    h4: {
      component: (props: TypographyProps) => {
        return (
          <Typography gutterBottom variant="caption" paragraph {...props} />
        );
      },
    },
    p: {
      component: (props: TypographyProps) => (
        <Typography paragraph {...props} />
      ),
    },
    a: { component: Link },
    li: {
      component: withStyles(styles)((props: WithStyles<typeof styles>) => {
        const { classes, ...other } = props;
        return (
          <li className={classes.listItem}>
            <Typography component="span" {...other} />
          </li>
        );
      }),
    },
  },
};

function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}

export default Markdown;
