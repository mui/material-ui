import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  },
);

export default function InputReactNumberFormat() {
  const [value, setValue] = React.useState('1320');
  return (
    <FormControl>
      <FormLabel>React number format</FormLabel>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Placeholder"
        slotProps={{
          input: {
            component: NumericFormatAdapter,
          },
        }}
      />
    </FormControl>
  );
}
