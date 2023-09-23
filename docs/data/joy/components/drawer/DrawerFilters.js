import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import TuneIcon from '@mui/icons-material/TuneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import Done from '@mui/icons-material/Done';

export default function DrawerFilters() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('Guesthouse');
  const [amenities, setAmenities] = React.useState([0, 6]);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<TuneIcon />}
        onClick={() => setOpen(true)}
      >
        Change filters
      </Button>
      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: 'title-md' }}>Property Type</FormLabel>
              <RadioGroup
                value={type || ''}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      name: 'House',
                      icon: <HomeRoundedIcon />,
                    },
                    {
                      name: 'Apartment',
                      icon: <ApartmentRoundedIcon />,
                    },
                    {
                      name: 'Guesthouse',
                      icon: <MeetingRoomRoundedIcon />,
                    },
                    {
                      name: 'Hotel',
                      icon: <HotelRoundedIcon />,
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: 'none',
                        '&:hover': { bgcolor: 'background.level1' },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography level="title-md">{item.name}</Typography>
                      </CardContent>
                      <Radio
                        disableIcon
                        overlay
                        checked={type === item.name}
                        variant="outlined"
                        color="neutral"
                        value={item.name}
                        sx={{ mt: -2 }}
                        slotProps={{
                          action: {
                            sx: {
                              ...(type === item.name && {
                                borderWidth: 2,
                                borderColor:
                                  'var(--joy-palette-primary-outlinedBorder)',
                              }),
                              '&:hover': {
                                bgcolor: 'transparent',
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>

            <Typography component="div" level="title-md">
              Amenities
            </Typography>
            <div role="group" aria-labelledby="rank">
              <List
                orientation="horizontal"
                size="sm"
                wrap
                sx={{
                  '--List-gap': '12px',
                  '--ListItem-radius': '20px',
                }}
              >
                {[
                  'Wifi',
                  'Washer',
                  'Air Conditioner',
                  'Kitchen',
                  'Dryer',
                  'Heating',
                  'Dedicated Workspace',
                ].map((item, index) => {
                  const selected = amenities.includes(index);
                  return (
                    <ListItem key={item}>
                      <AspectRatio
                        variant={selected ? 'solid' : 'outlined'}
                        color={selected ? 'primary' : 'neutral'}
                        ratio={1}
                        sx={{ width: 20, borderRadius: 20, ml: -0.5, mr: 0.75 }}
                      >
                        <div>{selected && <Done fontSize="md" />}</div>
                      </AspectRatio>
                      <Checkbox
                        size="sm"
                        color="neutral"
                        disableIcon
                        overlay
                        label={item}
                        variant="outlined"
                        checked={selected}
                        onChange={(event) =>
                          setAmenities((prev) => {
                            const set = new Set([...prev, index]);
                            if (!event.target.checked) {
                              set.delete(index);
                            }

                            return [...set];
                          })
                        }
                        slotProps={{
                          action: {
                            sx: {
                              '&:hover': {
                                bgcolor: 'transparent',
                              },
                            },
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <Typography level="title-md" sx={{ mt: 1 }}>
              Booking Options
            </Typography>
            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, pr: 1 }}>
                <FormLabel sx={{ typography: 'title-sm' }}>Instant Book</FormLabel>
                <FormHelperText sx={{ typography: 'body-sm' }}>
                  Listings you can book without waiting for host approval
                </FormHelperText>
              </Box>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, mt: 1, mr: 1 }}>
                <FormLabel sx={{ typography: 'title-sm' }}>Self Check-in</FormLabel>
                <FormHelperText sx={{ typography: 'body-sm' }}>
                  Easy access to the property when you arrive
                </FormHelperText>
              </Box>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, mt: 1, mr: 1 }}>
                <FormLabel sx={{ typography: 'title-sm' }}>Superhost</FormLabel>
                <FormHelperText sx={{ typography: 'body-sm' }}>
                  Stay with top tier recognized hosts
                </FormHelperText>
              </Box>
              <Switch />
            </FormControl>
          </DialogContent>

          <Divider sx={{ mt: 'auto' }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            useFlexGap
            spacing={1}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setType('');
                setAmenities([]);
              }}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Show 165 properties</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
