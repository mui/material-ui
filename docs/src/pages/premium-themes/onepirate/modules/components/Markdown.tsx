import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { Theme } from '@mui/material/styles';
import { withStyles, WithStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const styles = (theme: Theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
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

export default function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}
