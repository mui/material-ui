/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function GlobalVariantsPage() {
  return (
    <CssVarsProvider defaultMode="system">
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          '& > div': {
            justifySelf: 'center',
            padding: '1rem',
          },
        }}
      >
        {(['plain', 'outlined', 'soft', 'solid'] as const).map((variant) =>
          (['primary', 'neutral', 'danger', 'success', 'warning'] as const).map((color) => (
            <div>
              <Button key={`${variant}-${color}`} variant={variant} color={color}>
                Button
              </Button>
              <Button
                key={`${variant}-${color}`}
                variant={variant}
                color={color}
                disabled
                sx={{ ml: '0.5rem' }}
              >
                Disabled
              </Button>
            </div>
          )),
        )}
      </Container>
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          '& > div': {
            justifyItems: 'center',
            padding: '1rem',
          },
        }}
      >
        {(['plain', 'outlined', 'soft', 'solid'] as const).map((variant) =>
          (['primary', 'neutral', 'danger', 'success', 'warning'] as const).map((color) => (
            <div>
              <Select
                key={`${variant}-${color}`}
                placeholder="select one"
                variant={variant}
                color={color}
              >
                <Option value="1">Option 1</Option>
                <Option value="2">Option 2</Option>
                <Option value="3">Option 3</Option>
              </Select>
            </div>
          )),
        )}
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          '& > div': {
            justifyItems: 'center',
            padding: '1rem',
          },
        }}
      >
        {(['soft', 'solid'] as const).map((variant) =>
          (['primary', 'neutral', 'danger', 'success', 'warning'] as const).map((color) => (
            <div>
              <Card variant={variant} color={color} invertedColors>
                <Chip size="sm" variant="outlined" onClick={() => {}}>
                  MOST POPULAR
                </Chip>
                {/* TODO: level="text-lg" */}
                <Typography variant="soft" level="h2" fontSize="xl2" sx={{ borderRadius: 'xs' }}>
                  Unlimited
                </Typography>
                <Divider inset="none" />
                <List
                  component="div"
                  size="sm"
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    '--ListItem-radius': '20px',
                  }}
                >
                  <ListItemButton variant="soft">
                    <ListItemDecorator>
                      <Check />
                    </ListItemDecorator>
                    Virtual Credit Cards
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Check />
                    </ListItemDecorator>
                    Financial Analytics
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Check />
                    </ListItemDecorator>
                    Checking Account
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Check />
                    </ListItemDecorator>
                    API Integration
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Check />
                    </ListItemDecorator>
                    Cancel Anytime
                  </ListItemButton>
                </List>
                <Divider inset="none" />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography level="h4" sx={{ mr: 'auto' }}>
                    5.990€{' '}
                    <Typography fontSize="sm" textColor="text.tertiary">
                      / month
                    </Typography>
                  </Typography>
                  <Button endDecorator={<KeyboardArrowRight />} sx={{ borderRadius: '40px' }}>
                    Start now
                  </Button>
                </Box>
              </Card>
            </div>
          )),
        )}
      </Container>
    </CssVarsProvider>
  );
}
