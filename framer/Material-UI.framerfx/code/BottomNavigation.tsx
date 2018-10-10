import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiBottomNavigation from '@material-ui/core/BottomNavigation';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiBottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Icon } from './Icon';

interface Props {
  showLabels?: boolean;
  icons?: string[];
  labels?: string[];
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  showLabels: false,
  icons: ['restore', 'favorite', 'location_on', 'folder'],
  labels: ['Recents', 'Favorites', 'Nearby', 'Saved'],
  width: 500,
  height: 56,
};

export const BottomNavigation: React.SFC<Props> = (props: Props) => {
  const { labels, icons, ...other } = props;

  // tslint:disable-next-line: ban-ts-ignore
  // @ts-ignore
  const [value, setValue] = React.useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const items = icons.length > labels.length ? icons : labels;

  return (
    <MuiBottomNavigation value={value} onChange={handleChange} {...other}>
      {items.map(
        (item, index) =>
          (labels[index] !== undefined || icons[index] !== undefined) && (
            <MuiBottomNavigationAction
              key={item}
              value={index}
              label={labels[index]}
              icon={<Icon icon={icons[index] || ''} />}
            />
          ),
      )}
    </MuiBottomNavigation>
  );
};

BottomNavigation.defaultProps = defaultProps;

addPropertyControls(BottomNavigation, {
  showLabels: {
    type: ControlType.Boolean,
    title: 'Show labels',
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
