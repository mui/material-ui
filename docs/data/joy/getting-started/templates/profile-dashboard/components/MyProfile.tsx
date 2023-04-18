/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip, { chipClasses } from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import LinearProgress from '@mui/joy/LinearProgress';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export default function MyProfile() {
  return (
    <Sheet
      sx={{
        bgcolor: 'background.body',
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        My profile
      </Typography>
      <Tabs
        defaultValue={0}
        sx={{
          bgcolor: 'background.body',
          '--Tab-height': '48px',
        }}
      >
        <Box
          sx={{
            '--_shadow-height': '16px',
            height: 0,
            position: 'sticky',
            top: 'calc(var(--Tab-height) - var(--main-paddingTop) - (var(--_shadow-height) / 2))',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: 'var(--_shadow-height)',
              background:
                'radial-gradient(closest-side, rgba(0 0 0 / 0.12), transparent 100%)',
            }}
          />
        </Box>
        <TabList
          variant="plain"
          size="sm"
          sx={(theme) => ({
            '--List-padding': '0px',
            '--ListItem-minHeight': 'var(--Tab-height)',
            '--Chip-minHeight': '20px',
            bgcolor: 'background.body',
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
            position: 'sticky',
            top: 'calc(-1 * var(--main-paddingTop))',
            zIndex: 10,
            width: '100%',
            overflow: 'auto hidden',
            alignSelf: 'flex-start',
            borderRadius: 0,
            [`& .${tabClasses.root}`]: {
              '&:first-of-type': {
                ml: 'calc(-1 * var(--ListItem-paddingX))',
              },
              bgcolor: 'transparent',
              boxShadow: 'none',
              flex: 'none',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: 0,
                  left: 'var(--ListItem-paddingLeft)',
                  right: 'var(--ListItem-paddingRight)',
                  height: '2px',
                  bgcolor: 'primary.500',
                },
                [`& .${chipClasses.root}`]: theme.variants.solid.primary,
              },
            },
          })}
        >
          <Tab value={0}>My detail</Tab>
          <Tab value={1}>Profile</Tab>
          <Tab value={2}>Password</Tab>
          <Tab value={3}>
            Team{' '}
            <Chip size="sm" variant="soft" color="neutral" sx={{ ml: 1 }}>
              2
            </Chip>
          </Tab>
          <Tab value={4}>Plan</Tab>
          <Tab value={5}>
            Billing{' '}
            <Chip size="sm" variant="soft" color="neutral" sx={{ ml: 1 }}>
              4
            </Chip>
          </Tab>
          <Tab value={6}>Email</Tab>
          <Tab value={7}>Notifications</Tab>
          <Tab value={8}>Integrations</Tab>
          <Tab value={9}>API</Tab>
        </TabList>
        <Box
          sx={{
            pt: 3,
            pb: 10,
            display: 'grid',
            gridTemplateColumns: {
              xs: '100%',
              sm: 'minmax(120px, 30%) 1fr',
              lg: '280px 1fr 208px',
            },
            columnGap: { xs: 2, sm: 3, md: 4 },
            rowGap: { xs: 2, sm: 2.5 },
            '& > hr': {
              gridColumn: '1/-1',
            },
          }}
        >
          <Box>
            <Typography fontWeight="md">Personal info</Typography>
            <Typography level="body3" sx={{ whiteSpace: { sm: 'nowrap' } }}>
              Update your photo and personal details here.
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'contents', lg: 'block' } }} />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignSelf: 'center',
              justifySelf: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            <Button variant="outlined" color="neutral" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </Box>

          <Divider role="presentation" />

          <FormLabel sx={{ display: { xs: 'none', sm: 'block' } }}>Name</FormLabel>
          <Box sx={{ display: { xs: 'contents', sm: 'flex' }, gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: 'none' } }}>First name</FormLabel>
              <Input placeholder="first name" defaultValue="Siriwat" />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: 'none' } }}>Last name</FormLabel>
              <Input placeholder="last name" defaultValue="K." />
            </FormControl>
          </Box>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              startDecorator={<i data-feather="mail" />}
              placeholder="email"
              defaultValue="siriwatk@test.com"
            />
          </FormControl>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Your photo</FormLabel>
            <FormHelperText>This will be displayed on your profile.</FormHelperText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2.5,
            }}
          >
            <Avatar
              size="lg"
              src="/static/images/avatar/1.jpg"
              sx={{ '--Avatar-size': '64px' }}
            />
            <Card
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
                px: 3,
                flexGrow: 1,
              }}
            >
              <Box sx={{ p: 1, bgcolor: 'background.level1', borderRadius: '50%' }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'background.level2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i data-feather="upload-cloud" />
                </Box>
              </Box>
              <Typography level="body2" textAlign="center">
                <Link component="button" overlay>
                  Click to upload
                </Link>{' '}
                or drag and drop
                <br /> SVG, PNG, JPG or GIF (max. 800x400px)
              </Typography>
            </Card>
          </Box>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Role</FormLabel>
            <Input defaultValue="UI Developer" />
          </FormControl>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Contry</FormLabel>
            <Autocomplete
              defaultValue={{ label: 'Thailand', code: 'TH' }}
              options={[
                { label: 'United States', code: 'US' },
                { label: 'Thailand', code: 'TH' },
              ]}
              renderOption={(props, option) => (
                <AutocompleteOption {...props}>
                  <ListItemDecorator>
                    <AspectRatio
                      ratio="1"
                      sx={{ minWidth: 20, borderRadius: '50%' }}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                    </AspectRatio>
                  </ListItemDecorator>
                  {option.label}
                </AutocompleteOption>
              )}
              slotProps={{}}
            />
          </FormControl>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Timezone</FormLabel>
            <Select startDecorator={<i data-feather="clock" />} defaultValue="1">
              <Option value="1">
                Indochina Time (Bangkok){' '}
                <Typography textColor="text.tertiary" ml={0.5}>
                  — GMT+07:00
                </Typography>
              </Option>
              <Option value="2">
                Indochina Time (Ho Chi Minh City){' '}
                <Typography textColor="text.tertiary" ml={0.5}>
                  — GMT+07:00
                </Typography>
              </Option>
            </Select>
          </FormControl>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Bio</FormLabel>
            <FormHelperText>Write a short introduction</FormHelperText>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Select defaultValue="1" sx={{ minWidth: 160 }}>
                <Option value="1">Normal text</Option>
                <Option value="2" sx={{ fontFamily: 'code' }}>
                  Code text
                </Option>
              </Select>
              <IconButton
                variant="plain"
                color="neutral"
                sx={{ '--Icon-fontSize': '16px' }}
              >
                <i data-feather="bold" />
              </IconButton>
              <IconButton
                variant="plain"
                color="neutral"
                sx={{ '--Icon-fontSize': '16px' }}
              >
                <i data-feather="italic" />
              </IconButton>
              <IconButton
                variant="plain"
                color="neutral"
                sx={{ '--Icon-fontSize': '16px' }}
              >
                <i data-feather="link-2" />
              </IconButton>
              <IconButton
                variant="plain"
                color="neutral"
                sx={{ '--Icon-fontSize': '16px' }}
              >
                <i data-feather="list" />
              </IconButton>
            </Box>
            <Textarea
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much Javascript."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Box>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Portfolio projects</FormLabel>
            <FormHelperText>Share a few snippets of your work.</FormHelperText>
          </Box>
          <Stack useFlexGap spacing={1.5}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
                px: 3,
                flexGrow: 1,
              }}
            >
              <Box sx={{ p: 1, bgcolor: 'background.level1', borderRadius: '50%' }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'background.level2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i data-feather="upload-cloud" />
                </Box>
              </Box>
              <Typography level="body2" textAlign="center">
                <Link component="button" overlay>
                  Click to upload
                </Link>{' '}
                or drag and drop
                <br /> SVG, PNG, JPG or GIF (max. 800x400px)
              </Typography>
            </Card>
            <Card
              variant="outlined"
              orientation="horizontal"
              sx={{
                gap: 1.5,
                alignItems: 'flex-start',
                borderColor: 'primary.500',
              }}
            >
              <AspectRatio
                ratio="1"
                variant="soft"
                color="primary"
                sx={{
                  minWidth: 32,
                  borderRadius: '50%',
                  '--Icon-fontSize': '16px',
                }}
              >
                <div>
                  <i data-feather="file" />
                </div>
              </AspectRatio>
              <CardContent>
                <Typography fontSize="sm">Tech design requirements.pdf</Typography>
                <Typography level="body3">200 KB</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    value={100}
                    determinate
                    variant="plain"
                    sx={{ bgcolor: 'neutral.softBg' }}
                  />
                  <Typography fontSize="xs">100%</Typography>
                </Box>
              </CardContent>
              <AspectRatio
                ratio="1"
                variant="solid"
                color="primary"
                sx={{
                  minWidth: 20,
                  borderRadius: '50%',
                  '--Icon-fontSize': '14px',
                }}
              >
                <div>
                  <i data-feather="check" />
                </div>
              </AspectRatio>
            </Card>
            <Card
              variant="outlined"
              orientation="horizontal"
              sx={{
                gap: 1.5,
                alignItems: 'flex-start',
              }}
            >
              <AspectRatio
                ratio="1"
                variant="soft"
                color="primary"
                sx={{
                  minWidth: 32,
                  borderRadius: '50%',
                  '--Icon-fontSize': '16px',
                }}
              >
                <div>
                  <i data-feather="film" />
                </div>
              </AspectRatio>
              <CardContent>
                <Typography fontSize="sm">
                  Dashboard prototype recording.mp4
                </Typography>
                <Typography level="body3">16 MB</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="plain"
                    value={40}
                    determinate
                    sx={{ bgcolor: 'neutral.softBg' }}
                  />
                  <Typography fontSize="xs">40%</Typography>
                </Box>
              </CardContent>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ mt: -1, mr: -1 }}
              >
                <i data-feather="trash-2" />
              </IconButton>
            </Card>
            <Card
              variant="outlined"
              orientation="horizontal"
              sx={{
                gap: 1.5,
                alignItems: 'flex-start',
              }}
            >
              <AspectRatio
                ratio="1"
                variant="soft"
                color="primary"
                sx={{
                  minWidth: 32,
                  borderRadius: '50%',
                  '--Icon-fontSize': '16px',
                }}
              >
                <div>
                  <i data-feather="upload-cloud" />
                </div>
              </AspectRatio>
              <CardContent>
                <Typography fontSize="sm">
                  Dashboard prototype recording.mp4
                </Typography>
                <Typography level="body3">16 MB</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="plain"
                    value={80}
                    determinate
                    sx={{ bgcolor: 'neutral.softBg' }}
                  />
                  <Typography fontSize="xs">80%</Typography>
                </Box>
              </CardContent>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ mt: -1, mr: -1 }}
              >
                <i data-feather="trash-2" />
              </IconButton>
            </Card>
          </Stack>

          <Divider role="presentation" />

          <Box
            sx={{
              gridColumn: '1/-1',
              justifySelf: 'flex-end',
              display: 'flex',
              gap: 1,
            }}
          >
            <Button variant="outlined" color="neutral" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </Box>
        </Box>
      </Tabs>
    </Sheet>
  );
}
