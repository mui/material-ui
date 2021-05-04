import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

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
  const t = useTranslate();

  return (
    <Link
      variant="body2"
      className={clsx(classes.root, 'mui-fixed')}
      href="/getting-started/support/#professional-support-premium"
    >
      {t('getProfessionalSupport')}
    </Link>
  );
}
