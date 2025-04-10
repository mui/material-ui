import * as React from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Section from 'docs/src/layouts/Section';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  MATERIAL_UI_CUSTOMERS,
  BASE_UI_CUSTOMERS,
  JOY_UI_CUSTOMERS,
  DATA_GRID_CUSTOMERS,
  DATE_TIME_CUSTOMERS,
  CHARTS_CUSTOMERS,
  TREE_VIEW_CUSTOMERS,
  TOOLPAD_CUSTOMERS,
} from './customerData';
import SectionHeadline from '../typography/SectionHeadline';
import GradientText from '../typography/GradientText';

const LogosGrid = dynamic(() => import('./LogosGrid'));

const PRODUCT_CATEGORIES = [
  { label: 'Material UI', value: 'material-ui' },
  { label: 'Base UI', value: 'base-ui' },
  { label: 'Joy UI', value: 'joy-ui' },
  { label: 'Data Grid', value: 'data-grid' },
  { label: 'Date and Time Pickers', value: 'date-time' },
  { label: 'Charts', value: 'charts' },
  { label: 'Tree View', value: 'tree-view' },
  { label: 'Toolpad', value: 'toolpad' },
] as const;

type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]['value'];

// Map of product categories to their respective customers
const PRODUCT_CUSTOMERS: Record<ProductCategory, typeof MATERIAL_UI_CUSTOMERS> = {
  'material-ui': MATERIAL_UI_CUSTOMERS,
  'base-ui': BASE_UI_CUSTOMERS,
  'joy-ui': JOY_UI_CUSTOMERS,
  'data-grid': DATA_GRID_CUSTOMERS,
  'date-time': DATE_TIME_CUSTOMERS,
  charts: CHARTS_CUSTOMERS,
  'tree-view': TREE_VIEW_CUSTOMERS,
  toolpad: TOOLPAD_CUSTOMERS,
};

export default function CustomersLogos() {
  const [activeCategory, setActiveCategory] = React.useState<ProductCategory>('material-ui');

  return (
    <Section maxWidth="100%" cozy>
      <SectionHeadline
        alwaysCenter
        overline="Explore our products"
        title={
          <Typography variant="h2" component="h2">
            MUI&apos;s comprehensive suite of UI tools <br /> helps you
            <GradientText>&nbsp; ship better and faster</GradientText>
          </Typography>
        }
      />
      <Stack
        maxWidth="100%"
        direction="row"
        spacing={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1.5,
          mt: 4,
          mb: 4,
        }}
      >
        {PRODUCT_CATEGORIES.map((category) => (
          <Chip
            key={category.value}
            label={category.label}
            onClick={() => setActiveCategory(category.value)}
            sx={(theme) => ({
              borderRadius: '18px',
              '&.MuiChip-root': {
                backgroundColor: activeCategory === category.value ? 'primary.main' : 'transparent',
                border: activeCategory === category.value ? '1px solid' : 'none',
                borderColor: activeCategory === category.value ? 'secondary.main' : 'none',
                color: activeCategory === category.value ? 'white' : 'text.secondary',
                ...theme.applyDarkStyles({
                  backgroundColor: activeCategory === category.value ? '#0C1D2F' : 'transparent',
                  border: activeCategory === category.value ? '1px solid' : 'none',
                  borderColor: activeCategory === category.value ? 'primary.dark' : 'none',
                  color: activeCategory === category.value ? 'text.primary' : 'text.primary',
                }),
                '&:hover': {
                  backgroundColor:
                    activeCategory === category.value ? 'primary.dark' : 'action.hover',
                },
              },
            })}
          />
        ))}
      </Stack>
      <Grid>
        <LogosGrid data={PRODUCT_CUSTOMERS[activeCategory]} />
      </Grid>
    </Section>
  );
}
