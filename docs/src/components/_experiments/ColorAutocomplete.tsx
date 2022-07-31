import * as React from 'react';
import { decomposeColor } from '@mui/system';
import PopperUnstyled, { PopperUnstyledOwnProps } from '@mui/base/PopperUnstyled';
import { styled } from '@mui/joy/styles';
import TextField, { TextFieldProps } from '@mui/joy/TextField';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Sheet from '@mui/joy/Sheet';

const StyledPopper = styled(Sheet)(({ theme }) => ({
  zIndex: 1000,
  boxShadow: theme.vars.shadow.md,
  borderRadius: theme.vars.radius.sm,
  height: 240,
  overflow: 'auto',
}));

const ColorAutocomplete = ({
  value,
  minLabelWidth,
  onValidColor,
  onEmptyColor,
  tokens,
  listClassName = '',
  ...props
}: TextFieldProps & {
  minLabelWidth: number | string;
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
  tokens: string[];
  listClassName?: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [internalValue, setInternalValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const focused = React.useRef(false);
  const clickingRef = React.useRef(false);
  const scrollableRef = React.useRef<HTMLDivElement | null>(null);
  const matches: string[] = [];
  const unmatches: string[] = [];
  tokens.forEach((item) => {
    if (internalValue && item.includes(internalValue)) {
      matches.push(item);
    } else {
      unmatches.push(item);
    }
  });
  const modifiers = React.useMemo<PopperUnstyledOwnProps['modifiers']>(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
    [],
  );
  React.useEffect(() => {
    if (value !== internalValue && !focused.current && !anchorEl) {
      // sync value only when input is not focused and popup is not open
      // meanining when user is not interact with this field.
      setInternalValue(value || '');
    }
  }, [value, internalValue, anchorEl]);
  const renderOption = (variable: string) => (
    <ListItemButton
      key={variable}
      onMouseDown={() => {
        clickingRef.current = true; // this is called before input's onBlur to not close the popup
      }}
      onClick={() => {
        clickingRef.current = false; // reset the clickingRef
        setIsError(false);
        setInternalValue(variable);
        onValidColor(variable);
        setAnchorEl(null); // close the popup
      }}
    >
      <ListItemDecorator>
        <Sheet
          variant="outlined"
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: variable,
          }}
        />
      </ListItemDecorator>
      {variable.replace(/var\(--joy-([^)]+)\)/, '$1')}
    </ListItemButton>
  );
  return (
    <React.Fragment>
      <TextField
        {...props}
        placeholder="e.g. #fff"
        size="sm"
        error={isError}
        value={internalValue}
        endDecorator={
          internalValue && !isError ? (
            <Sheet
              variant="outlined"
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                mr: -0.5,
                bgcolor: internalValue,
              }}
            />
          ) : null
        }
        sx={{
          flexDirection: 'row',
          gap: 0.5,
          '& > label': {
            minWidth: minLabelWidth,
            mb: 0,
            '& + div': { flexGrow: 1, fontSize: 'xs' },
          },
        }}
        onChange={(event) => {
          const { value: inputValue } = event.target;
          setInternalValue(inputValue);
          if (scrollableRef.current) {
            scrollableRef.current.scrollTop = 0;
          }
          if (inputValue === '') {
            onEmptyColor();
            setIsError(false);
          } else if (inputValue.match(/var\(--joy-[^)]+\)/)) {
            onValidColor(inputValue);
            setIsError(false);
          } else {
            try {
              decomposeColor(inputValue); // if inputValue is not a valid color, it throws an error
              onValidColor(inputValue);
              setIsError(false);
            } catch (error) {
              setIsError(true);
            }
          }
        }}
        onFocus={(event) => {
          (event.target as HTMLInputElement).select();
          setAnchorEl(event.target.parentNode as HTMLElement);
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
          if (!clickingRef.current) {
            // don't close if clicking on the option
            setAnchorEl(null);
          }
        }}
      />
      <PopperUnstyled
        ref={scrollableRef}
        variant="outlined"
        component={StyledPopper}
        anchorEl={anchorEl}
        disablePortal
        open={Boolean(anchorEl)}
        modifiers={modifiers}
        placement="bottom-start"
      >
        <List
          className={listClassName}
          component="div"
          size="sm"
          sx={{
            '--List-item-fontSize': '12px',
            '--List-decorator-width': '20px',
          }}
        >
          {matches.length > 0 ? (
            <React.Fragment>
              <ListItem
                sticky
                sx={{
                  letterSpacing: 'md',
                  textTransform: 'uppercase',
                  fontSize: 'xs2',
                  fontWeight: 'lg',
                }}
              >
                Best matches
              </ListItem>
              {matches.map(renderOption)}
              <ListItem
                sticky
                sx={{
                  letterSpacing: 'md',
                  textTransform: 'uppercase',
                  fontSize: 'xs2',
                  fontWeight: 'lg',
                }}
              >
                Others
              </ListItem>
              {unmatches.map(renderOption)}
            </React.Fragment>
          ) : (
            unmatches.map(renderOption)
          )}
        </List>
      </PopperUnstyled>
    </React.Fragment>
  );
};

export default ColorAutocomplete;
