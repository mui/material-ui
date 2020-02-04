import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiAppBar from '@material-ui/core/AppBar';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiTabs from '@material-ui/core/Tabs';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiTab from '@material-ui/core/Tab';
import { Icon } from './Icon';

interface Props {
  centered?: boolean;
  indicatorColor?: 'secondary' | 'primary';
  scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
  textColor?: 'secondary' | 'primary' | 'inherit';
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  appBarColor?: 'default' | 'primary' | 'secondary' | 'inherit';
  icons?: string[];
  labels?: string[];
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  centered: false,
  indicatorColor: 'secondary',
  scrollButtons: 'auto',
  textColor: 'inherit',
  variant: 'standard',
  icons: ['phone', 'favorite', 'person_pin'],
  labels: ['Tab 1', 'Tab 2', 'Tab 3'],
  width: 500,
  height: 64,
};

export const Tabs: React.SFC<Props> = (props: Props) => {
  const { appBarColor, labels, icons, width, height, ...other } = props;

  // tslint:disable-next-line: ban-ts-ignore
  // @ts-ignore
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const items = icons.length > labels.length ? icons : labels;

  return (
    <div>
      <MuiAppBar color={appBarColor}>
        <MuiTabs value={value} onChange={handleChange} {...other}>
          {items.map(
            (item, index) =>
              (labels[index] !== undefined || icons[index] !== undefined) && (
                <MuiTab
                  key={item}
                  value={index}
                  label={labels[index]}
                  icon={<Icon icon={icons[index] || ''} />}
                />
              ),
          )}
        </MuiTabs>
      </MuiAppBar>
    </div>
  );
};

Tabs.defaultProps = defaultProps;

addPropertyControls(Tabs, {
  centered: {
    type: ControlType.Boolean,
    title: 'Centered',
  },
  indicatorColor: {
    type: ControlType.Enum,
    title: 'Indicator color',
    options: ['secondary', 'primary'],
  },
  scrollButtons: {
    type: ControlType.Enum,
    title: 'Scroll buttons',
    options: ['auto', 'desktop', 'on', 'off'],
  },
  textColor: {
    type: ControlType.Enum,
    title: 'Text color',
    options: ['secondary', 'primary', 'inherit'],
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['standard', 'scrollable', 'fullWidth'],
  },
  appBarColor: {
    type: ControlType.Enum,
    title: 'App bar color',
    options: ['default', 'primary', 'secondary', 'inherit'],
  },
  icons: {
    type: ControlType.Array,
    title: 'Icons',
    propertyControl: { type: ControlType.String },
  },
  labels: {
    type: ControlType.Array,
    title: 'Labels',
    propertyControl: { type: ControlType.String },
  },
});
