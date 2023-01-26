import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import FolderTreeView from 'docs/src/components/showcase/FolderTreeView';
import ROUTES from 'docs/src/route';
import { alpha } from '@mui/material/styles';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

export default function XHero() {
  const { loading, data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10000,
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
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1, width: 28, height: 28 },
              ...theme.applyDarkStyles({
                color: 'primary.400',
              }),
            })}
          >
            <IconImage name="product-advanced" /> MUI X
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Performant
            <br />
            <GradientText>advanced</GradientText>
            <br /> components
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Build complex and data-rich applications using a growing list of advanced React
            components. We&apos;re kicking it off with the most powerful Data Grid on the market.
          </Typography>
          <GetStartedButtons
            installation="npm install @mui/x-data-grid"
            to={ROUTES.dataGridDocs}
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          />
        </Box>
      }
      rightSx={{
        p: { md: 2, lg: 3, xl: 4 },
        overflow: 'hidden', // the components on the Hero section are mostly illustrative, even though they're interactive. That's why scrolling is disabled.
      }}
      right={
        <React.Fragment>
          <Paper
            sx={(theme) => ({
              backgroundColor: '#fff',
              border: '1px solid',
              borderColor: 'grey.200',
              boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
              mb: { md: 2, lg: 3, xl: 4 },
              ...theme.applyDarkStyles({
                backgroundColor: 'primaryDark.800',
                borderColor: 'primaryDark.600',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
              }),
            })}
          >
            <Box
              sx={(theme) => ({
                textAlign: 'center',
                py: 1.5,
                position: 'relative',
                borderRadius: 0,
                borderBottom: '1px solid',
                borderColor: 'grey.200',
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.600',
                }),
              })}
            >
              <Typography fontWeight={500}>Trades, October 2020</Typography>
            </Box>
            <Box
              sx={[
                {
                  height: { md: 300, xl: 370 },
                  '& .MuiDataGrid-root': {
                    borderRadius: 1,
                    border: 0,
                    color: 'text.secondary',
                    '& .MuiCheckbox-root': {
                      p: 0.5,
                      '& > svg': {
                        fontSize: '1.25rem',
                      },
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                      padding: 0,
                      color: 'text.primary',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      flexGrow: 1,
                      fontSize: '0.875rem',
                    },
                    '& button, & button > svg': {
                      fontSize: 16,
                    },
                    '& .MuiDataGrid-cell': {
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                    },
                    '& .MuiDataGrid-viewport': {
                      '& .MuiDataGrid-cell': {
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '0.875rem',
                        px: 0.5,
                      },
                    },
                    '& .MuiDataGrid-cell[data-field="status"][data-value="Rejected"]': {
                      '& .MuiChip-root': {
                        color: red[500],
                      },
                    },
                  },
                },
                (theme) =>
                  theme.applyDarkStyles({
                    '& .MuiDataGrid-root': {
                      '& .MuiDataGrid-columnHeaders': {
                        borderColor: 'primaryDark.600',
                      },
                      '& .MuiDataGrid-cell': {
                        borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                      },
                      '& .MuiDataGrid-cell[data-field="status"][data-value="Rejected"]': {
                        '& .MuiChip-root': {
                          color: red[300],
                        },
                      },
                    },
                  }),
              ]}
            >
              <DataGridPro
                {...data}
                disableRowSelectionOnClick
                checkboxSelection
                hideFooter
                loading={loading}
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
            <Paper
              sx={(theme) => ({
                backgroundColor: '#fff',
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                ...theme.applyDarkStyles({
                  backgroundColor: 'primaryDark.800',
                  borderColor: 'primaryDark.600',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                }),
                minWidth: 300,
                mr: { md: 2, lg: 3, xl: 4 },
                flexGrow: 1,
              })}
            >
              <Box sx={{ p: 2 }}>
                <Typography fontWeight={500}>Cool Project</Typography>
              </Box>
              <Divider />
              <FolderTreeView />
            </Paper>
            <Paper
              sx={[
                {
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                  '& > div': {
                    borderRadius: 1,
                    overflow: 'auto',
                    backgroundColor: 'initial',
                  },
                  '& .MuiTypography-subtitle1': {
                    fontSize: '0.875rem',
                  },
                  '& .MuiTypography-caption': {
                    width: { xs: 28, xl: 32 },
                    height: 32,
                  },
                  '& .MuiPickersSlideTransition-root': {
                    minWidth: { xs: 268, xl: 300 },
                    minHeight: { xs: 238, xl: 288 },
                  },
                  '& [role="row"]': {
                    margin: { xs: '4px 0', xl: '6px 0' },
                  },
                  '& .MuiDateRangePickerDay-root': {
                    lineHeight: 0,
                    margin: 0,
                  },
                  '& .MuiPickersDay-root': {
                    width: { xs: 28, xl: 32 },
                    height: { xs: 28, xl: 32 },
                    fontWeight: 400,
                  },
                },
                (theme) =>
                  theme.applyDarkStyles({
                    borderColor: 'primaryDark.600',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                    '& > div': {
                      backgroundColor: 'primaryDark.800',
                    },
                  }),
              ]}
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
