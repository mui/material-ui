import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/base/Button';
import Input, { InputProps, inputClasses } from '@mui/base/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`,
);

const IconButton = styled(Button)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[700]};
  `,
);

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CustomInput = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { slots, ...other } = props;
  return (
    <Input
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export default function InputAdornments() {
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', '& > * + *': { ml: 1 } }}>
      <CustomInput
        id="outlined-start-adornment"
        startAdornment={<InputAdornment>kg</InputAdornment>}
      />
      <CustomInput
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
}
