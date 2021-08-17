import * as React from 'react';
import { XGrid, GridCellParams, GridColDef } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Box from '@material-ui/core/Box';
import Paper, { paperClasses } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';

export default function Hero() {
  const [type, setType] = React.useState<'Commodity'>('Commodity');
  const [size, setSize] = React.useState(100);
  const { loading, data, setRowLength, loadNewData } = useDemoData({
    dataSet: type,
    rowLength: size,
    maxColumns: 40,
    editable: true,
  });
  const [value, setValue] = React.useState([null, null]);
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > *': { mr: 1, width: 28, height: 28 },
            }}
          >
            <IconImage name="product-advanced" /> Advanced
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Performant
            <br />
            <GradientText>advanced</GradientText>,<br /> components.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Get a growing list of components, ready to use, forever free with built-in
            accessibility. We&apos;ve built the foundational UI blocks for your design system so you
            don&apos;t have to.
          </Typography>
          <GetStartedButtons
            installation="npm install @mui/x"
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          />
        </Box>
      }
      rightSx={{
        p: 2,
        pr: '0px',
        display: 'grid',
        gap: 4,
        gridTemplateColumns: '1fr 1fr',
      }}
      right={
        <React.Fragment>
          <Paper sx={{ height: { md: 320, xl: 540 }, gridColumn: 'span 2' }}>
            <XGrid
              {...data}
              disableSelectionOnClick
              checkboxSelection
              loading={loading}
              density="compact"
            />
          </Paper>
          <Paper sx={{ '& > div': { borderRadius: 1 } }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </Paper>
        </React.Fragment>
      }
    />
  );
}
