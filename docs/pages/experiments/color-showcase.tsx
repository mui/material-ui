"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Client-facing showcase for the CSS-var color/state adapter (docs/adr/0002).
// Unlike density there is no `enhance*` function: the palette is the holistic
// surface, and the public color tokens are per-(variant, color, state, prop)
// deviations. Each preset is just a map of `--Button-<variant>-<color>-<state>-<prop>`
// values applied to the gallery wrapper — demonstrating "set a token at any scope".
// The Default preset sets nothing, so every Button renders today's exact colors.

type PresetKey = "default" | "brand";

type TokenMap = Record<string, string>;

// An enterprise look: primary = steel blue, secondary = neutral grey, recoloured
// (rest + hover) across all three variants from one place — the design-system
// override surface. Other palette colours are left untouched to show the override
// is scoped per (variant, color).
const brandBlue = "#2F6CA3";
const brandBlueHover = "#255A8A";
const brandGreyInk = "#374151";
const brandGreyBorder = "#CBD2DA";

const presetTokens: Record<PresetKey, TokenMap> = {
  default: {},
  brand: {
    // primary — blue
    "--Button-contained-primary-bg": brandBlue,
    "--Button-contained-primary-fg": "#FFFFFF",
    "--Button-contained-primary-hover-bg": brandBlueHover,
    // disabled contained = a light tint of the brand colour (not the default grey)
    "--Button-contained-primary-disabled-bg": "#9FC2DB",
    "--Button-contained-primary-disabled-fg": "#FFFFFF",
    "--Button-text-primary-fg": brandBlue,
    "--Button-text-primary-hover-bg": "rgba(47, 108, 163, 0.08)",
    "--Button-outlined-primary-fg": brandBlue,
    "--Button-outlined-primary-border": brandBlue,
    "--Button-outlined-primary-hover-bg": "rgba(47, 108, 163, 0.08)",
    // secondary — grey
    "--Button-contained-secondary-bg": "#5B6675",
    "--Button-contained-secondary-fg": "#FFFFFF",
    "--Button-contained-secondary-hover-bg": "#4A5462",
    "--Button-contained-secondary-disabled-bg": "#C2C7CE",
    "--Button-contained-secondary-disabled-fg": "#FFFFFF",
    "--Button-text-secondary-fg": brandGreyInk,
    "--Button-text-secondary-hover-bg": "rgba(55, 65, 81, 0.08)",
    "--Button-outlined-secondary-fg": brandGreyInk,
    "--Button-outlined-secondary-border": brandGreyBorder,
    "--Button-outlined-secondary-hover-bg": "rgba(55, 65, 81, 0.06)",
  },
};

const presetLabels: Record<PresetKey, string> = {
  default: "Default",
  brand: "Brand",
};

const presetBlurbs: Record<PresetKey, string> = {
  default: "No tokens set — pixel-identical to today.",
  brand: "primary → steel blue, secondary → grey, across all variants.",
};

const variants = ["text", "outlined", "contained"] as const;
const colors = ["primary", "secondary"] as const;

const theme = createTheme({ cssVariables: true, shape: { borderRadius: 6 } });

const mono = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 12,
} as const;

function TokenPanel({ preset }: { preset: PresetKey }) {
  const entries = Object.entries(presetTokens[preset]);
  return (
    <div>
      <Typography variant="overline" color="text.secondary">
        Color tokens ({entries.length})
      </Typography>
      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          None — every Button falls back to its palette default.
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

function Gallery() {
  return (
    <Stack spacing={3}>
      {variants.map((variant) => (
        <Paper key={variant} variant="outlined" sx={{ p: 2, breakInside: "avoid" }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, color: "text.secondary", fontFamily: mono.fontFamily }}
          >
            {variant}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 1.5,
            }}
          >
            {colors.map((color) => (
              <Stack key={color} spacing={1} sx={{ alignItems: "flex-start" }}>
                <Button variant={variant} color={color}>
                  {color}
                </Button>
                <Button variant={variant} color={color} disabled>
                  disabled
                </Button>
              </Stack>
            ))}
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export default function ColorShowcase() {
  const [preset, setPreset] = React.useState<PresetKey>("default");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Paper
          square
          elevation={0}
          sx={{
            width: "600px",
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
            Color presets
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Each preset is a map of public `--Button-*` tokens applied to the gallery. Default sets
            nothing and is identical to today.
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
            States are interactive: hover with the mouse, Tab for focus, press for active.
          </Typography>
          <TokenPanel preset={preset} />
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" color="text.secondary">
            Scope: Button only (first rollout). rest + hover + focus + active + disabled.
            selected/inherit deferred.
          </Typography>
        </Paper>

        <Box sx={{ flexGrow: 1, minWidth: 0, p: 3, ...presetTokens[preset] }}>
          <Gallery />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
