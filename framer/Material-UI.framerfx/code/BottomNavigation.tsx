import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiBottomNavigation from '@material-ui/core/BottomNavigation';
import MuiBottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Icon } from './Icon';

interface Props {
  showLabels: boolean;
  icons: string[];
  labels: string[];
  width: number | string;
  height: number;
}

export function BottomNavigation(props: Props): JSX.Element {
  const { labels, icons, ...other } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, value: any) => {
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
}

BottomNavigation.defaultProps = {
  showLabels: false,
  icons: ['restore', 'favorite', 'location_on', 'folder'],
  labels: ['Recents', 'Favorites', 'Nearby', 'Saved'],
  width: 500,
  height: 56,
};

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
