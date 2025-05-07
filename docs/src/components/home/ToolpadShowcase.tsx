import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShowcaseContainer, { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import MoreInfoBox from 'docs/src/components/action/MoreInfoBox';
import ROUTES from 'docs/src/route';

const ToolpadCoreShowcase = React.lazy(() => import('./ToolpadCoreShowcaseDemo'));

const demoCode = `<AppProvider navigation={[
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  }
  // ...
]}>
  <DashboardLayout>
    <PageContainer>
      {/* ... */}
    </PageContainer>
  </DashboardLayout>
</AppProvider>`;

interface TabContainerProps {
  isDemo: boolean;
  children: React.ReactNode;
}

function TabContainer({ isDemo, children }: TabContainerProps) {
  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        width: '100%',
        maxWidth: '100%',
        height: 260,
        display: 'flex',
        overflow: isDemo ? 'auto' : 'clip',
        bgcolor: '#FFF',
        borderRadius: '8px',
        boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`,
        borderColor: 'grey.200',
        ...(isDemo && { scrollbarGutter: 'stable' }),
      })}
    >
      {children}
    </Paper>
  );
}

function ToolpadCoreShowcaseDemo() {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <p>Loading...</p>
        </div>
      }
    >
      <ToolpadCoreShowcase />
    </React.Suspense>
  );
}

export default function ToolpadShowcase() {
  return (
    <ShowcaseContainer
      noPadding
      preview={
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2 }}>
            <TabContainer isDemo>
              <ToolpadCoreShowcaseDemo />
            </TabContainer>
          </Box>
        </Box>
      }
      code={
        <React.Fragment>
          <ShowcaseCodeWrapper maxHeight={250}>
            <div>
              <HighlightedCode copyButtonHidden code={demoCode} language="tsx" plainStyle />
            </div>
          </ShowcaseCodeWrapper>
          <MoreInfoBox
            primaryBtnLabel={`Start using Toolpad Core`}
            primaryBtnHref={ROUTES.toolpadLandingPage}
            secondaryBtnLabel={`Learn more about Toolpad Core`}
            secondaryBtnHref={ROUTES.toolpadCoreDocs}
          />
        </React.Fragment>
      }
    />
  );
}
