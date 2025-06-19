import { AppProgressProvider, PagesProgressProvider, Progress } from '@bprogress/next';
import { keyframes, styled } from '@mui/material/styles';
import { useRouter as useCompatRouter } from 'next/compat/router';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const pulse = keyframes`
  30% {
    opacity: 0.6;
  }
  60% {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
`;

const CustomProgress = styled(Progress)(({ theme }) => ({
  direction: 'ltr',
  pointerEvents: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 2,
  zIndex: (theme.vars || theme).zIndex.tooltip,
  backgroundColor: (theme.vars || theme).palette.primary[200],
  ...theme.applyStyles('dark', {
    backgroundColor: (theme.vars || theme).palette.primary[700],
  }),
  '& .bar': {
    position: 'fixed',
    backgroundColor: (theme.vars || theme).palette.primary.main,
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  '& .bar > div': {
    position: 'absolute',
    top: 0,
    height: 2,
    boxShadow: `${(theme.vars || theme).palette.primary.main} 1px 0 6px 1px`,
    borderRadius: '100%',
    animation: `${pulse} 2s ease-out 0s infinite`,
  },
  '& .bar > div:first-of-type': {
    opacity: 0.6,
    width: 20,
    right: 0,
    clip: 'rect(-6px,22px,14px,10px)',
  },
  '& .bar > div:last-of-type': {
    opacity: 0.6,
    width: 180,
    right: -80,
    clip: 'rect(-6px,90px,14px,-6px)',
  },
}));

export function NextBProgressProvider(props: Props) {
  const compatRouter = useCompatRouter();

  const commonProviderProps = {
    delay: 200,
    disableStyle: true,
    height: '2px',
    options: { showSpinner: false, template: null },
    shallowRouting: true,
  };

  if (compatRouter) {
    return (
      <PagesProgressProvider {...commonProviderProps}>
        <CustomProgress />
        {props.children}
      </PagesProgressProvider>
    );
  }

  return (
    <AppProgressProvider {...commonProviderProps}>
      <CustomProgress />
      {props.children}
    </AppProgressProvider>
  );
}
