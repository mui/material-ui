import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
}));

function MarkdownListItem(props: any) {
  const classes = useStyles();
  return (
    <li className={classes.listItem}>
      <Typography component="span" {...props} />
    </li>
  );
}

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
      component: MarkdownListItem,
    },
  },
};

export default function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}
