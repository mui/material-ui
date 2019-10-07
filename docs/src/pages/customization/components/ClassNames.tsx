import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface Props extends ButtonProps {
  children: React.ReactNode;
  className: string;
}

// We can inject some CSS into the DOM.
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  }),
);

export default function ClassNames(props: Props) {
  const { children, className, ...other } = props;
  const classes = useStyles();

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || 'class names'}
    </Button>
  );
}
