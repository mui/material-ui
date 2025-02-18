import * as React from 'react';
import colors from '@mui/joy/colors';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SvgIcon from '@mui/joy/SvgIcon';

const primary = {
  50: '#F4FAFF',
  100: '#DDF1FF',
  200: '#ADDBFF',
  300: '#6FB6FF',
  400: '#3990FF',
  500: '#096BDE',
  600: '#054DA7',
  700: '#02367D',
  800: '#072859',
  900: '#00153C',
};

const neutral = {
  50: '#F7F7F8',
  100: '#EBEBEF',
  200: '#D8D8DF',
  300: '#B9B9C6',
  400: '#8F8FA3',
  500: '#73738C',
  600: '#5A5A72',
  700: '#434356',
  800: '#25252D',
  900: '#131318',
};

const danger = {
  50: '#FFF8F6',
  100: '#FFE9E8',
  200: '#FFC7C5',
  300: '#FF9192',
  400: '#FA5255',
  500: '#D3232F',
  600: '#A10E25',
  700: '#77061B',
  800: '#580013',
  900: '#39000D',
};

const success = {
  50: '#F3FEF5',
  100: '#D7F5DD',
  200: '#77EC95',
  300: '#4CC76E',
  400: '#2CA24D',
  500: '#1A7D36',
  600: '#0F5D26',
  700: '#034318',
  800: '#002F0F',
  900: '#001D09',
};

const warning = {
  50: '#FFF8C5',
  100: '#FAE17D',
  200: '#EAC54F',
  300: '#D4A72C',
  400: '#BF8700',
  500: '#9A6700',
  600: '#7D4E00',
  700: '#633C01',
  800: '#4D2D00',
  900: '#3B2300',
};

const oldColors = {
  primary,
  neutral,
  danger,
  success,
  warning,
  common: {
    white: '#FFF',
    black: '#09090D',
  },
};
const newColors = {
  primary: colors.blue,
  neutral: colors.grey,
  danger: colors.red,
  success: colors.green,
  warning: colors.yellow,
  common: {
    white: '#FCFCFD',
    black: '#09090B',
  },
};

export default function PaletteChanges() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 2,
      }}
    >
      {['primary', 'neutral', 'danger', 'success', 'warning', 'common'].map(
        (color) => {
          const oldColorRange = oldColors[color];
          const newColorRange = newColors[color];
          return (
            <Sheet
              key={color}
              variant="outlined"
              sx={{ borderRadius: 'xs', boxShadow: 'xs' }}
            >
              <List size="sm">
                <ListSubheader>
                  {color} {color === 'common' ? '(white & black)' : '(50 - 900)'}
                </ListSubheader>
                {Object.keys(newColorRange).map((key) => {
                  return (
                    <ListItem
                      key={key}
                      sx={{
                        gap: 1,
                        display: 'grid',
                        gridTemplateColumns: '24px 1fr 20px 24px 1fr',
                      }}
                    >
                      <AspectRatio
                        variant="outlined"
                        ratio="1"
                        sx={{
                          width: 24,
                          bgcolor: oldColorRange[key],
                          borderRadius: 'xs',
                        }}
                      >
                        <div />
                      </AspectRatio>
                      <Typography level="body-xs">{oldColorRange[key]}</Typography>
                      <SvgIcon fontSize="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </SvgIcon>
                      <AspectRatio
                        variant="outlined"
                        ratio="1"
                        sx={{
                          width: 24,
                          bgcolor: newColorRange[key],
                          borderRadius: 'xs',
                        }}
                      >
                        <div />
                      </AspectRatio>
                      <Typography level="body-xs">{newColorRange[key]}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Sheet>
          );
        },
      )}
    </Box>
  );
}
