import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const StyledLink = styled(Link)(({ theme }) => ({
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
}));

export default function Pro() {
  const t = useTranslate();

  return (
    <StyledLink
      variant="body2"
      className="mui-fixed"
      href="/getting-started/support/#professional-support-premium"
    >
      {t('getProfessionalSupport')}
    </StyledLink>
  );
}
