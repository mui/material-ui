import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import StylingInfo from 'docs/src/components/action/StylingInfo';
import ROUTES from 'docs/src/route';

const code = `import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany();
}

export async function addUser(user: Prisma.UserCreateInput) {
  return prisma.user.create({ data: user });
}

export async function updateUser(id: number) {
  return prisma.user.update({ where: { id } });
}

export async function deleteUser(id: number) {
  return prisma.customer.user({ where: { id } });
}`;

export default function DataTable() {
  return (
    <ShowcaseContainer
      preview={
        <Paper
          variant="outlined"
          sx={(theme) => ({
            width: '100%',
            overflow: 'clip',
            boxShadow: `0 4px 12px ${alpha(theme.palette.primaryDark[300], 0.3)}`,
            bgcolor: '#fff',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: '8px',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.800',
              boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}`,
            }),
          })}
        >
          <Box sx={{ height: 300 }}>
            <img
              src="/static/branding/toolpad/hero-1.png"
              alt="Toolpad user management app"
              loading="lazy"
              height={411}
              width="100%"
            />
          </Box>
        </Paper>
      }
      code={
        <React.Fragment>
          <Box
            sx={{
              maxHeight: 320,
              position: 'relative',
              overflow: 'clip',
              overflowY: 'scroll',
              flexGrow: 1,
              pb: 16,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '& pre': {
                bgcolor: 'transparent !important',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            }}
          >
            <HighlightedCode
              copyButtonHidden
              component={MarkdownElement}
              code={code}
              language="jsx"
            />
          </Box>
          <StylingInfo
            title="Own the styling!"
            description="You can also start by using Googles Material Design."
            primaryBtnLabel="Start with Material UI"
            primaryBtnHref={ROUTES.productAdvanced}
            secondaryBtnLabel="Learn more about the Core libraries"
            secondaryBtnHref={ROUTES.productAdvanced}
          />
        </React.Fragment>
      }
    />
  );
}
