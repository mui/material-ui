import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(1, 2, 1, 2),
      right: 0,
      left: 0,
      color: theme.palette.common.white,
      backgroundColor: '#626980',
      position: 'relative',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        top: 100,
        left: 'auto',
        position: 'absolute',
        borderBottomLeftRadius: 36 / 2,
        borderTopLeftRadius: 36 / 2,
      },
    },
  }),
  { name: 'Pro' },
);

export default function Pro() {
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  return (
    <Link
      variant="body2"
      className={classNames(classes.root, 'mui-fixed')}
      href="/getting-started/support/#professional-support-premium"
    >
      {t('getProfessionalSupport')}
    </Link>
  );
}
