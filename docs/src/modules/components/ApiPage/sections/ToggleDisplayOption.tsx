import * as React from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';

export type ApiDisplayOptions = 'collapsed' | 'expended' | 'table';

const options: ApiDisplayOptions[] = ['collapsed', 'expended', 'table'];

export const API_LAYOUT_STORAGE_KEYS = {
  default: 'apiPage_default',
  slots: 'apiPage_slots',
  props: 'apiPage_props',
  css: 'apiPage_css',
  classes: 'apiPage_classes',
} as const;

const getRandomOption = () => {
  // A default layout is saved in localstorage at first render to make sure all section start with the same layout.
  const savedDefaultOption = localStorage.getItem(
    API_LAYOUT_STORAGE_KEYS.default,
  ) as null | ApiDisplayOptions;

  if (savedDefaultOption !== null && options.includes(savedDefaultOption)) {
    return savedDefaultOption;
  }

  const randomOption = options[Math.floor(options.length * Math.random())];
  try {
    localStorage.setItem(API_LAYOUT_STORAGE_KEYS.default, randomOption);
  } catch (error) {
    // Do nothing
  }
  return randomOption;
};

export function useApiPageOption(
  storageKey: string,
): [ApiDisplayOptions, (newOption: ApiDisplayOptions) => void] {
  const [option, setOption] = React.useState(options[0]);

  const updateOption = React.useCallback(
    (newOption: ApiDisplayOptions) => {
      try {
        localStorage.setItem(storageKey, newOption);
      } catch (error) {
        // Do nothing
      }
      setOption(newOption);
    },
    [storageKey],
  );

  React.useEffect(() => {
    try {
      const savedOption = localStorage.getItem(storageKey);
      if (savedOption !== null) {
        setOption(savedOption as ApiDisplayOptions);
        return;
      }

      const randomOption = getRandomOption();
      updateOption(randomOption);
    } catch (error) {
      // do nothing
    }
  }, [storageKey, updateOption]);

  return [option, updateOption];
}

export function getApiPageLayout() {
  const rep: { [key: string]: string } = {};

  Object.values(API_LAYOUT_STORAGE_KEYS).forEach((localStorageKey) => {
    try {
      const savedOption = localStorage.getItem(localStorageKey);
      rep[localStorageKey] = savedOption || 'none';
    } catch {
      rep[localStorageKey] = 'none';
    }
  });
  return rep;
}

// Fix Toggle buton highlight (taken from https://github.com/mui/material-ui/issues/18091)
type TooltipToggleButtonProps = ToggleButtonProps & {
  /**
   * The title passed to the Tooltip
   */
  title: string;
  TooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
};

// Catch props and forward to ToggleButton
const TooltipToggleButton: React.FC<TooltipToggleButtonProps> = React.forwardRef(
  ({ title, TooltipProps: tooltipProps, ...props }, ref) => {
    return (
      <Tooltip {...tooltipProps} title={title}>
        <ToggleButton ref={ref} {...props} />
      </Tooltip>
    );
  },
);

TooltipToggleButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  title: PropTypes.string.isRequired,
  TooltipProps: PropTypes.object,
};

interface ToggleDisplayOptionProps {
  displayOption: ApiDisplayOptions;
  setDisplayOption: (newValue: ApiDisplayOptions) => void;
}

export default function ToggleDisplayOption(props: ToggleDisplayOptionProps) {
  const { displayOption, setDisplayOption } = props;

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newDisplayOption: ApiDisplayOptions | null,
  ) => {
    if (newDisplayOption === null) {
      return;
    }
    setDisplayOption(newDisplayOption);
  };

  return (
    <ToggleButtonGroup
      size="small"
      value={displayOption}
      exclusive
      onChange={handleAlignment}
      aria-label="API display option"
      sx={{
        '& .MuiSvgIcon-root': {
          height: '18px',
          width: '18px',
        },
        '&.MuiToggleButtonGroup-root .MuiToggleButton-root': {
          padding: '4px 6px',
          borderRadius: '6px',
          '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      }}
    >
      <TooltipToggleButton value="collapsed" aria-label="colapsed list" title="Collapse list view">
        <ReorderRoundedIcon size="small" />
      </TooltipToggleButton>
      <TooltipToggleButton value="expended" aria-label="expended list" title="Expand list view">
        <CalendarViewDayRoundedIcon />
      </TooltipToggleButton>
      <TooltipToggleButton value="table" aria-label="table" title="Table view">
        <TableChartRoundedIcon />
      </TooltipToggleButton>
    </ToggleButtonGroup>
  );
}
