import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Link } from '@mui/docs/Link';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import PageContext from 'docs/src/modules/components/PageContext';
import { convertProductIdToName } from 'docs/src/modules/components/AppSearch';

export default function AppFrameBanner() {
  if (!FEATURE_TOGGLE.enable_docsnav_banner) {
    return null;
  }

  // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/rules-of-hooks -- FEATURE_TOGGLE never changes
  const pageContext = React.useContext(PageContext);
  const productName = convertProductIdToName(pageContext) || 'MUI';
  const message = `Influence ${productName}'s 2024 roadmap! Participate in the latest Developer Survey`;

  if (process.env.NODE_ENV !== 'production') {
    if (message.length > 100) {
      throw new Error(
        `Docs-infra: AppFrameBanner message is too long. It will overflow on smaller screens.`,
      );
    }
  }

  return (
    <Link
      href="https://tally.so/r/3Ex4PN?source=docs-banner"
      target="_blank"
      variant="caption"
      sx={[
        (theme) => ({
          padding: theme.spacing('7px', 1.5, '8px', 1.5),
          display: { xs: 'none', md: 'block' },
          fontWeight: 'medium',
          textWrap: 'nowrap',
          maxHeight: '34px',
          backgroundColor: alpha(theme.palette.primary[50], 0.8),
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
          borderRadius: 1,
          transition: 'all 150ms ease',
          '&:hover, &:focus-visible': {
            backgroundColor: alpha(theme.palette.primary[100], 0.4),
            borderColor: (theme.vars || theme).palette.primary[200],
          },
        }),
        (theme) =>
          theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primary[900], 0.15),
            '&:hover, &:focus-visible': {
              backgroundColor: alpha(theme.palette.primary[900], 0.4),
              borderColor: (theme.vars || theme).palette.primary[900],
            },
          }),
      ]}
    >
      {message}
    </Link>
  );
}
