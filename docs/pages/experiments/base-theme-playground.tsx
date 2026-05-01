'use client';
import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ─── Base theme ─────────────────────────────────────────────────────────────
// Mirrors the values in packages/mui-material/src/styles/base-theme.css.
// CssVarsProvider injects these into :root — making them the page-level default.

const baseTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#2563eb', light: '#60a5fa', dark: '#1d4ed8' },
        secondary: { main: '#7c3aed', light: '#a78bfa', dark: '#5b21b6' },
        error: { main: '#dc2626', light: '#f87171', dark: '#b91c1c' },
        warning: { main: '#d97706', light: '#fbbf24', dark: '#b45309' },
        info: { main: '#0284c7', light: '#38bdf8', dark: '#0369a1' },
        success: { main: '#16a34a', light: '#4ade80', dark: '#15803d' },
      },
    },
  },
  shadows: [
    'none',
    '0px 1px 2px 0px rgba(0,0,0,0.08)',
    '0px 1px 4px 0px rgba(0,0,0,0.12)',
    '0px 2px 6px 0px rgba(0,0,0,0.12)',
    '0px 4px 8px 0px rgba(0,0,0,0.12)',
    '0px 4px 10px 0px rgba(0,0,0,0.12)',
    '0px 6px 12px 0px rgba(0,0,0,0.12)',
    '0px 6px 14px 0px rgba(0,0,0,0.12)',
    '0px 8px 16px 0px rgba(0,0,0,0.12)',
    '0px 8px 18px 0px rgba(0,0,0,0.12)',
    '0px 10px 20px 0px rgba(0,0,0,0.12)',
    '0px 10px 22px 0px rgba(0,0,0,0.12)',
    '0px 12px 24px 0px rgba(0,0,0,0.12)',
    '0px 12px 26px 0px rgba(0,0,0,0.12)',
    '0px 14px 28px 0px rgba(0,0,0,0.12)',
    '0px 14px 30px 0px rgba(0,0,0,0.12)',
    '0px 16px 32px 0px rgba(0,0,0,0.12)',
    '0px 16px 34px 0px rgba(0,0,0,0.12)',
    '0px 18px 36px 0px rgba(0,0,0,0.12)',
    '0px 18px 38px 0px rgba(0,0,0,0.12)',
    '0px 20px 40px 0px rgba(0,0,0,0.12)',
    '0px 20px 42px 0px rgba(0,0,0,0.12)',
    '0px 22px 44px 0px rgba(0,0,0,0.12)',
    '0px 22px 46px 0px rgba(0,0,0,0.12)',
    '0px 24px 48px 0px rgba(0,0,0,0.12)',
  ],
});

// ─── Variant styles ──────────────────────────────────────────────────────────
// Mirrors the content of packages/mui-material/src/Slider/slider-variants.css.
// Injected via <style> since Next.js only allows global CSS in _app.tsx.

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
  .MuiSlider-variantIos .MuiSlider-thumb {
    --Slider-thumbColor: #ffffff;
    --Slider-thumbElevation: 0px 2px 8px rgba(0,0,0,0.28), 0px 0px 1px rgba(0,0,0,0.12);
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
    --Slider-thumbColor: var(--mui-palette-background-paper, #fff);
    --Slider-thumbBorderWidth: 2px;
    --Slider-thumbElevation: none;
  }
`;

// ─── Material Design overrides — scoped to [data-theme="md"] ────────────────
// CssVarsProvider always targets :root and cannot scope to a subtree.
// Plain CSS selectors are the correct mechanism for same-page multi-theme support:
// elements inside [data-theme="md"] inherit these values instead of :root's.

const mdThemeOverrides = `
  [data-theme="md"] {
    --mui-palette-primary-main: #1976d2;
    --mui-palette-primary-light: #42a5f5;
    --mui-palette-primary-dark: #1565c0;
    --mui-palette-primary-mainChannel: 25 118 210;
    --mui-palette-primary-lightChannel: 66 165 245;
    --mui-palette-primary-darkChannel: 21 101 192;
    --mui-palette-secondary-main: #9c27b0;
    --mui-palette-secondary-light: #ba68c8;
    --mui-palette-secondary-dark: #7b1fa2;
    --mui-palette-secondary-mainChannel: 156 39 176;
    --mui-palette-secondary-lightChannel: 186 104 200;
    --mui-palette-secondary-darkChannel: 123 31 162;
    --mui-palette-Slider-primaryTrack: #90caf9;
    --mui-palette-Slider-secondaryTrack: #ce93d8;
    --Slider-trackBorderRadius: 12px;
    --Slider-trackSize: 4px;
    --Slider-trackSizeSmall: 2px;
    --Slider-thumbSize: 20px;
    --Slider-thumbSizeSmall: 12px;
    --Slider-thumbColor: currentColor;
    --Slider-thumbBorderWidth: 0px;
    --Slider-thumbElevation: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
    --Slider-railOpacity: 0.38;
    --Slider-hoverShadowRadius: 8px;
    --Slider-activeShadowRadius: 14px;
  }
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

// ─── Theme column — reused in the comparison section ─────────────────────────

function ThemeColumn({
  title,
  subtitle,
  dataTheme,
}: {
  title: string;
  subtitle: string;
  dataTheme?: string;
}) {
  return (
    <Box
      {...(dataTheme ? { 'data-theme': dataTheme } : {})}
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Box
          component="code"
          sx={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'text.secondary' }}
        >
          {subtitle}
        </Box>
      </Box>
      <Slider defaultValue={60} valueLabelDisplay="auto" />
      <Slider defaultValue={60} className="MuiSlider-variantPill" valueLabelDisplay="auto" />
      <Slider defaultValue={60} className="MuiSlider-variantFlat" valueLabelDisplay="auto" />
    </Box>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BaseThemePlayground() {
  return (
    <CssVarsProvider theme={baseTheme}>
      <style dangerouslySetInnerHTML={{ __html: variantStyles }} />
      <style dangerouslySetInnerHTML={{ __html: mdThemeOverrides }} />

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
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 1,
              mb: 1.5,
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Base Theme
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Lightweight, non-opinionated starting point
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            Import <code>base-theme.css</code> for a minimal CSS variable foundation. No Roboto, no
            25-level elevation system, no Material Design opinions. Bring your own brand and go from
            there.
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
            Plain CSS — multi-theme setup
          </Typography>
          <Box component="pre" sx={{ m: 0, color: 'text.primary', overflow: 'auto' }}>
            {`/* globals.css — load both files once, globally */
@import '@mui/material/styles/base-theme.css';  /* :root defaults */
@import '@mui/material/styles/material-theme.css'; /* [data-theme="md"] */

/* Base theme is the default — no attribute needed */
/* Material Design activates inside [data-theme="md"] */`}
          </Box>
          <Box
            component="pre"
            sx={{ m: 0, mt: 2, color: 'text.secondary', overflow: 'auto', fontSize: '0.75rem' }}
          >
            {`<!-- base-theme page — inherits :root -->
<main>...</main>

<!-- MD page — override with [data-theme="md"] on the wrapper -->
<main data-theme="md">...</main>`}
          </Box>
        </Box>

        {/* ── Why CssVarsProvider doesn't solve this ─────────────────────── */}
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'warning.light',
            bgcolor: 'warning.light',
            borderRadius: 2,
            p: 2,
            mb: 5,
            opacity: 0.9,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Why not CssVarsProvider?
          </Typography>
          <Typography variant="body2">
            <code>CssVarsProvider</code> always targets <code>:root</code> — its{' '}
            <code>colorSchemeSelector</code> prop only switches light/dark, not base vs MD. Two
            providers on the same page overwrite each other. Plain CSS selectors like{' '}
            <code>[data-theme=&quot;md&quot;]</code> scope to a subtree without any JS.
          </Typography>
        </Box>

        {/* ── Live comparison ─────────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          Live comparison — same page, two themes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The right column wraps its sliders in{' '}
          <code>{'<div data-theme="md">'}</code>. The{' '}
          <code>[data-theme=&quot;md&quot;]</code> style block overrides CSS variables for that
          subtree — same variant class names, different resolved values.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
            mb: 5,
          }}
        >
          <ThemeColumn title="Base theme" subtitle="<div> (no attribute)" />
          <ThemeColumn title="Material Design" subtitle='<div data-theme="md">' dataTheme="md" />
        </Box>

        {/* ── Active tokens ──────────────────────────────────────────────── */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
          >
            Active theme tokens (base)
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
            }}
          >
            <Token name="--mui-palette-primary-main" value="#2563eb" color="#2563eb" />
            <Token name="--mui-palette-secondary-main" value="#7c3aed" color="#7c3aed" />
            <Token name="--mui-palette-error-main" value="#dc2626" color="#dc2626" />
            <Token name="--mui-palette-success-main" value="#16a34a" color="#16a34a" />
            <Token
              name="--mui-shadows-2"
              value="0px 1px 4px 0px rgba(0,0,0,0.12)"
              color={undefined}
            />
            <Token name="--Slider-thumbElevation" value="none" color={undefined} />
            <Token name="--Slider-trackSize" value="2px" color={undefined} />
            <Token name="--Slider-thumbSize" value="16px" color={undefined} />
            <Token name="--Slider-thumbColor" value="background-paper (white)" color="#ffffff" />
            <Token name="--Slider-thumbBorderWidth" value="2px (outlined)" color={undefined} />
          </Box>
        </Box>

        {/* ── Slider variants ─────────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          Slider variants — on top of base theme
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
            description="No variant class — base theme defaults"
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

        {/* ── Semantic colors ─────────────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          Semantic colors — Pill variant
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

        {/* ── Custom override example ─────────────────────────────────────── */}
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', display: 'block', mb: 2, letterSpacing: '0.08em' }}
        >
          Instant brand override — one CSS variable
        </Typography>

        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {[
            { color: '#7c3aed', label: 'Violet brand' },
            { color: '#0f766e', label: 'Teal brand' },
            { color: '#b45309', label: 'Amber brand' },
          ].map(({ color, label }) => (
            <Box key={color}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {label}
              </Typography>
              <Slider
                defaultValue={50}
                className="MuiSlider-variantPill"
                sx={{
                  color,
                  '& .MuiSlider-thumb:hover': {
                    boxShadow: `0px 0px 0px 10px ${color}29`,
                  },
                  '& .MuiSlider-thumb.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 10px ${color}29`,
                  },
                  '& .MuiSlider-thumb.Mui-active': {
                    boxShadow: `0px 0px 0px 16px ${color}29`,
                  },
                }}
              />
              <Box
                component="code"
                sx={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'text.secondary' }}
              >
                color=&quot;{color}&quot;
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
