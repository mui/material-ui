import * as React from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

export type ApiDisplayOptions = 'collapsed' | 'expanded' | 'table';

const options: ApiDisplayOptions[] = ['collapsed', 'expanded', 'table'];

export const DEFAULT_API_LAYOUT_STORAGE_KEYS = {
  slots: 'apiPage_slots',
  props: 'apiPage_props',
  classes: 'apiPage_classes',
} as const;

let neverHydrated = true;

function getOption(storageKey: string, defaultValue: ApiDisplayOptions): ApiDisplayOptions {
  if (neverHydrated) {
    return defaultValue;
  }
  try {
    const savedOption = localStorage.getItem(storageKey);

    if (savedOption !== null && options.includes(savedOption as ApiDisplayOptions)) {
      return savedOption as ApiDisplayOptions;
    }
  } catch (error) {
    return defaultValue;
  }
  return defaultValue;
}

export function useApiPageOption(
  storageKey: string,
  defaultValue: ApiDisplayOptions,
): [ApiDisplayOptions, (newOption: ApiDisplayOptions) => void] {
  const [option, setOption] = React.useState(getOption(storageKey, defaultValue));

  useEnhancedEffect(() => {
    neverHydrated = false;
    const newOption = getOption(storageKey, defaultValue);
    setOption(newOption);
  }, [storageKey, defaultValue]);

  React.useEffect(() => {
    if (option !== defaultValue) {
      const id = document.location.hash.slice(1);
      const element = document.getElementById(id);
      element?.scrollIntoView();
    }
    return undefined;
  }, [option, defaultValue]);

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

  return [option, updateOption];
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
const TooltipToggleButton = React.forwardRef<HTMLButtonElement, TooltipToggleButtonProps>(
  ({ title, TooltipProps: tooltipProps, ...props }, ref) => {
    return (
      <Tooltip {...tooltipProps} title={title}>
        <ToggleButton ref={ref} {...props} />
      </Tooltip>
    );
  },
);

interface ToggleDisplayOptionProps {
  displayOption: ApiDisplayOptions;
  setDisplayOption: (newValue: ApiDisplayOptions) => void;
  /**
   * The type of section. This value is used to send correct event to Google Analytics.
   */
  sectionType: 'classes' | 'props' | 'slots';
}

export default function ToggleDisplayOption(props: ToggleDisplayOptionProps) {
  const { displayOption, setDisplayOption, sectionType } = props;

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
      <TooltipToggleButton
        value="collapsed"
        aria-label="colapsed list"
        title="Collapse list view"
        data-ga-event-category="layout"
        data-ga-event-action={sectionType}
        data-ga-event-label="collapsed"
      >
        <ReorderRoundedIcon size="small" />
      </TooltipToggleButton>
      <TooltipToggleButton
        value="expanded"
        aria-label="expanded list"
        title="Expand list view"
        data-ga-event-category="layout"
        data-ga-event-action={sectionType}
        data-ga-event-label="expanded"
      >
        <CalendarViewDayRoundedIcon />
      </TooltipToggleButton>
      <TooltipToggleButton
        value="table"
        aria-label="table"
        title="Table view"
        data-ga-event-category="layout"
        data-ga-event-action={sectionType}
        data-ga-event-label="table"
      >
        <TableChartRoundedIcon />
      </TooltipToggleButton>
    </ToggleButtonGroup>
  );
}
