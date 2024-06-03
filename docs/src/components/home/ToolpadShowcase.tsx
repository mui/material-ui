import * as React from 'react';
import { alpha, keyframes, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import ShowcaseContainer, { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

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
      'Your application configuration is stored locally in yaml files. Changes in the visual editor are synced to the files, and vice versa. You can version control them however you want.',
  },
  {
    code: `
    /**
 * Toolpad data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

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
      top: '30%',
      left: '40%',
    },
    popoverContent:
      'You can write serverless functions that have access to your project code. Use your own ORM, database connections, serverside secrets. Toolpad will handle linking your data with UI components.',
  },
  {
    code: `
// See: https://mui.com/toolpad/studio/how-to-guides/map-display/
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
      top: '80%',
      left: '50%',
    },
    popoverContent:
      'Bring your own react components, compose them with drag and drop in the canvas. Define your own properties to edit visually in Toolpad Studio',
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
    box-shadow: 0 0 0 10px ${alpha(theme.palette.primary.main, 0)};
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 ${alpha(theme.palette.primary.main, 0)};
  }
`;

  return {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    cursor: 'pointer',
    animation: `${pulse} 1.5s infinite`,
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
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
            borderRadius: '6px',
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
              sx={{ width: { xs: 'auto', sm: '100%' } }}
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
          >
            <Box sx={{ p: 2, maxWidth: 250, fontSize: 12 }}>{popoverState.content}</Box>
          </Popover>
        </Paper>
      }
      code={
        <ShowcaseCodeWrapper maxHeight={300}>
          <HighlightedCode copyButtonHidden code={codeState} language="jsx" plainStyle />
        </ShowcaseCodeWrapper>
      }
    />
  );
}
