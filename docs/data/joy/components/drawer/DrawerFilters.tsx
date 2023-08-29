import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Link from '@mui/joy/Link';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import TuneIcon from '@mui/icons-material/TuneRounded';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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
        size="lg"
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: 3,
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'xl',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Typography level="h4">Filters</Typography>
          <ModalClose sx={{ borderRadius: 40 }} />

          <Divider />

          <FormControl>
            <FormLabel sx={{ typography: 'title-lg' }}>Property Type</FormLabel>
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
                    icon: <HouseIcon />,
                  },
                  {
                    name: 'Apartment',
                    icon: <ApartmentIcon />,
                  },
                  {
                    name: 'Guesthouse',
                    icon: <BungalowIcon />,
                  },
                  {
                    name: 'Hotel',
                    icon: <LocationCityIcon />,
                  },
                ].map((item) => (
                  <Card
                    key={item.name}
                    variant="outlined"
                    sx={{
                      boxShadow: 'none',
                      borderRadius: 'xl',
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
                              borderColor: 'text.primary',
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

          <Typography level="title-lg">Amenities</Typography>
          <div role="group" aria-labelledby="rank">
            <List
              orientation="horizontal"
              wrap
              sx={{
                '--List-gap': '8px',
                '--ListItem-radius': '20px',
                '--ListItem-minHeight': '32px',
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
                'TV',
                'Icon',
              ].map((item, index) => {
                const selected = amenities.includes(index);
                return (
                  <ListItem key={item}>
                    <AspectRatio
                      variant={selected ? 'solid' : 'outlined'}
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
                          // @ts-ignore
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

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link level="title-sm" component="button" underline="none">
            Show more…
          </Link>

          <Typography level="title-lg" sx={{ mt: 1 }}>
            Booking Options
          </Typography>
          <FormControl orientation="horizontal">
            <Box sx={{ flex: 1 }}>
              <FormLabel sx={{ typography: 'title-md' }}>Instant Book</FormLabel>
              <FormHelperText>
                Listings you can book without waiting for host approval
              </FormHelperText>
            </Box>
            <Switch size="lg" sx={{ '--Switch-trackWidth': '52px' }} />
          </FormControl>

          <Divider />

          <FormControl orientation="horizontal">
            <Box sx={{ flex: 1 }}>
              <FormLabel sx={{ typography: 'title-md' }}>Self Check-in</FormLabel>
              <FormHelperText>
                Easy access to the property when you arrive
              </FormHelperText>
            </Box>
            <Switch size="lg" sx={{ '--Switch-trackWidth': '52px' }} />
          </FormControl>

          <Divider />

          <FormControl orientation="horizontal">
            <Box sx={{ flex: 1 }}>
              <FormLabel sx={{ typography: 'title-md' }}>Superhost</FormLabel>
              <FormHelperText>Stay with top tier recognized hosts</FormHelperText>
            </Box>
            <Switch size="lg" sx={{ '--Switch-trackWidth': '52px' }} />
          </FormControl>

          <Divider sx={{ mt: 'auto' }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '& button': { borderRadius: 'lg' },
            }}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setType('');
                setAmenities([]);
              }}
            >
              Clear all
            </Button>
            <Button onClick={() => setOpen(false)}>Show 165 properties</Button>
          </Box>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
