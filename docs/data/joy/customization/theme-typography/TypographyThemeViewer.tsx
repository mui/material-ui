import * as React from 'react';
import { extendTheme, styled, TypographySystem, FontSize } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

const defaultTheme = extendTheme();

const Table = styled('table')(({ theme }) => ({
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

export default function TypographyThemeViewer() {
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
    <Box
      sx={{
        marginBottom: '-9px',
        maxWidth: '100%',
        overflowX: 'scroll',
        border: '1px solid',
        borderColor: 'divider',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
      }}
    >
      <Table>
        <thead>
          <tr>
            <th>
              <Typography sx={{ fontSize: 'sm' }}>Level</Typography>
            </th>
            <th>
              <Typography noWrap sx={{ fontSize: 'sm' }}>
                Color
              </Typography>
            </th>
            <th>
              <Typography noWrap sx={{ fontSize: 'sm' }}>
                Font size
              </Typography>
            </th>
            <th>
              <Typography noWrap sx={{ fontSize: 'sm' }}>
                Font weight
              </Typography>
            </th>
            <th>
              <Typography noWrap sx={{ fontSize: 'sm' }}>
                Line height
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
                  <Typography sx={{ fontSize: 'sm', cursor: 'zoom-in' }}>
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
                        startDecorator={renderSwatch(
                          'light',
                          defaultTheme.typography[level].color as string,
                        )}
                        sx={{ fontSize: 'xs' }}
                      >
                        (light)
                      </Typography>
                      <Typography
                        startDecorator={renderSwatch(
                          'dark',
                          defaultTheme.typography[level].color as string,
                        )}
                        sx={{ fontSize: 'xs' }}
                      >
                        (dark)
                      </Typography>
                    </Box>
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography
                    sx={{ fontSize: 'xs', fontFamily: 'code', cursor: 'zoom-in' }}
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
                    sx={{ fontSize: 'xs', fontFamily: 'code', cursor: 'zoom-in' }}
                  >
                    {defaultTheme.typography[level].fontSize || '-'}
                  </Typography>
                </Tooltip>
              </td>
              {(['fontWeight', 'lineHeight'] as const).map((field) => (
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
                      sx={{
                        fontSize: 'xs',
                        fontFamily: 'code',
                        textAlign: 'center',
                        cursor: 'zoom-in',
                      }}
                    >
                      {defaultTheme.typography[level][field] || '-'}
                    </Typography>
                  </Tooltip>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
