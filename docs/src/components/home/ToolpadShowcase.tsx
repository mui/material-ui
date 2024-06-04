import * as React from 'react';
import { alpha, keyframes, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import ShowcaseContainer, { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import MoreInfoBox from 'docs/src/components/action/MoreInfoBox';
import ROUTES from 'docs/src/route';

const tabs = [
  {
    code: `
apiVersion: v1
kind: page
spec:
  title: Default page
  alias:
    - CZndx3v
  content:
    - component: DataGrid
      name: dataGrid
      props:
        dataProviderId: dataProvider.ts:default
        columns:
        - field: firstname
          type: string
        - field: lastname
          type: string
        rowsSource: dataProvider
    - component: codeComponent.CustomComponent
      name: mapCustom
  `,
    language: 'yaml',
    tab: 'page.yaml',
    position: {
      top: '55%',
      left: '7.5%',
    },
    popoverContent:
      'Configure your app locally in yaml files. Then, changes in the visual editor are synced to the files, and vice versa. Version control them however you want.',
  },
  {
    code: `
import { createDataProvider } from "@toolpad/studio/server";
import db from "../db";

export default createDataProvider({
  async getRecords({ paginationModel: { start, pageSize } }) {
    return {
      records: await db.query("SELECT * FROM USERS"),
    };
  },
});`,
    language: 'tsx',
    tab: 'dataProvider.ts',
    position: {
      top: '20%',
      left: '60%',
    },
    popoverContent:
      'Write serverless functions that have access to your project code. Use your own ORM, database connections, and server-side secrets. Toolpad handles linking your data with UI components.',
  },
  {
    code: `
import * as React from "react";
import { createComponent } from "@toolpad/studio/browser";
import * as L from "leaflet";

function Leaflet({ lat, long, zoom }: LeafletProps) {
  const root: any = React.useRef(null);
  return (
    <div ref={root} style={{ height: 400 }} />
  );
}

export default createComponent(Leaflet, {
  argTypes: {
    lat: { type: "number", }
});
    `,
    language: 'tsx',
    tab: 'mapComponent.tsx',
    position: {
      top: '64%',
      left: '70%',
    },
    popoverContent:
      'Use your own React components and compose them with drag and drop in the canvas. Use Toolpad Sutido to edit them visually.',
  },
];

const PulsingButton = styled('button')(({ theme }) => {
  const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 ${alpha(theme.palette.primary.main, 0.7)};
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 4px ${alpha(theme.palette.primary.main, 0)};
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 ${alpha(theme.palette.primary.main, 0)};
  }
`;

  return {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.primary[200], 0.5),
    border: `2px solid ${theme.palette.primary[300]}`,
    // backgroundColor: theme.palette.primary.main,
    // border: 'none',
    cursor: 'pointer',
    animation: `${pulse} 2s infinite`,
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  };
});

interface PopoverContent {
  anchorEl: HTMLElement | null;
  content: string;
}

export default function ToolpadShowcase() {
  const [popoverState, setPopoverState] = React.useState<PopoverContent>({
    anchorEl: null,
    content: '',
  });

  const [codeState, setCodeState] = React.useState<string>(tabs[0].code);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setPopoverState({ anchorEl: event.currentTarget, content: tabs[index].popoverContent });
    setCodeState(tabs[index].code);
  };

  const handleClose = () => {
    setPopoverState({ anchorEl: null, content: '' });
  };

  const firstButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (firstButtonRef.current) {
      setPopoverState({
        anchorEl: firstButtonRef.current,
        content: tabs[0].popoverContent,
      });
    }
  }, []);

  const open = Boolean(popoverState.anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ShowcaseContainer
      preview={
        <Paper
          variant="outlined"
          sx={(theme) => ({
            width: '100%',
            overflow: 'clip',
            boxShadow: `0 4px 8px ${alpha(theme.palette.primaryDark[300], 0.3)}`,
            bgcolor: '#fff',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: '8px',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.800',
              boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.3)}`,
            }),
          })}
        >
          <Box sx={{ height: 300 }}>
            <Box
              component="img"
              src="/static/branding/toolpad/hero-2.png"
              alt="Toolpad user management app"
              loading="lazy"
              height={400}
              sx={{
                width: { xs: 'auto', sm: '100%' },
                objectFit: 'cover',
                objectPosition: 'left',
                mt: '-1px',
              }}
            />
            {tabs.map((tab, index) => (
              <PulsingButton
                key={index}
                ref={index === 0 ? firstButtonRef : null}
                style={tab.position}
                onClick={(e) => handleClick(e, index)}
              />
            ))}
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={popoverState.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ mt: '4px' }}
          >
            <Box sx={{ p: 1.5, maxWidth: 250, fontSize: '.75rem' }}>{popoverState.content}</Box>
          </Popover>
        </Paper>
      }
      code={
        <React.Fragment>
          <ShowcaseCodeWrapper maxHeight={280}>
            <HighlightedCode copyButtonHidden code={codeState} language="jsx" plainStyle />
          </ShowcaseCodeWrapper>
          <MoreInfoBox
            primaryBtnLabel="Start using Toolpad"
            primaryBtnHref={ROUTES.toolpadLandingPage}
            secondaryBtnLabel="Learn more about why to use Toolpad"
            secondaryBtnHref={ROUTES.toolpadWhy}
          />
        </React.Fragment>
      }
    />
  );
}
