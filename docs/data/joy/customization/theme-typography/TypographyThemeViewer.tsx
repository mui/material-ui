import * as React from 'react';
import { extendTheme, styled, TypographySystem, FontSize } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

const defaultTheme = extendTheme();

const Table = styled('table')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  borderRadius: theme.vars.radius.md,
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  width: 'max-content',
  overflow: 'auto',
  th: {
    textAlign: 'left',
    padding: 12,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    ...theme.variants.soft.neutral,
  },
  td: {
    verticalAlign: 'top',
    padding: '8px 12px',
    '& > *': {
      padding: '8px 12px',
      margin: '-8px -12px',
    },
  },
  tr: {
    '&:hover': {
      backgroundColor: theme.vars.palette.background.level1,
    },
    '&:first-of-type': {
      '& td': { paddingTop: 6 },
    },
  },
}));

const extractFromVar = (value: string, field: string) =>
  (value || '').replace(`var(--joy-${field}-`, '').replace(')', '');

export default function FontSizeThemeViewer() {
  const levels = Object.keys(defaultTheme.typography) as Array<
    keyof TypographySystem
  >;
  const renderSwatch = (colorScheme: 'light' | 'dark', token: string) =>
    token ? (
      <Box
        component="span"
        data-joy-color-scheme={colorScheme}
        sx={{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          borderRadius: '2px',
          bgcolor: token,
          boxShadow: 'inset 0 0 0 1px #bababa',
        }}
      />
    ) : null;
  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'scroll' }}>
      <Table>
        <thead>
          <tr>
            <th>
              <Typography fontSize="sm">Level</Typography>
            </th>
            <th>
              <Typography fontSize="sm" noWrap>
                Color
              </Typography>
            </th>
            <th>
              <Typography fontSize="sm" noWrap>
                Font size
              </Typography>
            </th>
            <th>
              <Typography fontSize="sm" noWrap>
                Font weight
              </Typography>
            </th>
            <th>
              <Typography fontSize="sm" noWrap>
                Line height
              </Typography>
            </th>
            <th>
              <Typography fontSize="sm" noWrap>
                Letter spacing
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level}>
              <td>
                <Tooltip
                  title={<Typography level={level}>Preview</Typography>}
                  size="sm"
                  arrow
                  variant="outlined"
                  placement="bottom-start"
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography fontSize="sm" sx={{ cursor: 'zoom-in' }}>
                    {level}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  size="sm"
                  arrow
                  variant="outlined"
                  title={
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Typography
                        fontSize="xs"
                        startDecorator={renderSwatch(
                          'light',
                          defaultTheme.typography[level].color as string,
                        )}
                      >
                        (light)
                      </Typography>
                      <Typography
                        fontSize="xs"
                        startDecorator={renderSwatch(
                          'dark',
                          defaultTheme.typography[level].color as string,
                        )}
                      >
                        (dark)
                      </Typography>
                    </Box>
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography
                    fontSize="xs"
                    fontFamily="code"
                    letterSpacing="sm"
                    sx={{ cursor: 'zoom-in' }}
                  >
                    {defaultTheme.typography[level].color || '-'}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  size="sm"
                  arrow
                  title={
                    defaultTheme.fontSize[
                      extractFromVar(
                        defaultTheme.typography[level].fontSize as string,
                        'fontSize',
                      ) as keyof FontSize
                    ]
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography
                    fontSize="xs"
                    fontFamily="code"
                    letterSpacing="sm"
                    sx={{ cursor: 'zoom-in' }}
                  >
                    {defaultTheme.typography[level].fontSize || '-'}
                  </Typography>
                </Tooltip>
              </td>
              {(['fontWeight', 'lineHeight', 'letterSpacing'] as const).map(
                (field) => (
                  <td key={field}>
                    <Tooltip
                      size="sm"
                      arrow
                      title={
                        (defaultTheme[field] as Record<string, any>)[
                          extractFromVar(
                            defaultTheme.typography[level][field] as string,
                            field,
                          )
                        ] || ''
                      }
                      sx={{ pointerEvents: 'none' }}
                    >
                      <Typography
                        fontSize="xs"
                        fontFamily="code"
                        letterSpacing="sm"
                        textAlign="center"
                        sx={{ cursor: 'zoom-in' }}
                      >
                        {defaultTheme.typography[level][field] || '-'}
                      </Typography>
                    </Tooltip>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
