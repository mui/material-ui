import * as React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';

export type ApiDisplayOptions = 'collapsed' | 'expended';

const options: ApiDisplayOptions[] = ['collapsed', 'expended'];

const getRandomOption = () => options[Math.floor(options.length * Math.random())];

export function useApiPageOption(storageKey: string) {
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
      // eslint-disable-next-line material-ui/no-hardcoded-labels
      aria-label="API display option"
      sx={{
        '& .MuiSvgIcon-root': {
          height: '0.8em',
          width: '0.8em',
        },
        '&.MuiToggleButtonGroup-root .MuiToggleButton-root': {
          padding: '0.15rem 0.3rem',
          borderRadius: '10px',
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
      <ToggleButton
        value="collapsed"
        // eslint-disable-next-line material-ui/no-hardcoded-labels
        aria-label="colapsed list"
      >
        <ReorderRoundedIcon size="small" />
      </ToggleButton>

      <ToggleButton
        value="expended"
        // eslint-disable-next-line material-ui/no-hardcoded-labels
        aria-label="expended list"
      >
        <CalendarViewDayRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
