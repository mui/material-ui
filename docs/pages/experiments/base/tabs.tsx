import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab, tabClasses } from '@mui/base/Tab';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTab = styled(Tab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  box-sizing: border-box;
  margin-bottom: 16px;
  `,
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

function MoreTabs() {
  return (
    <React.Fragment>
      <Tab value="settings">Settings</Tab>
      <Tab disabled value="notifications">
        Notifications
      </Tab>
      <Tab value="nested">Nested tabs</Tab>
    </React.Fragment>
  );
}

function MoreTabPanels() {
  return (
    <React.Fragment>
      <TabPanel value="settings">Settings page</TabPanel>
      <TabPanel value="notifications">Notifications page</TabPanel>
      <TabPanel value="nested">
        <Tabs defaultValue="my-account">
          <TabsList>
            <Tab value="my-account">My account</Tab>
            <Tab value="profile">Profile</Tab>
            <Tab value="language">Language</Tab>
            <MoreTabs />
          </TabsList>
          <TabPanel value="my-account">My account page</TabPanel>
          <TabPanel value="profile">Profile page</TabPanel>
          <TabPanel value="language">Language page</TabPanel>
          <MoreTabPanels />
        </Tabs>
      </TabPanel>
    </React.Fragment>
  );
}

export default function UnstyledTabsIntroduction() {
  const [selectionFollowsFocus, setSelectionFollowsFocus] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<string | number>('profile');

  const handleTabChange = (
    event: React.SyntheticEvent | null,
    newValue: string | number | null,
  ) => {
    setSelectedTab(newValue!);
  };

  return (
    <React.Fragment>
      <label>
        <input
          type="checkbox"
          checked={selectionFollowsFocus}
          onChange={(e) => setSelectionFollowsFocus(e.target.checked)}
        />{' '}
        Selection follows focus
      </label>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        selectionFollowsFocus={selectionFollowsFocus}
      >
        <StyledTabsList>
          <StyledTab value="my-account">My account</StyledTab>
          <StyledTab value="profile">Profile</StyledTab>
          <StyledTab value="language">Language</StyledTab>
          <MoreTabs />
        </StyledTabsList>
        <StyledTabPanel value="my-account">My account page</StyledTabPanel>
        <StyledTabPanel value="profile">Profile page</StyledTabPanel>
        <StyledTabPanel value="language">Language page</StyledTabPanel>
        <MoreTabPanels />

        <StyledTabsList>
          <StyledTab value="my-account">My account</StyledTab>
          <StyledTab value="profile">Profile</StyledTab>
          <StyledTab value="language">Language</StyledTab>
          <MoreTabs />
        </StyledTabsList>
      </Tabs>
    </React.Fragment>
  );
}
