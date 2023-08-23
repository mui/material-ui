import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

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
      sx={{ mt: { md: 2 } }}
      previewSx={{
        py: 2,
      }}
      preview={
        <Paper
          variant="outlined"
          sx={(theme) => ({
            overflow: 'hidden',
            width: '100%',
            boxShadow: '0px 4px 16px rgba(61, 71, 82, 0.15)',
            bgcolor: '#fff',
            border: '1px solid',
            borderColor: 'grey.200',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.800',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.4)',
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
        <Box
          sx={{
            p: 2,
            overflow: 'auto',
            flexGrow: 1,
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
      }
    />
  );
}
