import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

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
  variant: ['outlined', 'light', 'contained'],
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
                      <Typography level="body3" ml="28px" mt={0.5} color="warning.400">
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
            <RadioGroup
              aria-labelledby="plan"
              sx={{
                '& .MuiRadio-root': { position: 'initial' },
              }}
            >
              <List
                component="div"
                sx={{
                  '--List-item-radius': '8px',
                  '--Radio-action-radius': 'var(--List-item-radius)',
                }}
              >
                <ListItem>
                  <Radio
                    value="startup"
                    label={
                      <Typography component="span" lineHeight="inherit" fontWeight="md">
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
                      <Typography component="span" lineHeight="inherit" fontWeight="md">
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
                      <Typography component="span" lineHeight="inherit" fontWeight="md">
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
              sx={{
                flexDirection: 'row',
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
                '& .MuiRadio-root': {
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
              variant="light"
              sx={{ p: 2, display: 'flex', gap: 2, my: 2, borderRadius: '18px' }}
            >
              <Typography level="body3" color="text.primary">
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
            <RadioGroup name="display" aria-labelledby="display-heading">
              <List
                component="div"
                sx={{
                  '--List-gap': '1rem',
                  '--Radio-action-radius': '18px',
                  '& .MuiListItem-root': { borderRadius: '18px', padding: '14px' },
                  '& .MuiRadio-root': {
                    position: 'initial',
                    fontWeight: 'md',
                    flexGrow: 1,
                    '&.Mui-checked': {
                      '& .MuiRadio-action': {
                        border: '2px solid',
                        borderColor: 'primary.500',
                        boxShadow: 'md',
                      },
                    },
                  },
                  '& .MuiRadio-radio': { display: 'contents' },
                  '& .MuiRadio-action': (theme) => theme.variants.outlined.neutral,
                  '& .MuiRadio-label': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                }}
              >
                <ListItem>
                  <Radio
                    checkedIcon={null}
                    uncheckedIcon={null}
                    label={
                      <React.Fragment>
                        <span>Standard glass</span>
                        <Typography component="span" fontWeight="sm" textAlign="right">
                          From $1599
                          <br />
                          <span aria-hidden="true">or $133.25/mo. for 12 mo.*</span>
                        </Typography>
                      </React.Fragment>
                    }
                    value="1"
                  />
                </ListItem>
                <ListItem>
                  <Radio
                    checkedIcon={null}
                    uncheckedIcon={null}
                    label={
                      <React.Fragment>
                        <span>Nano-texture glass</span>
                        <Typography component="span" fontWeight="sm" textAlign="right">
                          From $1899
                          <br />
                          <span aria-hidden="true">or $158.25/mo. for 12 mo.*</span>
                        </Typography>
                      </React.Fragment>
                    }
                    value="2"
                  />
                </ListItem>
              </List>
            </RadioGroup>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
