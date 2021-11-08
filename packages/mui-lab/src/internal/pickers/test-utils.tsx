import * as React from 'react';
import { parseISO } from 'date-fns';
import { createRenderer, fireEvent, screen } from 'test/utils';
import { TransitionProps } from '@mui/material/transitions';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// TODO make possible to pass here any utils using cli
/**
 * Wrapper around `@date-io/date-fns` that resolves https://github.com/dmtrKovalenko/date-io/issues/479.
 * We're not using `adapter.date` in the implementation which means the implementation is safe.
 * But we do use it in tests where usage of ISO dates without timezone is problematic
 */
export class AdapterClassToUse extends AdapterDateFns {
  // Inlined AdapterDateFns#date which is not an instance method but instance property
  date = (value?: any): Date => {
    if (typeof value === 'string') {
      return parseISO(value);
    }
    if (typeof value === 'undefined') {
      return new Date();
    }
    if (value === null) {
      // @ts-expect-error AdapterDateFns#date says it returns NotNullable but that's not true
      return null;
    }
    return new Date(value);
  };
}
export const adapterToUse = new AdapterClassToUse();

export const FakeTransitionComponent = React.forwardRef<HTMLDivElement, TransitionProps>(
  function FakeTransitionComponent({ children }, ref) {
    // set tabIndex in case it is used as a child of <TrapFocus />
    return (
      <div ref={ref} tabIndex={-1}>
        {children}
      </div>
    );
  },
);

type CreateRenderOptions = import('test/utils').CreateRenderOptions;

interface CreatePickerRendererOptions extends CreateRenderOptions {
  // object for date-fns, string for other adapters
  locale?: string | object;
}

export function wrapPickerMount(mount: (node: React.ReactNode) => import('enzyme').ReactWrapper) {
  return (node: React.ReactNode) =>
    mount(<LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>);
}

export function createPickerRenderer({
  locale,
  ...createRendererOptions
}: CreatePickerRendererOptions = {}) {
  const { render: clientRender } = createRenderer(createRendererOptions);

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <LocalizationProvider locale={locale} dateAdapter={AdapterClassToUse}>
        {children}
      </LocalizationProvider>
    );
  }

  return {
    render(
      node: React.ReactElement,
      options?: Omit<import('test/utils').RenderOptions, 'wrapper'>,
    ) {
      return clientRender(node, { ...options, wrapper: Wrapper });
    },
  };
}

export function openMobilePicker() {
  fireEvent.click(screen.getByRole('textbox'));
}
