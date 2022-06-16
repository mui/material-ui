import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem, { listItemClasses } from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Apartment from '@mui/icons-material/Apartment';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const props = {
  size: ['sm', 'md', 'lg'],
  color: ['primary', 'danger', 'info', 'success', 'warning'],
  variant: ['plain', 'outlined', 'soft', 'solid'],
} as const;

export default function JoyRadio() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              p: 2,
              alignItems: 'center',
            },
          }}
        >
          {Object.entries(props).map(([propName, propValue]) => (
            <Box key={propName}>
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box key={value}>
                  <Radio {...{ [propName]: value }} />
                  {value && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          <div>
            <Typography sx={{ textDecoration: 'underline' }}>Group</Typography>
            <Box>
              <Typography level="body2" id="group-sm" sx={{ mb: 1 }}>
                Small group
              </Typography>
              <RadioGroup aria-labelledby="group-sm" name="group small" size="sm">
                <Radio label="Option A" disabled value="A" />
                <Radio label="Option B" value="B" />
                <Radio label="Option C" value="C" />
              </RadioGroup>
            </Box>
            <Box>
              <Typography id="group-list" sx={{ mb: 1 }}>
                List Group
              </Typography>
              <RadioGroup aria-labelledby="group-list" name="group list">
                <List component="div" sx={{ '--List-item-paddingLeft': '0px' }}>
                  <ListItem component="div">
                    <Radio label="Regular" value="Regular" />
                  </ListItem>
                  <ListItem component="div">
                    <Radio label="Deep" value="Deep" />
                  </ListItem>
                  <ListItem component="div">
                    <ListItemContent>
                      <Radio label="Thin" value="Thin" color="warning" />
                      <Typography level="body3" ml="28px" mt={0.5} textColor="warning.400">
                        This might make your pizza too crispy.
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                </List>
              </RadioGroup>
            </Box>
          </div>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 2,
          }}
        >
          <Box>
            <Typography id="group-row" sx={{ mb: 1 }}>
              Row group
            </Typography>
            <RadioGroup aria-labelledby="group-row" name="group row" row>
              <Radio label="Option A" disabled value="A" />
              <Radio label="Option B" value="B" />
              <Radio label="Option C" value="C" />
            </RadioGroup>
          </Box>
          <Box>
            <Typography id="plan" fontSize="lg" mb={1}>
              Plan
            </Typography>
            <RadioGroup aria-labelledby="plan" overlay>
              <List
                component="div"
                sx={{
                  '--List-item-radius': '8px',
                }}
              >
                <ListItem>
                  <Radio
                    value="startup"
                    label={
                      <Typography lineHeight="inherit" fontWeight="md">
                        Startup
                        <Typography level="body2" display="block" fontWeight="normal">
                          12GB/6 CPUs • 160 GB SSD disk
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <Radio
                    value="business"
                    label={
                      <Typography lineHeight="inherit" fontWeight="md">
                        Business
                        <Typography level="body2" display="block" fontWeight="normal">
                          16GB/8 CPUs • 512 GB SSD disk
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <Radio
                    value="enterprise"
                    label={
                      <Typography lineHeight="inherit" fontWeight="md">
                        Enterprise
                        <Typography level="body2" display="block" fontWeight="normal">
                          32GB/12 CPUs • 1024 GB SSD disk
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </RadioGroup>
          </Box>
          <Box>
            <Typography id="member" fontSize="lg" mb={1}>
              Member
            </Typography>
            <RadioGroup
              name="member"
              aria-labelledby="member"
              row
              sx={{
                gap: 1,
                '--Radio-action-radius': '4px',
                '& > div': {
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: 'md',
                  gap: 0.5,
                },
                [`& .${radioClasses.root}`]: {
                  mt: -1,
                  mr: -1,
                  mb: 1,
                  alignSelf: 'flex-end',
                  position: 'initial',
                },
              }}
            >
              <Sheet>
                <Radio
                  id="person1"
                  value="person1"
                  componentsProps={{ input: { 'aria-describedby': 'person1-role' } }}
                />
                <Avatar src="/static/images/avatar/1.jpg" />
                <Typography component="label" htmlFor="person1">
                  Person 1
                </Typography>
                <Typography level="body2" id="person1-role">
                  Writer
                </Typography>
              </Sheet>
              <Sheet>
                <Radio
                  id="person2"
                  value="person2"
                  componentsProps={{ input: { 'aria-describedby': 'person2-role' } }}
                />
                <Avatar src="/static/images/avatar/2.jpg" />
                <Typography component="label" htmlFor="person2">
                  Person 2
                </Typography>
                <Typography level="body2" id="person2-role">
                  Markerting
                </Typography>
              </Sheet>
              <Sheet>
                <Radio
                  id="person3"
                  value="person3"
                  componentsProps={{ input: { 'aria-describedby': 'person3-role' } }}
                />
                <Avatar src="/static/images/avatar/3.jpg" />
                <Typography component="label" htmlFor="person3">
                  Person 3
                </Typography>
                <Typography level="body2" id="person3-role">
                  Engineer
                </Typography>
              </Sheet>
            </RadioGroup>
          </Box>
          <Box>
            <Typography level="h2" fontSize="lg" id="display-heading">
              Display
            </Typography>
            <Sheet
              variant="soft"
              sx={{ p: 2, display: 'flex', gap: 2, my: 2, borderRadius: '18px' }}
            >
              <Typography level="body3" textColor="text.primary">
                <Typography fontWeight="md">
                  Choose from two anti-reflective glass options.
                </Typography>{' '}
                <Typography>
                  Standard glass is engineered for extremely low reflectivity. Nano-texture glass
                  scatters light to further minimize glare while delivering outstanding image
                  quality in workspaces with bright light sources.
                </Typography>
              </Typography>
              <InfoOutlined fontSize="lg" color="primary" />
            </Sheet>
            <RadioGroup
              disableIcon
              name="display"
              aria-labelledby="display-heading"
              sx={{
                '--Radio-action-radius': '18px',
                [`& .${radioClasses.root}`]: {
                  color: 'initial',
                  padding: '14px',
                  minHeight: '83px',
                  fontWeight: 'md',
                  flexGrow: 1,
                  '&.Mui-checked': {
                    [`& .${radioClasses.action}`]: {
                      borderWidth: 2,
                      borderColor: 'primary.500',
                    },
                  },
                },
                [`& .${radioClasses.label}`]: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              }}
            >
              <Radio
                label={
                  <React.Fragment>
                    <span>Standard glass</span>
                    <Typography fontWeight="sm" textAlign="right">
                      From $1599
                      <br />
                      <span aria-hidden="true">or $133.25/mo. for 12 mo.*</span>
                    </Typography>
                  </React.Fragment>
                }
                aria-describedby="standard-description"
                value="1"
              />
              <Typography
                id="standard-description"
                level="body3"
                startDecorator={<InfoOutlined />}
                mt={0.5}
                mb={2}
              >
                Description
              </Typography>
              <Radio
                label={
                  <React.Fragment>
                    <span>Nano-texture glass</span>
                    <Typography fontWeight="sm" textAlign="right">
                      From $1899
                      <br />
                      <span aria-hidden="true">or $158.25/mo. for 12 mo.*</span>
                    </Typography>
                  </React.Fragment>
                }
                value="2"
              />
            </RadioGroup>
          </Box>
          <Sheet
            variant="outlined"
            sx={{
              boxShadow: 'sm',
              borderRadius: '1rem',
              color: 'text.primary',
              alignSelf: 'flex-start',
            }}
          >
            <RadioGroup
              overlay
              name="plan-type"
              defaultValue="sm"
              sx={{
                [`& .${radioClasses.root}`]: {
                  flexGrow: 1,
                  alignItems: 'center',
                  pr: 0,
                  '--Radio-gap': '1rem',
                },
                [`& .${radioClasses.action}`]: {
                  outlineOffset: '-2px',
                },
              }}
            >
              <List
                component="div"
                sx={{
                  '--List-radius': '1rem',
                  '--List-gap': '0px',
                  '--List-item-paddingY': '0.75rem',
                }}
              >
                <ListItem>
                  <Radio
                    label={
                      <Typography sx={{ display: 'flex' }}>
                        <Typography level="inherit" fontWeight="md" flexGrow={1}>
                          Small <br />
                          <Typography fontWeight="normal" fontSize="sm" textColor="text.secondary">
                            Description
                          </Typography>
                        </Typography>
                        <Typography level="inherit" fontWeight="md" textAlign="right">
                          $40 <br />
                          <Typography fontWeight="normal" fontSize="sm" textColor="text.secondary">
                            per month
                          </Typography>
                        </Typography>
                      </Typography>
                    }
                    value="sm"
                  />
                </ListItem>
                <ListDivider />
                <ListItem>
                  <Radio label="Medium" value="md" />
                </ListItem>
                <ListDivider />
                <ListItem>
                  <Radio label="Large" value="lg" />
                </ListItem>
              </List>
            </RadioGroup>
          </Sheet>
          <RadioGroup name="people" overlay>
            <List
              sx={(theme) => ({
                '--List-item-paddingY': '1rem',
                '--List-item-radius': '4px',
                [`& .${listItemClasses.root}`]: {
                  ...theme.variants.outlined.neutral,
                  boxShadow: 'sm',
                  bgcolor: 'background.body',
                },
                [`& .${radioClasses.root}`]: {
                  flexGrow: 1,
                  flexDirection: 'row-reverse',
                  [`&.${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    },
                  },
                },
              })}
            >
              <ListItem>
                <ListItemDecorator>
                  <Person />
                </ListItemDecorator>
                <Radio disabled value="person" label="Individual" />
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <People />
                </ListItemDecorator>
                <Radio value="team" label="Team" />
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Apartment />
                </ListItemDecorator>
                <Radio value="interprise" label="Interprise" />
              </ListItem>
            </List>
          </RadioGroup>
          <Sheet variant="outlined" sx={{ borderRadius: '12px' }}>
            <RadioGroup name="method" sx={{ '--RadioGroup': '12px' }}>
              <List row>
                <ListItem sx={{ flexBasis: '50%' }}>
                  <Radio value="credit-card" label="Credit Card" />
                </ListItem>
                <ListDivider />
                <ListItem sx={{ flexBasis: '50%' }}>
                  <Radio value="paypal" label="Paypal" />
                </ListItem>
              </List>
            </RadioGroup>
          </Sheet>
        </Box>
        <RadioGroup name="size" overlay sx={{ my: 3 }}>
          <List
            row
            sx={(theme) => ({
              '--List-gap': '1.5rem',
              '--List-item-radius': '8px',
              '& > li': {
                minWidth: 200,
                flexDirection: 'column',
                alignItems: 'initial',
                py: 0,
                ...theme.variants.outlined.neutral,
              },
              [`& .${radioClasses.root}`]: {
                flexGrow: 1,
                flexDirection: 'row-reverse',
                padding: 1.5,
                mx: -1.5,
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                [`&.${radioClasses.checked}`]: {
                  borderColor: 'primary.500',
                  [`& .${radioClasses.action}`]: {
                    inset: -1,
                    border: '1px solid',
                    borderColor: theme.vars.palette.primary[500],
                  },
                },
              },
              [`& .${radioClasses.label}`]: {
                margin: 0,
              },
            })}
          >
            <ListItem>
              <Radio disabled label="Small" value="sm" />
              <Box sx={{ mt: 1.5 }}>
                <Typography level="body2">8gb/4CPUs</Typography>
                <Typography level="body2">160 GB SSD Disk</Typography>
                <Typography fontSize="xl" fontWeight="lg" my={1.5}>
                  $40/mo
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Radio label="Medium" value="md" />
              <Box sx={{ mt: 1.5 }}>
                <Typography level="body2">16gb/4CPUs</Typography>
                <Typography level="body2">320 GB SSD Disk</Typography>
                <Typography fontSize="xl" fontWeight="lg" my={1.5}>
                  $80/mo
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Radio label="Large" value="lg" />
              <Box sx={{ mt: 1.5 }}>
                <Typography level="body2">32gb/8CPUs</Typography>
                <Typography level="body2">640 GB SSD Disk</Typography>
                <Typography fontSize="xl" fontWeight="lg" my={1.5}>
                  $120/mo
                </Typography>
              </Box>
            </ListItem>
          </List>
        </RadioGroup>
        <RadioGroup
          row
          overlay
          size="lg"
          name="platform"
          sx={{
            my: 3,
            gap: 2,
            '& > div': {
              bgcolor: 'background.level1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 2,
              minWidth: 120,
            },
            [`& .${radioClasses.root}`]: {
              [`&.${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: '3px solid',
                  borderColor: 'primary.500',
                },
              },
            },
            [`& .${radioClasses.radio}`]: {
              display: 'contents',
              '& > svg': {
                zIndex: 2,
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                bgcolor: 'background.body',
                borderRadius: '50%',
              },
            },
          }}
        >
          <Sheet variant="outlined" sx={{ borderRadius: 'sm' }}>
            <Radio id="website" value="website" checkedIcon={<CheckCircle />} />
            <Avatar variant="soft" size="lg" />
            <Typography
              htmlFor="website"
              component="label"
              level="body2"
              letterSpacing="md"
              fontWeight="md"
            >
              Website
            </Typography>
          </Sheet>
          <Sheet variant="outlined" sx={{ borderRadius: 'sm' }}>
            <Radio id="documents" value="documents" checkedIcon={<CheckCircle />} />
            <Avatar variant="soft" size="lg" />
            <Typography
              htmlFor="documents"
              component="label"
              level="body2"
              letterSpacing="md"
              fontWeight="md"
            >
              Documents
            </Typography>
          </Sheet>
          <Sheet variant="outlined" sx={{ borderRadius: 'sm' }}>
            <Radio id="social-account" value="social-account" checkedIcon={<CheckCircle />} />
            <Avatar variant="soft" size="lg" />
            <Typography
              htmlFor="social-account"
              component="label"
              level="body2"
              letterSpacing="md"
              fontWeight="md"
            >
              Social Account
            </Typography>
          </Sheet>
        </RadioGroup>
        <RadioGroup
          name="capacity"
          disableIcon
          sx={{
            '--RadioGroup-gap': '0px',
            my: 3,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            maxWidth: 320,
            [`& .${radioClasses.checked}`]: {
              [`& .${radioClasses.action}`]: {
                bgcolor: 'primary.outlinedHoverBg',
              },
            },
            [`& .${radioClasses.disabled} label *`]: {
              color: 'neutral.textDisabledColor',
            },
            [`& .${radioClasses.label}`]: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              minHeight: 120,
            },
            '--Radio-action-radius': '8px',
          }}
        >
          <Radio
            value="xs"
            label={
              <React.Fragment>
                <Typography
                  fontWeight="lg"
                  display="block"
                  sx={{ '.Mui-checked &': { color: 'primary.600' } }}
                >
                  Extra Small
                </Typography>
                <Typography level="body2">10GB / 1RAM</Typography>
              </React.Fragment>
            }
            sx={{ '&.Mui-checked': { color: 'primary.outlinedColor' } }}
          />
          <Radio
            value="sm"
            label={
              <React.Fragment>
                <Typography fontWeight="lg" display="block">
                  Small
                </Typography>
                <Typography level="body2">12GB / 2RAM</Typography>
              </React.Fragment>
            }
          />
          <Radio
            value="md"
            disabled
            label={
              <React.Fragment>
                <Typography fontWeight="lg" display="block">
                  Medium
                </Typography>
                <Typography level="body2">16GB / 4RAM</Typography>
              </React.Fragment>
            }
          />
          <Radio
            value="lg"
            label={
              <React.Fragment>
                <Typography fontWeight="lg" display="block">
                  Large
                </Typography>
                <Typography level="body2">128GB / 16RAM</Typography>
              </React.Fragment>
            }
          />
        </RadioGroup>
      </Box>
    </CssVarsProvider>
  );
}
