import * as React from 'react';
import { XGrid } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DateRange } from '@material-ui/lab/DateRangePicker';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import FolderTreeView from 'docs/src/pages/components/tree-view/FolderTreeView';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

export default function Hero() {
  const { loading, data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 1000,
    maxColumns: 40,
    editable: true,
  });
  const [value, setValue] = React.useState<DateRange<Date>>([startDate, endDate]);
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
        p: { md: 2, lg: 3, xl: 4 },
      }}
      right={
        <React.Fragment>
          <Paper sx={{ mb: { md: 2, lg: 3, xl: 4 } }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 1,
                position: 'relative',
                borderBottom: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
              }}
            >
              <Typography color="primary.main" fontWeight={600}>
                Trades, October 2020
              </Typography>
            </Box>
            <Box
              sx={{
                height: { md: 300, xl: 500 },
                '& .MuiDataGrid-root': {
                  '& .MuiCheckbox-root': {
                    p: 0.5,
                    '& > svg': {
                      fontSize: '1.25rem',
                    },
                  },
                  '& .MuiDataGrid-columnHeaderTitleContainer': {
                    padding: 0,
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    flexGrow: 1,
                    fontSize: '0.875rem',
                  },
                  '& button, & button > svg': {
                    fontSize: 16,
                  },
                  '& .MuiDataGrid-viewport': {
                    '& .MuiDataGrid-cell': {
                      fontSize: '0.875rem',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      px: 0.5,
                    },
                  },
                  '& .MuiDataGrid-footerContainer': {
                    minHeight: 48,
                    '& .MuiToolbar-root': {
                      minHeight: 48,
                    },
                    '&  *:not(svg)': {
                      fontSize: '0.875rem',
                    },
                  },
                },
              }}
            >
              <XGrid
                {...data}
                disableSelectionOnClick
                checkboxSelection
                loading={loading}
                pagination
                density="compact"
              />
            </Box>
          </Paper>
          <Box
            sx={{
              display: 'flex',
              overflow: { md: 'auto', xl: 'unset' },
              m: { md: -2, lg: -3, xl: 0 },
              p: { md: 2, lg: 3, xl: 0 },
            }}
          >
            <Paper sx={{ minWidth: 300, mr: { md: 2, lg: 3, xl: 4 }, flexGrow: 1 }}>
              <Box sx={{ p: 2 }}>
                <Typography fontWeight={500}>Cool Project</Typography>
              </Box>
              <Divider />
              <FolderTreeView />
            </Paper>
            <Paper
              sx={{
                '& > div': { borderRadius: 1, overflow: 'auto', bgcolor: 'transparent' },
                '& .MuiTypography-subtitle1': {
                  fontSize: '0.875rem',
                },
                '& .MuiTypography-caption': {
                  width: { md: 28, xl: 32 },
                  height: 32,
                },
                '& .PrivatePickersSlideTransition-root': {
                  minWidth: { md: 268, xl: 300 },
                  minHeight: 238,
                },
                '& [role="row"]': {
                  margin: { md: '4px 0', xl: '6px 0' },
                },
                '& .MuiDateRangePickerDay-root': {
                  margin: 0,
                },
                '& .MuiPickersDay-root': {
                  width: { md: 28, xl: 32 },
                  height: { md: 28, xl: 32 },
                  fontWeight: 400,
                },
              }}
            >
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
          </Box>
        </React.Fragment>
      }
    />
  );
}
