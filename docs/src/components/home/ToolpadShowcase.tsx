import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShowcaseContainer, { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import MoreInfoBox from 'docs/src/components/action/MoreInfoBox';
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
              src="/static/branding/toolpad/hero-1.png"
              alt="Toolpad user management app"
              loading="lazy"
              height={411}
              sx={{ width: { xs: 'auto', sm: '100%' } }}
            />
          </Box>
        </Paper>
      }
      code={
        <React.Fragment>
          <ShowcaseCodeWrapper maxHeight={260}>
            <HighlightedCode copyButtonHidden code={code} language="jsx" plainStyle />
          </ShowcaseCodeWrapper>
          <MoreInfoBox
            primaryBtnLabel="Start with Toolpad"
            primaryBtnHref={ROUTES.toolpadStudioDocs}
            secondaryBtnLabel="Learn more about why Toolpad exists"
            secondaryBtnHref={ROUTES.toolpadWhy}
          />
        </React.Fragment>
      }
    />
  );
}
