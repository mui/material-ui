import * as React from 'react';
import Stack from '@mui/material/Stack';
import {
  FilledInput as Md2FilledInput,
  FormControl as Md2FormControl,
  InputLabel as Md2InputLabel,
  InputAdornment as Md2InputAdornment,
  FormHelperText as Md2FormHelperText,
  Divider,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  FilledInput,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material-next';
import { FormControlProps } from '@mui/material-next/FormControl/FormControl.types';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ModeSwitcher } from '.';

const md2Theme = createTheme();

const md3Theme = extendTheme();

const COLORS = ['primary', 'secondary', 'tertiary', 'error', 'info', 'success', 'warning'];

export default function MaterialYouFilledInput() {
  const [color, setColor] = React.useState<FormControlProps['color']>('primary');

  return (
    <Stack spacing={4}>
      <CssVarsProvider theme={md3Theme}>
        <Stack
          direction="column"
          gap={4}
          sx={{ backgroundColor: 'background', p: 4, color: 'onBackground' }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <pre>MD3</pre>
            <ModeSwitcher />
            <select
              onChange={(ev) => {
                // @ts-ignore
                setColor(ev.currentTarget.value);
              }}
            >
              {COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Stack>

          <pre style={{ fontSize: 14, marginBottom: -8 }}>
            From left to right: (1) no adornments, (2) startAdornment only, (3) endAdornment only,
            (4) startAdornment and endAdornment
          </pre>

          <pre>size=&quot;medium&quot; (default)</pre>
          <Stack gap={4} mb={4}>
            <Stack display="inline-flex" direction="row" gap={4}>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
                <FilledInput id="md3-primary-adornment" defaultValue="" />
              </FormControl>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue=""
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue=""
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-secondary-adornment">WIP Secondary adornments</InputLabel>
                <FilledInput
                  id="md3-secondary-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>

            <Stack display="inline-flex" direction="row" gap={4} mb={4}>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">
                  WIP Primary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                />
              </FormControl>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">
                  WIP Primary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">
                  WIP Primary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl color={color} variant="filled">
                <InputLabel htmlFor="md3-secondary-adornment">
                  WIP Secondary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-secondary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
          </Stack>

          <pre>size=&quot;small&quot;</pre>
          <Stack gap={4} mb={4}>
            <Stack display="inline-flex" direction="row" gap={4}>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
                <FilledInput id="md3-primary-adornment" defaultValue="" />
              </FormControl>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue=""
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue=""
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-secondary-adornment">WIP Secondary adornments</InputLabel>
                <FilledInput
                  id="md3-secondary-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>

            <Stack display="inline-flex" direction="row" gap={4} mb={4}>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">
                  WIP Primary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                />
              </FormControl>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">
                  WIP Primary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-primary-adornment">
                  WIP Primary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-primary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl size="small" color={color} variant="filled">
                <InputLabel htmlFor="md3-secondary-adornment">
                  WIP Secondary adornments abc def ghi jkl mno
                </InputLabel>
                <FilledInput
                  id="md3-secondary-adornment"
                  defaultValue="hello 123 abc 456 xyz 789 def"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <HighlightOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 12 }} />

          <pre>FormHelperText</pre>

          <Stack display="inline-flex" direction="row" gap={4}>
            <FormControl color="primary" variant="filled">
              <InputLabel htmlFor="md3-primary">Primary</InputLabel>
              <FilledInput
                id="md3-primary"
                defaultValue="primary"
                aria-describedby="md3-primary-helper-text"
              />
              <FormHelperText id="md3-primary-helper-text">Primary helper text</FormHelperText>
            </FormControl>
            <FormControl color="secondary" variant="filled">
              <InputLabel htmlFor="md3-secondary">Secondary</InputLabel>
              <FilledInput
                id="md3-secondary"
                defaultValue="secondary"
                aria-describedby="md3-secondary-helper-text"
              />
              <FormHelperText id="md3-secondary-helper-text">Secondary helper text</FormHelperText>
            </FormControl>
            <FormControl color="tertiary" variant="filled">
              <InputLabel htmlFor="md3-tertiary">Tertiary</InputLabel>
              <FilledInput
                id="md3-tertiary"
                defaultValue="tertiary"
                aria-describedby="md3-tertiary-helper-text"
              />
              <FormHelperText id="md3-tertiary-helper-text">Tertiary helper text</FormHelperText>
            </FormControl>
          </Stack>

          <Stack display="inline-flex" direction="row" gap={4}>
            <FormControl color="primary" variant="filled" disabled>
              <InputLabel htmlFor="md3-primary">Primary disabled</InputLabel>
              <FilledInput
                id="md3-primary"
                defaultValue="primary disabled"
                aria-describedby="md3-primary-helper-text"
              />
              <FormHelperText id="md3-primary-helper-text">Primary helper text</FormHelperText>
            </FormControl>
            <FormControl color="secondary" variant="filled" disabled>
              <InputLabel htmlFor="md3-secondary">Secondary disabled</InputLabel>
              <FilledInput
                id="md3-secondary"
                defaultValue="secondary disabled"
                aria-describedby="md3-secondary-helper-text"
              />
              <FormHelperText id="md3-secondary-helper-text">Secondary helper text</FormHelperText>
            </FormControl>
            <FormControl color="tertiary" variant="filled" disabled>
              <InputLabel htmlFor="md3-tertiary">Tertiary disabled</InputLabel>
              <FilledInput
                id="md3-tertiary"
                defaultValue="tertiary disabled"
                aria-describedby="md3-tertiary-helper-text"
              />
              <FormHelperText id="md3-tertiary-helper-text">Tertiary helper text</FormHelperText>
            </FormControl>
          </Stack>

          <Stack display="inline-flex" direction="row" gap={4}>
            <FormControl color="primary" variant="filled" error>
              <InputLabel htmlFor="md3-primary">Primary error</InputLabel>
              <FilledInput
                id="md3-primary"
                defaultValue="primary error"
                aria-describedby="md3-primary-helper-text"
              />
              <FormHelperText id="md3-primary-helper-text">Primary helper text</FormHelperText>
            </FormControl>
            <FormControl color="secondary" variant="filled" error>
              <InputLabel htmlFor="md3-secondary">Secondary error</InputLabel>
              <FilledInput
                id="md3-secondary"
                defaultValue="secondary error"
                aria-describedby="md3-secondary-helper-text"
              />
              <FormHelperText id="md3-secondary-helper-text">Secondary helper text</FormHelperText>
            </FormControl>
            <FormControl color="tertiary" variant="filled" error>
              <InputLabel htmlFor="md3-tertiary">Tertiary error</InputLabel>
              <FilledInput
                id="md3-tertiary"
                defaultValue="tertiary error"
                aria-describedby="md3-tertiary-helper-text"
              />
              <FormHelperText id="md3-tertiary-helper-text">Tertiary helper text</FormHelperText>
            </FormControl>
          </Stack>
        </Stack>
      </CssVarsProvider>

      <ThemeProvider theme={md2Theme}>
        <Stack direction="column" gap={4} sx={{ p: 4 }}>
          <pre>MD2</pre>
          <Stack display="inline-flex" direction="row" gap={4}>
            <Md2FormControl color="primary" variant="filled">
              <Md2InputLabel htmlFor="md2-primary">Primary adornments</Md2InputLabel>
              <Md2FilledInput
                id="md2-primary"
                defaultValue="primary"
                startAdornment={
                  <Md2InputAdornment position="start">
                    <SearchIcon />
                  </Md2InputAdornment>
                }
              />
            </Md2FormControl>
            <Md2FormControl color="secondary" variant="filled">
              <Md2InputLabel htmlFor="md2-secondary">Secondary adornments</Md2InputLabel>
              <Md2FilledInput
                id="md2-secondary"
                defaultValue="secondary"
                startAdornment={<Md2InputAdornment position="start">$</Md2InputAdornment>}
              />
            </Md2FormControl>
          </Stack>
          <Stack display="inline-flex" direction="row" gap={4}>
            <Md2FormControl color="primary" variant="filled">
              <Md2InputLabel htmlFor="md2-primary">Primary adornments</Md2InputLabel>
              <Md2FilledInput
                id="md2-primary"
                defaultValue="primary primary primary primary"
                endAdornment={
                  <Md2InputAdornment position="end">
                    <SearchIcon />
                  </Md2InputAdornment>
                }
              />
            </Md2FormControl>
            <Md2FormControl color="secondary" variant="filled">
              <Md2InputLabel htmlFor="md2-secondary">
                Secondary etc abc etc abc etc abc 123 321
              </Md2InputLabel>
              <Md2FilledInput
                id="md2-secondary"
                defaultValue="secondary secondary secondary secondary"
                endAdornment={<Md2InputAdornment position="end">$</Md2InputAdornment>}
              />
            </Md2FormControl>
          </Stack>
          <Stack display="inline-flex" direction="row" gap={4}>
            <Md2FormControl color="primary" variant="filled">
              <Md2InputLabel htmlFor="md2-primary">Primary abc 123 def 456 ghi 789</Md2InputLabel>
              <Md2FilledInput
                id="md2-primary"
                defaultValue="primary"
                aria-describedby="md2-primary-helper-text"
              />
              <Md2FormHelperText id="md2-primary-helper-text">
                md2 primary helper text
              </Md2FormHelperText>
            </Md2FormControl>
            <Md2FormControl color="secondary" variant="filled">
              <Md2InputLabel htmlFor="md2-secondary">Secondary</Md2InputLabel>
              <Md2FilledInput
                id="md2-secondary"
                defaultValue="secondary"
                aria-describedby="md2-secondary-helper-text"
              />
              <Md2FormHelperText id="md2-secondary-helper-text">
                md2 secondary helper text
              </Md2FormHelperText>
            </Md2FormControl>
          </Stack>
        </Stack>
      </ThemeProvider>
    </Stack>
  );
}
