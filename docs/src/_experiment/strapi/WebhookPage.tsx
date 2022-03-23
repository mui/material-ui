/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/joy/Link';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import MainNav from './components/MainNav';
import SettingNav from './components/SettingNav';

export default function WebhookPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.level1',
        display: 'flex',
        my: '5rem',
      }}
    >
      <MainNav activeIndex={6} />
      <SettingNav activeIndex={3} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Box
          sx={{
            px: '3.5rem',
            pt: '2.25rem',
            pb: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography level="header1">Webhooks</Typography>
            <Typography color="text.tertiary">Get POST changes notifications</Typography>
          </div>
          <Button startIcon={<Add />} sx={{ alignSelf: 'center' }}>
            Add new webhook
          </Button>
        </Box>
        <Box sx={{ px: '3.5rem', pb: '1rem', width: 400 }}>
          <Sheet>
            <Input
              placeholder="Search for an entry"
              startDecorator={<Search fontSize="md" sx={{ color: 'text.primary' }} />}
              sx={{ '--Input-minHeight': '2rem' }}
            />
          </Sheet>
        </Box>
        <Box sx={{ px: '3.5rem', pb: '1rem' }}>
          <Sheet
            sx={{
              display: 'grid',
              gridTemplateColumns: 'min-content minmax(100px, 20%) 1fr 12% min-content',
              boxShadow: 'sm',
              borderRadius: 'xs',
              '& > div': {
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              },
              '& > div:nth-child(6n + 1)': {
                pl: '24px',
                py: '18px',
                pr: '18px',
              },
              '& > div:nth-child(6n + 5)': {
                pr: '1rem',
              },
            }}
          >
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Link component="button" variant="light" level="tableLabel">
                Name <ArrowDropDown />
              </Link>
            </Box>
            <Box>
              <Link component="button" color="neutral" level="tableLabel">
                URL <ArrowDropDown />
              </Link>
            </Box>
            <Box>
              <Link component="button" color="neutral" level="tableLabel">
                Status <ArrowDropDown />
              </Link>
            </Box>
            <Box />
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Typography level="bodyHighlight">Gatsby</Typography>
            </Box>
            <Box>
              <Typography>https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/</Typography>
            </Box>
            <Box>
              <Switch checked />{' '}
              <Typography level="smallText" color="success.textColor">
                Enabled
              </Typography>
            </Box>
            <Box>
              <Button variant="text" color="neutral">
                <Edit fontSize="md" />
              </Button>
              <Button variant="text" color="neutral">
                <Delete fontSize="md" />
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Typography level="bodyHighlight">Netlify</Typography>
            </Box>
            <Box>
              <Typography>https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/</Typography>
            </Box>
            <Box>
              <Switch />{' '}
              <Typography level="smallText" color="danger.textColor">
                Disabled
              </Typography>
            </Box>
            <Box>
              <Button variant="text" color="neutral">
                <Edit fontSize="md" />
              </Button>
              <Button variant="text" color="neutral">
                <Delete fontSize="md" />
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Typography level="bodyHighlight">Blog</Typography>
            </Box>
            <Box>
              <Typography>https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/</Typography>
            </Box>
            <Box>
              <Switch />{' '}
              <Typography level="smallText" color="danger.textColor">
                Disabled
              </Typography>
            </Box>
            <Box>
              <Button variant="text" color="neutral">
                <Edit fontSize="md" />
              </Button>
              <Button variant="text" color="neutral">
                <Delete fontSize="md" />
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Button
              variant="light"
              startIcon={
                <Box
                  sx={{
                    borderRadius: '50%',
                    display: 'inline-flex',
                    p: '0.25rem',
                    bgcolor: 'primary.lightHoverBg',
                  }}
                >
                  <Add />
                </Box>
              }
              sx={{
                '--Button-iconOffsetStep': 0,
                '--Button-gap': '1rem',
                p: '20px',
                justifyContent: 'flex-start',
                gridColumn: '1 / -1',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              Add new webhook
            </Button>
          </Sheet>
        </Box>
      </Box>
    </Box>
  );
}
