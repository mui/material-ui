"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Public CSS variables + density POC.
// See CONTEXT.md, docs/adr/0001-public-css-var-inward-dependency.md,
// docs/design/public-css-var-layering.md.
const theme = createTheme({ cssVariables: true });

function Controls() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained">Medium</Button>
        <Button variant="contained" size="large">
          Large
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: "start", flexWrap: "wrap" }}>
        <TextField label="Outlined" defaultValue="Value" />
        <TextField label="Small" size="small" defaultValue="Value" />
      </Stack>
    </Stack>
  );
}

function Scope({ title, sx, children }: { title: string; sx?: object; children: React.ReactNode }) {
  return (
    <Box sx={{ p: 3, border: "1px dashed", borderColor: "divider", borderRadius: 1, ...sx }}>
      <Typography variant="overline" color="text.secondary">
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
    </Box>
  );
}

export default function App() {
  const [spacing, setSpacing] = React.useState(8);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, display: "grid", gap: 3, maxWidth: 720 }}>
        <Typography variant="h5">Public CSS variables & density</Typography>

        {/* --- Different Apps: drive --mui-spacing live at a class scope --- */}
        <Box sx={{ px: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {`App density — --mui-spacing: ${spacing}px`}
          </Typography>
          <Slider
            value={spacing}
            onChange={(_, value) => setSpacing(value as number)}
            min={4}
            max={12}
            step={1}
            marks
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}px`}
          />
        </Box>
        <Scope title="Controls" sx={{ "--mui-spacing": `${spacing}px` }}>
          <Controls />
        </Scope>

        {/* --- Different Viewports: override --mui-spacing inside a media query --- */}
        <Scope
          title="Viewport — --mui-spacing: 6px below 900px (resize to see)"
          sx={{ "@media (max-width:900px)": { "--mui-spacing": "6px" } }}
        >
          <Controls />
        </Scope>

        {/* --- Fine-grained per-component knobs --- */}
        <Scope title="Per-component knobs">
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <Button variant="contained" sx={{ "--Button-padding-block": "2px" }}>
              --Button-padding-block: 2px
            </Button>
            <Button variant="outlined" sx={{ "--Button-padding-inline": "40px" }}>
              --Button-padding-inline: 40px
            </Button>
            <TextField
              label="--TextField-height: 64px"
              defaultValue="Value"
              sx={{ "--TextField-height": "64px" }}
            />
            <TextField
              label="--InputBase-line-height: 2"
              defaultValue="Value"
              sx={{ "--InputBase-line-height": "2" }}
            />
          </Stack>
        </Scope>
      </Box>
    </ThemeProvider>
  );
}
