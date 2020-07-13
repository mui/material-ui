import * as React from 'react';
import * as enzyme from 'enzyme';
import DayjsUtils from '@date-io/dayjs';
import LuxonUtils from '@date-io/luxon';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '../LocalizationProvider';
import { IUtils } from '@date-io/core/IUtils';
import { DatePickerProps } from '../DatePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { createClientRender } from './createClientRender';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { queryHelpers, Matcher, MatcherOptions } from '@testing-library/react/pure';

export const queryByMuiTest = queryHelpers.queryByAttribute.bind(null, 'data-mui-test');
export const queryAllByMuiTest = queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');

export function getAllByMuiTest(
  id: Matcher,
  container: HTMLElement = document.body,
  options?: MatcherOptions
): Element[] {
  const els = queryAllByMuiTest(container, id, options);
  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [data-mui-test="${id}"]`,
      container
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
    document.body
  );
}

export const FakeTransitionComponent = React.forwardRef<HTMLDivElement, TransitionProps>(
  function FakeTransitionComponent({ children }, ref) {
    return <div ref={ref}>{children}</div>;
  }
);

interface WithUtilsProps {
  utils: IUtils<any>;
}

const getUtilClass = () => {
  switch (process.env.UTILS) {
    case 'date-fns':
      return DateFnsUtils;
    case 'dayjs':
      return DayjsUtils;
    case 'luxon':
      return LuxonUtils;
    case 'moment':
      return MomentUtils;
    default:
      return DateFnsUtils;
  }
};

export const UtilClassToUse: any = getUtilClass();
export const utilsToUse: IUtils<any> = new UtilClassToUse();

const getComponentWithUtils = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  React.cloneElement(element, { utils: utilsToUse } as any);

export const shallow = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  enzyme.shallow(getComponentWithUtils(element));

export const mount = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  enzyme.mount(<LocalizationProvider dateAdapter={UtilClassToUse}>{element}</LocalizationProvider>);

type RenderPicker<TValue> = (
  props: Pick<BasePickerProps<TValue, TValue>, 'onChange' | 'value'> & {
    renderInput: DatePickerProps['renderInput'];
  }
) => React.ReactElement;

function createPickerWithState<TValue>(defaultValue: TValue, renderFn: RenderPicker<TValue>) {
  const PickerWithState = () => {
    const [value, setDate] = React.useState(defaultValue);

    return renderFn({
      value,
      onChange: date => setDate(date),
      renderInput: props => <TextField {...props} />,
    });
  };

  return <PickerWithState />;
}

export function mountPickerWithState<TValue>(
  defaultValue: TValue,
  renderPicker: RenderPicker<TValue>
) {
  return mount(createPickerWithState(defaultValue, renderPicker));
}

export function renderPickerWithState<TValue>(
  defaultValue: TValue,
  renderPicker: RenderPicker<TValue>,
  clientRenderOptions?: { strict?: boolean }
) {
  const render = createClientRender(clientRenderOptions);
  return render(createPickerWithState(defaultValue, renderPicker));
}

export const shallowRender = (render: (props: any) => React.ReactElement<any>) => {
  return enzyme.shallow(render({ utils: utilsToUse, classes: {} as any, theme: {} as any }));
};

// toHaveBeenCalledWith doesn't work with moment because of changing some internal props
export const toHaveBeenCalledExceptMoment = (mock: jest.Mock<any, any>, params: any[]) => {
  if (process.env.UTILS === 'moment') {
    return expect(mock).toHaveBeenCalled();
  }

  return expect(mock).toHaveBeenCalledWith(...params);
};
