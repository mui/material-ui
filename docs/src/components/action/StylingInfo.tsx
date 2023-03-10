import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';

export default function StylingInfo({
  appeared,
  content,
  ...props
}: { appeared: boolean; content?: React.ReactElement } & BoxProps) {
  const [hidden, setHidden] = React.useState(false);
  const defaultContent = (
    <React.Fragment>
      <Typography fontWeight="bold" color="#fff" variant="body2">
        Own the styling!
      </Typography>
      <Typography color="grey.400" variant="body2">
        Build your own design system using the{' '}
        <Link href={ROUTES.theming} sx={{ color: 'primary.300' }}>
          sophisticated theming features
        </Link>
        . You can also start by using Google&apos;s Material Design.
      </Typography>
    </React.Fragment>
  );
  return (
    <Box
      data-mui-color-scheme="dark"
      {...props}
      sx={{
        position: 'absolute',
        bottom: 0,
        transform: hidden || !appeared ? 'translateY(100%)' : 'translateY(0)',
        transition: '0.3s',
        left: 0,
        right: 0,
        px: 2,
        pt: 1,
        pb: 2,
        bgcolor: ({ palette }) => alpha(palette.primaryDark[700], 0.5),
        backdropFilter: 'blur(8px)',
        zIndex: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
        borderRadius: '0 0 10px 10px',
        ...props.sx,
      }}
    >
      <IconButton
        aria-label={hidden ? 'show' : 'hide'}
        onClick={() => setHidden((bool) => !bool)}
        sx={{
          position: 'absolute',
          zIndex: 2,
          transition: '0.3s',
          right: 10,
          bottom: '100%',
          transform: hidden || !appeared ? 'translateY(-10px)' : 'translateY(50%)',
          opacity: appeared ? 1 : 0,
          bgcolor: 'primaryDark.500',
          '&:hover, &.Mui-focused': {
            bgcolor: 'primaryDark.600',
          },
        }}
      >
        {hidden ? (
          <KeyboardArrowUpRounded fontSize="small" />
        ) : (
          <KeyboardArrowDownRounded fontSize="small" />
        )}
      </IconButton>
      {content || defaultContent}
    </Box>
  );
}
