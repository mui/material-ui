'use client';
import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ─── Material Design theme ──────────────────────────────────────────────────
// Default extendTheme() — MD palette, 25-level elevation shadows, Roboto.
// Mirrors the values in packages/mui-material/src/styles/material-theme.css.

const materialTheme = extendTheme();

// ─── MD slider knob defaults ─────────────────────────────────────────────────
// CssVarsProvider injects --mui-palette-* and --mui-shadows-* but never the
// --Slider-* component knobs. Inject them explicitly so the MD defaults apply
// instead of falling back to the base-theme values in Slider.css.

const mdSliderKnobs = `
  :root {
    --Slider-trackBorderRadius: 12px;
    --Slider-trackSize: 4px;
    --Slider-trackSizeSmall: 2px;
    --Slider-thumbSize: 20px;
    --Slider-thumbSizeSmall: 12px;
    --Slider-thumbColor: currentColor;
    --Slider-thumbBorderWidth: 0px;
    --Slider-thumbElevation: var(--mui-shadows-2);
    --Slider-railOpacity: 0.38;
    --Slider-hoverShadowRadius: 8px;
    --Slider-activeShadowRadius: 14px;
  }
`;

// ─── Variant styles ──────────────────────────────────────────────────────────
// Same variant definitions as base-theme-playground — identical classes,
// different result because --mui-shadows-2 and palette tokens are MD values.

const variantStyles = `
  .MuiSlider-variantFlat {
    --Slider-trackSize: 2px;
    --Slider-trackSizeSmall: 1px;
    --Slider-thumbSize: 14px;
    --Slider-thumbSizeSmall: 10px;
    --Slider-trackBorderRadius: 0px;
    --Slider-railOpacity: 0.2;
    --Slider-hoverShadowRadius: 6px;
    --Slider-activeShadowRadius: 10px;
    --Slider-valueLabelBorderRadius: 4px;
  }
  .MuiSlider-variantFlat .MuiSlider-thumb::before { box-shadow: none; }

  .MuiSlider-variantPill {
    --Slider-trackSize: 8px;
    --Slider-trackSizeSmall: 4px;
    --Slider-thumbSize: 22px;
    --Slider-thumbSizeSmall: 14px;
    --Slider-trackBorderRadius: 9999px;
    --Slider-railOpacity: 0.25;
    --Slider-hoverShadowRadius: 10px;
    --Slider-activeShadowRadius: 16px;
    --Slider-valueLabelBorderRadius: 9999px;
  }

  .MuiSlider-variantIos {
    --Slider-trackSize: 4px;
    --Slider-thumbSize: 22px;
    --Slider-trackBorderRadius: 9999px;
    --Slider-railOpacity: 0.28;
    --Slider-hoverShadowRadius: 0px;
    --Slider-activeShadowRadius: 0px;
    --Slider-valueLabelBorderRadius: 8px;
  }
  .MuiSlider-variantIos .MuiSlider-thumb { background-color: #ffffff; }
  .MuiSlider-variantIos .MuiSlider-thumb::before {
    box-shadow: 0px 2px 8px rgba(0,0,0,0.28), 0px 0px 1px rgba(0,0,0,0.12);
  }

  .MuiSlider-variantBold {
    --Slider-trackSize: 6px;
    --Slider-trackSizeSmall: 3px;
    --Slider-thumbSize: 16px;
    --Slider-thumbSizeSmall: 10px;
    --Slider-trackBorderRadius: 3px;
    --Slider-railOpacity: 0.3;
    --Slider-hoverShadowRadius: 8px;
    --Slider-activeShadowRadius: 12px;
    --Slider-valueLabelBorderRadius: 3px;
  }

  .MuiSlider-variantOutlined {
    --Slider-trackSize: 3px;
    --Slider-thumbSize: 18px;
    --Slider-trackBorderRadius: 9999px;
    --Slider-railOpacity: 0.2;
    --Slider-hoverShadowRadius: 8px;
    --Slider-activeShadowRadius: 12px;
    --Slider-valueLabelBorderRadius: 4px;
  }
  .MuiSlider-variantOutlined .MuiSlider-thumb {
    background-color: var(--mui-palette-background-paper, #fff);
    border: 2px solid currentColor;
  }
  .MuiSlider-variantOutlined .MuiSlider-thumb::before { box-shadow: none; }
`;

// ─── Helpers ────────────────────────────────────────────────────────────────

interface VariantRowProps {
  label: string;
  description: string;
  variantClass?: string;
  code: string;
  defaultValue?: number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

function VariantRow({
  label,
  description,
  variantClass,
  code,
  defaultValue = 40,
  color = 'primary',
}: VariantRowProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '200px 1fr 240px' },
        gap: 3,
        alignItems: 'center',
        py: 2.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 0 },
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        <Slider
          defaultValue={defaultValue}
          className={variantClass}
          color={color}
          valueLabelDisplay="auto"
          sx={{ display: 'block' }}
        />
      </Box>

      <Box
        component="code"
        sx={{
          display: 'block',
          fontSize: '0.72rem',
          fontFamily: 'monospace',
          bgcolor: 'action.hover',
          borderRadius: 1,
          px: 1.5,
          py: 1,
          color: 'text.secondary',
          whiteSpace: 'pre',
          overflow: 'auto',
        }}
      >
        {code}
      </Box>
    </Box>
  );
}

function Token({ name, value, color }: { name: string; value: string; color?: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {color && (
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: color,
            border: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
          }}
        />
      )}
      <Box>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: 'text.primary' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Side-by-side comparison strip ──────────────────────────────────────────

function CompareStrip() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 5,
      }}
    >
      {/* Base theme side */}
      <Box sx={{ p: 3, bgcolor: '#f9fafb' }}>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 2 }}>
          BASE THEME (simple shadow)
        </Typography>
        <Box sx={{ filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.12))' }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: '#2563eb',
              mx: 'auto',
            }}
          />
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1, fontFamily: 'monospace', fontSize: '0.65rem' }}
        >
          --mui-shadows-2:
          <br />
          0px 1px 4px rgba(0,0,0,0.12)
        </Typography>
      </Box>

      {/* MD theme side */}
      <Box sx={{ p: 3, bgcolor: '#fff' }}>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 2 }}>
          MATERIAL DESIGN (3-layer elevation)
        </Typography>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: '#1976d2',
            mx: 'auto',
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1, fontFamily: 'monospace', fontSize: '0.65rem' }}
        >
          --mui-shadows-2:
          <br />
          3-layer rgba(0,0,0,0.2/0.14/0.12)
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MaterialThemePlayground() {
  return (
    <CssVarsProvider theme={materialTheme}>
      {/* Inject slider variant classes */}
      <style dangerouslySetInnerHTML={{ __html: mdSliderKnobs }} />
      <style dangerouslySetInnerHTML={{ __html: variantStyles }} />

      <Box
        sx={{
          p: { xs: 3, md: 5 },
          maxWidth: 900,
          mx: 'auto',
          minHeight: '100vh',
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: 'inline-block',
              px: 1.5,
              py: 0.5,
              bgcolor: '#1976d2',
              color: '#fff',
              borderRadius: 1,
              mb: 1.5,
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Material Design Theme
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Material Design — now opt-in
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            Import <code>material-theme.css</code> on top of <code>base-theme.css</code> to get the
            familiar Material Design look: Roboto typography, 25-level elevation system, MD color
            palette. Fully backwards-compatible — existing apps see no change.
          </Typography>
        </Box>

        {/* ── Import pattern ─────────────────────────────────────────────── */}
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            p: 2.5,
            mb: 5,
            fontFamily: 'monospace',
            fontSize: '0.8rem',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'text.disabled', display: 'block', mb: 1, letterSpacing: '0.08em' }}
          >
            CSS-only usage
          </Typography>
          <Box component="pre" sx={{ m: 0, color: 'text.primary', overflow: 'auto' }}>
            {`/* Option A: Material Design on top of base */
@import '@mui/material/styles/base-theme.css';
@import '@mui/material/styles/material-theme.css';

/* Option B: JS theme — zero change for existing users */
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme(); // same as always
<ThemeProvider theme={theme}>...</ThemeProvider>`}
          </Box>
        </Box>

        {/* ── Shadow comparison ──────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          What changes vs base theme
        </Typography>

        <CompareStrip />

        {/* ── Active tokens ──────────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          Active theme tokens (Material Design)
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 2,
            p: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            mb: 5,
          }}
        >
          <Token name="--mui-palette-primary-main" value="#1976d2 (blue[700])" color="#1976d2" />
          <Token name="--mui-palette-secondary-main" value="#9c27b0 (purple[500])" color="#9c27b0" />
          <Token name="--mui-palette-error-main" value="#d32f2f (red[700])" color="#d32f2f" />
          <Token name="--mui-palette-success-main" value="#2e7d32 (green[800])" color="#2e7d32" />
          <Token
            name="--mui-shadows-2"
            value="3-layer MD elevation"
            color={undefined}
          />
          <Token name="--Slider-trackBorderRadius" value="12px (MD spec)" color={undefined} />
        </Box>

        {/* ── Slider variants ─────────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          Same variant classes — MD look and feel
        </Typography>

        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 3,
            mb: 5,
          }}
        >
          <VariantRow
            label="Default"
            description="No variant class — MD theme defaults"
            code={`<Slider />`}
            defaultValue={40}
          />
          <VariantRow
            label="Flat"
            description="2px track, no shadow, sharp corners"
            variantClass="MuiSlider-variantFlat"
            code={`<Slider\n  className=\n  "MuiSlider-variantFlat"\n/>`}
            defaultValue={55}
          />
          <VariantRow
            label="Pill"
            description="8px track, fully rounded, friendly"
            variantClass="MuiSlider-variantPill"
            code={`<Slider\n  className=\n  "MuiSlider-variantPill"\n/>`}
            defaultValue={65}
          />
          <VariantRow
            label="iOS"
            description="White thumb, drop shadow, no hover ring"
            variantClass="MuiSlider-variantIos"
            code={`<Slider\n  className=\n  "MuiSlider-variantIos"\n/>`}
            defaultValue={30}
          />
          <VariantRow
            label="Bold"
            description="6px track, compact thumb, media-player feel"
            variantClass="MuiSlider-variantBold"
            code={`<Slider\n  className=\n  "MuiSlider-variantBold"\n/>`}
            defaultValue={70}
          />
          <VariantRow
            label="Outlined"
            description="Hollow thumb, border-only, minimal weight"
            variantClass="MuiSlider-variantOutlined"
            code={`<Slider\n  className=\n  "MuiSlider-variantOutlined"\n/>`}
            defaultValue={45}
          />
        </Box>

        {/* ── MD semantic colors ──────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          MD semantic colors — Pill variant
        </Typography>

        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 3,
            mb: 5,
          }}
        >
          <Stack spacing={3}>
            {(
              ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
            ).map((color) => (
              <Box key={color} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ width: 72, color: 'text.secondary', flexShrink: 0 }}
                >
                  {color}
                </Typography>
                <Slider
                  defaultValue={Math.round(Math.random() * 40 + 30)}
                  color={color}
                  className="MuiSlider-variantPill"
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* ── Non-breaking note ───────────────────────────────────────────── */}
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 3,
            display: 'flex',
            gap: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Box sx={{ fontSize: '1.25rem', flexShrink: 0 }}>✅</Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Zero breaking changes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you use <code>createTheme()</code> / <code>ThemeProvider</code> today, nothing
              changes. Material Design values continue to be the JS theme defaults. The CSS file
              approach is purely additive — adopt it when you&apos;re ready, or not at all.
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
