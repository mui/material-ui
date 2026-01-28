import { styled } from '@mui/system';

type OwnerState = {
  variant?: 'success' | 'error' | 'processing';
  showChanges: boolean;
};

const VariantObjects = styled('div')<{ ownerState: OwnerState } & OwnerState>({
  font: 'inherit',
  color: 'inherit',
  variants: [
    {
      props: { variant: 'success' },
      style: {
        color: 'red',
      },
    },
    {
      props: { showChanges: false },
      style: {
        background: 'red',
      },
    },
  ],
});

const VariantCallbacks = styled('div')<{ ownerState: OwnerState } & OwnerState>({
  font: 'inherit',
  color: 'inherit',
  variants: [
    {
      props: ({ ownerState }) => !!ownerState.showChanges,
      style: {
        color: 'red',
      },
    },
  ],
});

const VariantCallbackOwnerState = styled('div')<{ ownerState: OwnerState }>({
  font: 'inherit',
  color: 'inherit',
  variants: [
    {
      props: ({ variant }) => variant === 'success',
      style: {
        color: 'red',
      },
    },
  ],
});

// @ts-expect-error the props callback must return a boolean
const VariantCallbacksError = styled('div')<{ ownerState: OwnerState } & OwnerState>({
  font: 'inherit',
  color: 'inherit',
  variants: [
    {
      props: ({ ownerState }) => ownerState.variant,
      style: {
        color: 'red',
      },
    },
  ],
});
