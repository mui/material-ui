"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Client-facing showcase for the CSS-var color/state adapter (docs/adr/0002) on
// MenuItem — single-axis (no variant/color), so tokens are `--MenuItem-<state>-<prop>`.
// Background is a value-state in every state; foreground and the inset-ring border
// are inert by default (settable per state). Each preset is a map applied to the
// MenuList; Default sets nothing and is identical to today.

type PresetKey = "default" | "brand";

type TokenMap = Record<string, string>;

const presetTokens: Record<PresetKey, TokenMap> = {
  default: {},
  // Enterprise look from the mockup: grey hover, a subtle focus fill, and a
  // light-blue selected fill with a blue border + blue text. Focus indication is
  // an outline (a separate concern), so it is not tokenized as a border here.
  brand: {
    "--MenuItem-hover-bg": "#EFF1F3",
    "--MenuItem-focus-bg": "#E8EFF6",
    "--MenuItem-selected-bg": "#DCEAF5",
    "--MenuItem-selected-fg": "#1B4B73",
    "--MenuItem-selected-border": "#A9CCE6",
    "--MenuItem-selected-hover-bg": "#CFE2F2",
    "--MenuItem-selected-focus-bg": "#DCEAF5",
  },
};

const presetLabels: Record<PresetKey, string> = {
  default: "Default",
  brand: "Brand",
};

const presetBlurbs: Record<PresetKey, string> = {
  default: "No tokens set — identical to today.",
  brand: "Grey hover, subtle focus fill, light-blue selected with border + ink.",
};

const theme = createTheme({ cssVariables: true, shape: { borderRadius: 6 } });

const mono = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 12,
} as const;

// `--_bg` is the internal default the styled root reads; forcing it inline is the
// only way to preview the `:hover` fill without an actual pointer over the item.
const forceHover = {
  "--_bg": "var(--MenuItem-hover-bg, rgba(0, 0, 0, 0.04))",
} as React.CSSProperties;

function TokenPanel({ preset }: { preset: PresetKey }) {
  const entries = Object.entries(presetTokens[preset]);
  return (
    <div>
      <Typography variant="overline" color="text.secondary">
        Color tokens ({entries.length})
      </Typography>
      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          None — every MenuItem falls back to its default.
        </Typography>
      ) : (
        <Stack spacing={1} sx={{ mt: 0.5 }}>
          {entries.map(([key, value]) => (
            <Box key={key} sx={mono}>
              <Box component="span" sx={{ color: "primary.main" }}>
                {key}
              </Box>
              {": "}
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  component="span"
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "2px",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: value,
                  }}
                />
                <Box component="span" sx={{ color: "text.secondary" }}>
                  {value}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </div>
  );
}

function Menu({ preset }: { preset: PresetKey }) {
  return (
    <Paper sx={{ width: 280, p: 0.5, ...presetTokens[preset] }}>
      <MenuList disablePadding>
        <MenuItem>Solid</MenuItem>
        {/* forced focus-visible to preview the ring without keyboard nav */}
        <MenuItem className="Mui-focusVisible">Rectangular</MenuItem>
        {/* forced hover fill (see forceHover) */}
        <MenuItem style={forceHover}>Hexagonal</MenuItem>
        <MenuItem selected>Point connection net</MenuItem>
      </MenuList>
    </Paper>
  );
}

export default function MenuShowcase() {
  const [preset, setPreset] = React.useState<PresetKey>("default");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Paper
          square
          elevation={0}
          sx={{
            width: 400,
            flexShrink: 0,
            borderRight: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
            height: "100vh",
            overflowY: "auto",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Menu presets
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Each preset is a map of public `--MenuItem-*` tokens applied to the MenuList. Default
            sets nothing and is identical to today.
          </Typography>
          <ToggleButtonGroup
            exclusive
            fullWidth
            size="small"
            color="primary"
            value={preset}
            onChange={(_, next) => next && setPreset(next)}
            sx={{ mb: 1 }}
          >
            {(Object.keys(presetLabels) as PresetKey[]).map((key) => (
              <ToggleButton key={key} value={key}>
                {presetLabels[key]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {presetBlurbs[preset]}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
            Rows show rest · focus (forced) · hover (forced) · selected. Real hover/keyboard focus
            also work.
          </Typography>
          <TokenPanel preset={preset} />
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" color="text.secondary">
            Scope: MenuItem. bg (per state) + fg + border ring. disabled stays opacity-based.
          </Typography>
        </Paper>

        <Box sx={{ flexGrow: 1, minWidth: 0, p: 4 }}>
          <Menu preset={preset} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
