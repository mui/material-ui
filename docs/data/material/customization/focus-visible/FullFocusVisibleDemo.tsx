import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Pagination from '@mui/material/Pagination';
import ButtonBase from '@mui/material/ButtonBase';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Slider from '@mui/material/Slider';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Rating from '@mui/material/Rating';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

const theme = createTheme({
  focusVisible: true,
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

const noop = () => {};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Typography variant="body2" sx={{ fontWeight: 600, alignSelf: 'center' }}>
        {label}
      </Typography>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1 }}
      >
        {children}
      </Stack>
    </React.Fragment>
  );
}

function Bucket({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Typography variant="overline" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mb: 1.5 }}
      >
        {hint}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          alignItems: 'center',
          columnGap: 3,
          rowGap: 2,
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default function FullFocusVisibleDemo() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={3}>
        <Bucket
          title="outer-ring"
          hint="The ring renders fully outside the component."
        >
          <Row label="Button">
            <Button variant="text">Text</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="contained">Contained</Button>
          </Row>
          <Row label="IconButton">
            <IconButton aria-label="star">
              <StarIcon />
            </IconButton>
          </Row>
          <Row label="ButtonGroup">
            <ButtonGroup variant="outlined">
              <Button>One</Button>
              <Button>Two</Button>
            </ButtonGroup>
          </Row>
          <Row label="ToggleButton">
            <ToggleButtonGroup value="left" exclusive>
              <ToggleButton value="left">Left</ToggleButton>
              <ToggleButton value="right">Right</ToggleButton>
            </ToggleButtonGroup>
          </Row>
          <Row label="Fab">
            <Fab size="small" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Row>
          <Row label="Chip">
            <Chip label="Clickable" onClick={noop} />
            <Chip label="Deletable" onDelete={noop} />
          </Row>
          <Row label="Checkbox">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Checkbox A"
              />
              <FormControlLabel control={<Checkbox />} label="Checkbox B" />
            </FormGroup>
          </Row>
          <Row label="Radio">
            <RadioGroup defaultValue="a">
              <FormControlLabel value="a" control={<Radio />} label="Radio A" />
              <FormControlLabel value="b" control={<Radio />} label="Radio B" />
            </RadioGroup>
          </Row>
          <Row label="Switch">
            <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
          </Row>
          <Row label="Pagination">
            <Pagination count={3} />
          </Row>
          <Row label="ButtonBase">
            <ButtonBase
              sx={{
                px: 1.5,
                py: 1,
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              ButtonBase
            </ButtonBase>
          </Row>
          <Row label="AccordionSummary">
            <Accordion disableGutters sx={{ width: 280 }}>
              <AccordionSummary>Accordion header</AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Details</Typography>
              </AccordionDetails>
            </Accordion>
          </Row>
          <Row label="TableSortLabel">
            <TableContainer component={Paper} variant="outlined" sx={{ width: 280 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel active direction="asc">
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel>Size</TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>file.txt</TableCell>
                    <TableCell>12 KB</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Row>
          <Row label="Slider">
            <Slider defaultValue={40} aria-label="Volume" sx={{ width: 200 }} />
          </Row>
          <Row label="Link">
            <Link href="#">Text link</Link>
          </Row>
          <Row label="Breadcrumbs">
            <Breadcrumbs>
              <Link href="#">Home</Link>
              <Link href="#">Catalog</Link>
              <Typography color="text.primary">Item</Typography>
            </Breadcrumbs>
          </Row>
          <Row label="Rating">
            <Rating defaultValue={3} />
          </Row>
        </Bucket>

        <Divider />

        <Bucket
          title="inner-ring"
          hint="Inside a scrollable or overflow-clipped container — the ring is inset (outlineOffset -2) so it cannot be clipped."
        >
          <Row label="Tab">
            <Tabs value={0} sx={{ minHeight: 0 }}>
              <Tab label="Tab one" />
              <Tab label="Tab two" />
            </Tabs>
          </Row>
          <Row label="Stepper">
            <Stepper nonLinear activeStep={0} sx={{ minWidth: 260 }}>
              <Step>
                <StepButton>One</StepButton>
              </Step>
              <Step>
                <StepButton>Two</StepButton>
              </Step>
            </Stepper>
          </Row>
          <Row label="MenuItem">
            <MenuList
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
            </MenuList>
          </Row>
          <Row label="ListItemButton">
            <List
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                minWidth: 200,
                py: 0,
              }}
            >
              <ListItemButton>
                <ListItemText primary="List item" />
              </ListItemButton>
            </List>
          </Row>
          <Row label="BottomNavigation">
            <BottomNavigation
              showLabels
              value={0}
              sx={{ width: 320, border: 1, borderColor: 'divider', borderRadius: 1 }}
            >
              <BottomNavigationAction label="Star" icon={<StarIcon />} />
              <BottomNavigationAction label="Add" icon={<AddIcon />} />
            </BottomNavigation>
          </Row>
          <Row label="CardActionArea">
            <Card variant="outlined" sx={{ width: 160 }}>
              <CardActionArea>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2">Card</Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Row>
          <Row label="Select">
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="fv-select-label">Select</InputLabel>
              <Select labelId="fv-select-label" label="Select" defaultValue="a">
                <MenuItem value="a">Option A</MenuItem>
                <MenuItem value="b">Option B</MenuItem>
                <MenuItem value="c">Option C</MenuItem>
              </Select>
            </FormControl>
          </Row>
          <Row label="Autocomplete">
            <Autocomplete
              options={['Apple', 'Banana', 'Cherry']}
              sx={{ width: 220 }}
              renderInput={(params) => (
                <TextField {...params} label="Autocomplete" size="small" />
              )}
            />
          </Row>
        </Bucket>
      </Stack>
    </ThemeProvider>
  );
}
