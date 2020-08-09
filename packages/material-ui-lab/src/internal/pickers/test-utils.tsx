import * as React from 'react';
import { createClientRender, fireEvent, screen } from 'test/utils';
import { queryHelpers, Matcher, MatcherOptions } from '@testing-library/react/pure';
import { TransitionProps } from '@material-ui/core/transitions';
import DateFnsAdapter from '../../dateAdapter/date-fns';
import LocalizationProvider from '../../LocalizationProvider';

// TODO make possible to pass here any utils using cli
export const AdapterClassToUse = DateFnsAdapter;
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

interface PickerRenderOptions {
  // object for date-fns, string for other adapters
  locale?: string | object;
}

export function createPickerRender({
  locale,
  ...renderOptions
}: PickerRenderOptions & import('test/utils').RenderOptions) {
  const clientRender = createClientRender(renderOptions);

  return (node: React.ReactNode) =>
    clientRender(
      <LocalizationProvider locale={locale} dateAdapter={AdapterClassToUse}>
        {node}
      </LocalizationProvider>,
    );
}

export const queryByMuiTest = queryHelpers.queryByAttribute.bind(null, 'data-mui-test');
export const queryAllByMuiTest = queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');

export function getAllByMuiTest(
  id: Matcher,
  container: HTMLElement = document.body,
  options?: MatcherOptions,
): Element[] {
  const els = queryAllByMuiTest(container, id, options);
  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [data-mui-test="${id}"]`,
      container,
    );
  }
  return els;
}

export function getByMuiTest(...args: Parameters<typeof getAllByMuiTest>): Element {
  const result = getAllByMuiTest(...args);
  if (result.length > 0) {
    return result[0];
  }

  throw queryHelpers.getElementError(
    `Unable to find an element by: [data-mui-test="${args[0]}"]`,
    document.body,
  );
}

export function openDesktopPicker() {
  fireEvent.click(screen.getByLabelText(/choose date/i));
}

export function openMobilePicker() {
  fireEvent.click(screen.getByRole('textbox'));
}
