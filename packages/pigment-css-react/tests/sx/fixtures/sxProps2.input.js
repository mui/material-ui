import { styled } from '@pigment-css/react';

const autocompleteClasses = {
  option: 'MuiAutocomplete-option',
};

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
  font-size: ${({ theme }) => (theme.vars ?? theme).size.font.h1};
`;

const A = {
  SliderRail,
};

function App(props) {
  return (
    <SliderRail
      sx={({ theme }) => ({
        mb: 1,
        ...theme.applyStyles('dark', {
          color: 'white',
        }),
      })}
    />
  );
}

function App2() {
  return (
    <SliderRail
      sx={{
        borderRadius: '8px',
        margin: '5px',
        [`&.${autocompleteClasses.option}`]: {
          padding: '8px',
        },
      }}
      component="li"
      {...props}
    />
  );
}

function App3(props) {
  return (
    <A.SliderRail
      sx={({ theme }) => ({
        color: (theme.vars || theme).palette.primary.main,
        fontSize: props.isRed ? 'h1-fontSize' : 'h2-fontSize',
        ':hover': {
          backgroundColor: ['primary.main', 'secondary.main'],
          color: {
            sm: 'primary.main',
            md: 'secondary.main',
          },
        },
      })}
    />
  );
}
