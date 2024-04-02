import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import SvgIcon from '@mui/joy/SvgIcon';

export default function TabsBrowserExample() {
  const [index, setIndex] = React.useState(0);
  return (
    <Tabs
      aria-label="tabs"
      value={index}
      onChange={(event, newValue) => setIndex(newValue as number)}
    >
      <TabList
        variant="soft"
        sx={{
          [`& .${tabClasses.root}`]: {
            '&[aria-selected="true"]': {
              bgcolor: 'background.surface',
              borderColor: 'divider',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                height: 2,
                bottom: -2,
                left: 0,
                right: 0,
                bgcolor: 'background.surface',
              },
            },
          },
        }}
      >
        <Tab indicatorPlacement="top">
          <ListItemDecorator>
            <GoogleIcon />
          </ListItemDecorator>
          Google Search
        </Tab>
        <Tab indicatorPlacement="top">
          <ListItemDecorator>
            <XIcon />
          </ListItemDecorator>
          X
        </Tab>
        <Tab indicatorPlacement="top">
          <ListItemDecorator>
            <DribbbleIcon />
          </ListItemDecorator>
          Dribbble
        </Tab>
        <Tab indicatorPlacement="top">
          <ListItemDecorator>
            <ReactIcon />
          </ListItemDecorator>
          React
        </Tab>
      </TabList>
    </Tabs>
  );
}

function GoogleIcon() {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="705.6"
        height="720"
        viewBox="0 0 186.69 190.5"
        fill="currentColor"
      >
        <g transform="translate(1184.583 765.171)">
          <path
            clipPath="none"
            mask="none"
            d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
            fill="#4285f4"
          />
          <path
            clipPath="none"
            mask="none"
            d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
            fill="#34a853"
          />
          <path
            clipPath="none"
            mask="none"
            d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
            fill="#fbbc05"
          />
          <path
            d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
            fill="#ea4335"
            clipPath="none"
            mask="none"
          />
        </g>
      </svg>
    </SvgIcon>
  );
}
function XIcon() {
  return (
    <SvgIcon>
      <svg
        width="350"
        height="321"
        viewBox="0 0 350 321"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Rectangle"
          fill="#000000"
          fillRule="evenodd"
          stroke="none"
          d="M 0 321 L 350 321 L 350 0 L 0 0 Z"
        />
        <path
          id="Path"
          fill="#ffffff"
          stroke="none"
          d="M 261 25 L 307 25 L 206 140 L 324 296 L 231.399994 296 L 158.899994 201.199997 L 75.900002 296 L 29.9 296 L 136.900009 173 L 23.9 25 L 118.800003 25 L 184.300003 111.600006 Z M 244.899994 269 L 270.399994 269 L 105.400002 51 L 78 51 Z"
        />
      </svg>
    </SvgIcon>
  );
}

function DribbbleIcon() {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="800px"
        width="800px"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 291.32 291.32"
        fill="#EA4C89"
      >
        <g>
          <path d="M145.66,0.001C65.21,0.001,0,65.22,0,145.661S65.21,291.32,145.66,291.32   s145.66-65.219,145.66-145.66S226.109,0.001,145.66,0.001z M241.239,70.5c15.658,19.883,25.245,44.717,26,71.746   c-32.682-5.726-60.867-5.899-85.22-2.039c-3.086-7.083-6.263-13.965-9.522-20.629C198.616,108.836,222.04,93.168,241.239,70.5z    M224.479,53.094c-17.151,20.82-38.682,35.149-63.043,44.9c-15.595-28.895-31.635-52.975-44.453-70.554   c9.204-2.249,18.79-3.45,28.668-3.45C175.72,23.98,203.231,34.968,224.479,53.094z M93.359,35.824   c12.39,16.541,28.877,40.502,45,69.88c-34.175,9.386-72.402,11.917-111.093,12.026C35.805,81.534,60.512,51.528,93.359,35.824z    M23.997,145.65l0.1-3.933h0.655c43.352,0,86.394-2.84,124.985-14.211c2.877,5.854,5.708,11.862,8.476,18.044   c-50.771,14.885-82.425,48.295-104.119,80.085C35.377,204.252,23.997,176.258,23.997,145.65z M71.828,242.26   c20.538-30.934,49.16-61.541,95.735-74.396c10.879,27.876,19.755,58.3,24.453,90.254c-14.293,5.936-29.942,9.213-46.347,9.213   C117.911,267.331,92.312,257.982,71.828,242.26z M214.393,245.993c-4.98-29.196-13.137-57.044-22.96-82.862   c21.285-2.704,45.755-2.048,74.122,3.168C259.884,199.271,240.93,227.758,214.393,245.993z" />
        </g>
      </svg>
    </SvgIcon>
  );
}

function ReactIcon() {
  return (
    <SvgIcon htmlColor="#087ea4">
      <svg
        width="100%"
        height="100%"
        viewBox="-10.5 -9.45 21 18.9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5" />
          <ellipse rx="10" ry="4.5" transform="rotate(60)" />
          <ellipse rx="10" ry="4.5" transform="rotate(120)" />
        </g>
      </svg>
    </SvgIcon>
  );
}
