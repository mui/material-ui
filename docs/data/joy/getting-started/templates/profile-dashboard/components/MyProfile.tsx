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
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

export default function MyProfile() {
  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link underline="none" color="neutral" href="#some-link" aria-label="Home">
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Users
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            My Profile
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography
        level="h2"
        sx={{
          display: 'flex',
          mt: 1,
          mb: 4,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        My profile
      </Typography>

      <Tabs
        variant="outlined"
        aria-label="Pricing plan"
        defaultValue={0}
        sx={{
          borderRadius: 'md',
          overflow: 'auto',
        }}
      >
        <TabList
          disableUnderline
          tabFlex={1}
          sx={{
            [`& .${tabClasses.root}`]: {
              fontSize: 'sm',
              fontWeight: 'lg',
              [`&[aria-selected="true"]`]: {
                bgcolor: 'background.surface',
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-4px',
              },
            },
          }}
        >
          <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} value={0}>
            Settings
          </Tab>
          <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} value={1}>
            Team
          </Tab>
          <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} value={2}>
            Plan
          </Tab>
          <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} value={3}>
            Billing
          </Tab>
        </TabList>
        <Box
          sx={{
            p: 4,
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
              <Input size="sm" placeholder="first name" defaultValue="Siriwat" />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: 'none' } }}>Last name</FormLabel>
              <Input size="sm" placeholder="last name" defaultValue="K." />
            </FormControl>
          </Box>
          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Email</FormLabel>
            <Input
              size="sm"
              type="email"
              startDecorator={<EmailRoundedIcon />}
              placeholder="email"
              defaultValue="siriwatk@test.com"
            />
          </FormControl>
          <Divider role="presentation" />
          <div>
            <FormLabel>Your photo</FormLabel>
            <FormHelperText>This will be displayed on your profile.</FormHelperText>
          </div>
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
            <Input size="sm" defaultValue="UI Developer" />
          </FormControl>
          <Divider role="presentation" />
          <CountrySelector />
          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Timezone</FormLabel>
            <Select
              size="sm"
              startDecorator={<AccessTimeFilledRoundedIcon />}
              defaultValue="1"
            >
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
          <div>
            <FormLabel>Bio</FormLabel>
            <FormHelperText>Write a short introduction.</FormHelperText>
          </div>
          <div>
            <EditorToolbar />
            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </div>
          <Divider role="presentation" />
          <div>
            <FormLabel>Portfolio projects</FormLabel>
            <FormHelperText>Share a few snippets of your work.</FormHelperText>
          </div>
          <Stack useFlexGap spacing={1.5}>
            <DropZone />
            <FileUpload
              icon={<InsertDriveFileRoundedIcon />}
              fileName="Tech design requirements.pdf"
              fileSize="200 KB"
              progress={100}
            />
            <FileUpload
              icon={<VideocamRoundedIcon />}
              fileName="Dashboard prototype recording.mp4"
              fileSize="16 MB"
              progress={40}
            />
            <FileUpload
              icon={<InsertDriveFileRoundedIcon />}
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
    </Box>
  );
}
