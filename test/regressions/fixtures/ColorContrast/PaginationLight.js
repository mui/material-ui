import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const VARIANTS = ['text', 'outlined'];
const COLORS = ['standard', 'primary', 'secondary'];

const theme = createTheme({ palette: { mode: 'light' } });

// Override the `page` prop with a longer string. PaginationItem ignores
// `children` for page-type items (hardcoded `{type === 'page' && page}`),
// so widening the rendered text means widening `page` itself. Without
// this, axe trips its `shortTextContent` guard on the single-digit page
// number and downgrades real contrast fails to `incomplete`.
const renderLongLabel = (item) => (
  <PaginationItem {...item} page={item.type === 'page' ? `page ${item.page}` : item.page} />
);

export default function PaginationLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={2}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-variant={variant} data-color={color}>
                  <Pagination
                    count={3}
                    page={2}
                    variant={variant}
                    color={color}
                    renderItem={renderLongLabel}
                  />
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
