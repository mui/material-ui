import * as React from 'react';
import { decomposeColor } from '@mui/system';
import TextField, { TextFieldProps } from '@mui/joy/TextField';
import Sheet from '@mui/joy/Sheet';

const ColorTextField = ({
  value,
  minLabelWidth,
  onValidColor,
  onEmptyColor,
  ...props
}: TextFieldProps & {
  minLabelWidth: number | string;
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
}) => {
  const [internalValue, setInternalValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const focused = React.useRef(false);
  React.useEffect(() => {
    if (value !== internalValue && !focused.current) {
      setInternalValue(value || '');
    }
  }, [value, internalValue]);
  return (
    <TextField
      {...props}
      placeholder="e.g. #fff"
      size="sm"
      error={isError}
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
      value={internalValue}
      onFocus={(event) => {
        (event.target as HTMLInputElement).select();
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
      }}
      onChange={(event) => {
        const { value: inputValue } = event.target;
        setInternalValue(inputValue);
        if (inputValue === '') {
          onEmptyColor();
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
      sx={{ flexDirection: 'row', '& > label': { minWidth: minLabelWidth, mb: 0 } }}
    />
  );
};

export default ColorTextField;
