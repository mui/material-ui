import * as React from 'react';
import { extendTheme, Palette, styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import Close from '@mui/icons-material/CloseOutlined';

const defaultTheme = extendTheme();

const Table = styled('table')({
  width: 'max-content',
  borderCollapse: 'separate',
  borderSpacing: 12,
  thead: {
    height: 32,
  },
  th: {
    textAlign: 'left',
    '&:first-child': {
      width: 100,
    },
  },
  td: {
    verticalAlign: 'top',
  },
});

const extractFromVar = (value = '', field) =>
  value.replace(`var(--joy-${field}-`, '').replace(')', '');

export default function FontSizeThemeViewer() {
  const levels = Object.keys(defaultTheme.typography);
  const renderSwatch = (colorScheme, token) =>
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
    <Box sx={{ maxWidth: '100%', overflow: 'auto' }}>
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
                  <Typography sx={{ cursor: 'zoom-in' }}>{level}</Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  size="sm"
                  arrow
                  variant="outlined"
                  placement="bottom-start"
                  title={
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Typography
                        fontSize="xs"
                        startDecorator={renderSwatch(
                          'light',
                          defaultTheme.typography[level].color,
                        )}
                      >
                        (light)
                      </Typography>
                      <Typography
                        fontSize="xs"
                        startDecorator={renderSwatch(
                          'dark',
                          defaultTheme.typography[level].color,
                        )}
                      >
                        (dark)
                      </Typography>
                    </Box>
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography level="body2" sx={{ cursor: 'zoom-in' }}>
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
                        defaultTheme.typography[level].fontSize,
                        'fontSize',
                      )
                    ]
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography level="body2" sx={{ cursor: 'zoom-in' }}>
                    {defaultTheme.typography[level].fontSize || '-'}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  size="sm"
                  arrow
                  title={
                    defaultTheme.fontWeight[
                      extractFromVar(
                        defaultTheme.typography[level].fontWeight,
                        'fontWeight',
                      )
                    ] || 'unset'
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography
                    level="body2"
                    textAlign="center"
                    sx={{ cursor: 'zoom-in' }}
                  >
                    {defaultTheme.typography[level].fontWeight || '-'}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  size="sm"
                  arrow
                  title={
                    defaultTheme.lineHeight[
                      extractFromVar(
                        defaultTheme.typography[level].lineHeight,
                        'lineHeight',
                      )
                    ] || 'unset'
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography level="body2" sx={{ cursor: 'zoom-in' }}>
                    {defaultTheme.typography[level].lineHeight || '-'}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  size="sm"
                  arrow
                  title={
                    defaultTheme.letterSpacing[
                      extractFromVar(
                        defaultTheme.typography[level].letterSpacing,
                        'letterSpacing',
                      )
                    ] || 'unset'
                  }
                  sx={{ pointerEvents: 'none' }}
                >
                  <Typography
                    level="body2"
                    textAlign="center"
                    sx={{ cursor: 'zoom-in' }}
                  >
                    {defaultTheme.typography[level].letterSpacing || '-'}
                  </Typography>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
