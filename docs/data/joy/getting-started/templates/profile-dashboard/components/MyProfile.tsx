import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip, { chipClasses } from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
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
import DropZone from './DropZone';
import FileUpload from './FileUpload';
import CountrySelector from './CountrySelector';
import EditorToolbar from './EditorToolbar';

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
            top: 'calc(var(--Tab-height) - var(--main-paddingTop, 0px) + var(--Header-height, 0px) - (var(--_shadow-height) / 2))',
            zIndex: 1,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              height: 'var(--_shadow-height)',
              background:
                'radial-gradient(closest-side, rgba(0 0 0 / 0.12), transparent 100%)',
            },
          }}
        />
        <TabList
          variant="plain"
          size="sm"
          sx={(theme) => ({
            '--List-padding': '0px',
            '--ListItem-minHeight': 'var(--Tab-height)',
            '--Chip-minHeight': '20px',
            '--_TabList-bg': theme.vars.palette.background.body,
            backgroundColor: 'var(--_TabList-bg)',
            boxShadow: `inset 0 -1px 0 0 ${theme.vars.palette.divider}`,
            position: 'sticky',
            top: 'calc(-1 * (var(--main-paddingTop, 0px) - var(--Header-height, 0px)))',
            zIndex: 10,
            width: '100%',
            overflow: 'auto hidden',
            alignSelf: 'flex-start',
            borderRadius: 0,
            scrollSnapType: 'inline',
            '&::after': {
              pointerEvents: 'none',
              display: { xs: 'block', sm: 'none' },
              content: '""',
              position: 'sticky',
              top: 0,
              width: 40,
              flex: 'none',
              zIndex: 1,
              right: 0,
              borderBottom: '1px solid transparent',
              background: `linear-gradient(to left, var(--_TabList-bg), rgb(0 0 0 / 0))`,
              backgroundClip: 'content-box',
            },
            '&::-webkit-scrollbar': {
              width: 0,
              display: 'none',
            },
            [`& .${tabClasses.root}`]: {
              '&:first-of-type': {
                ml: 'calc(-1 * var(--ListItem-paddingX))',
              },
              scrollSnapAlign: 'start',
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
          <Tab value={0}>Account settings</Tab>
          <Tab value={1}>
            Team{' '}
            <Chip size="sm" variant="soft" color="neutral" sx={{ ml: 1 }}>
              2
            </Chip>
          </Tab>
          <Tab value={2}>Plan</Tab>
          <Tab value={3}>
            Billing{' '}
            <Chip size="sm" variant="soft" color="neutral" sx={{ ml: 1 }}>
              4
            </Chip>
          </Tab>
          <Tab value={4}>Notifications</Tab>
          <Tab value={5}>Integrations</Tab>
          <Tab value={6}>API</Tab>
        </TabList>
        <Box
          sx={{
            pt: 3,
            pb: 10,
            display: 'grid',
            gridTemplateColumns: {
              xs: '100%',
              sm: 'minmax(120px, 30%) 1fr',
              lg: '280px 1fr minmax(120px, 208px)',
            },
            columnGap: { xs: 2, sm: 3, md: 4 },
            rowGap: { xs: 2, sm: 2.5 },
            '& > hr': {
              gridColumn: '1/-1',
            },
          }}
        >
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
            <DropZone />
          </Box>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Role</FormLabel>
            <Input defaultValue="UI Developer" />
          </FormControl>

          <Divider role="presentation" />

          <CountrySelector />

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
            <FormHelperText>Write a short introduction.</FormHelperText>
          </Box>
          <Box>
            <EditorToolbar />
            <Textarea
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
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
            <DropZone />

            <FileUpload
              fileName="Tech design requirements.pdf"
              fileSize="200 KB"
              progress={100}
            />

            <FileUpload
              icon={<i data-feather="film" />}
              fileName="Dashboard prototype recording.mp4"
              fileSize="16 MB"
              progress={40}
            />

            <FileUpload
              icon={<i data-feather="upload-cloud" />}
              fileName="Dashboard prototype FINAL.fig"
              fileSize="4.2 MB"
              progress={80}
            />
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
