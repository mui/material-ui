import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import densityRecipes from './densityRecipes';
import recipeUis from './recipeUis';

const colorSchemes = { light: true, dark: true };

// The chrome runs on the shipped scale, so the controls driving the canvas are
// themselves an example of what the canvas is demonstrating.
const chromeTheme = enhanceDensity(createTheme({ colorSchemes }));

// Gap between the measured block and the bars, so they read as annotation
// rather than as part of the UI.
const ANNOTATION_OFFSET = 24;
// Width the bar and its caption need. The anchor is clamped by it so a caption
// can never land past the canvas edge, where the scroll container would cut it.
const ANNOTATION_WIDTH = 52;
// Captions closer together than this collide, so they get pushed apart.
const MIN_CAPTION_GAP = 16;

interface Mark {
  top: number;
  height: number;
  left: number;
  right: number;
  side: 'left' | 'right';
}

/**
 * Dimension bars for every `[data-measure]` element inside `containerRef`.
 *
 * Bars go in a column beside the measured block: right by default, left for
 * `data-measure="left"`. A row and the control inside it occupy the same band,
 * so putting them in opposite columns is what keeps their bars apart.
 *
 * Heights are read off the DOM rather than derived from the recipe, so a bar
 * cannot disagree with what the browser actually laid out.
 */
function HeightAnnotations({
  containerRef,
  watch,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  watch: string;
}) {
  const [marks, setMarks] = React.useState<Mark[]>([]);
  const [anchors, setAnchors] = React.useState({ left: 0, right: 0 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    const measure = () => {
      const base = container.getBoundingClientRect();
      const found = Array.from(
        container.querySelectorAll('[data-measure]'),
        (element): Mark => {
          const box = element.getBoundingClientRect();
          return {
            top: box.top - base.top,
            height: box.height,
            left: box.left - base.left,
            right: box.right - base.left,
            side: element.getAttribute('data-measure') === 'left' ? 'left' : 'right',
          };
        },
      );
      // Both columns sit beside the block as a whole, not beside each element:
      // a row that is not full width (an auto-width button) ends far short of
      // the block, and anchoring per element would scatter the bars.
      if (found.length) {
        setAnchors({
          right: Math.min(
            Math.max(...found.map((mark) => mark.right)) + ANNOTATION_OFFSET,
            base.width - ANNOTATION_WIDTH,
          ),
          left: Math.max(
            Math.min(...found.map((mark) => mark.left)) - ANNOTATION_OFFSET,
            ANNOTATION_WIDTH,
          ),
        });
      }
      setMarks(found.sort((a, b) => a.top - b.top));
    };
    measure();
    // A late webfont changes text heights without changing the container's.
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    container
      .querySelectorAll('[data-measure]')
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [containerRef, watch]);

  // Each bar spans its element exactly — only the captions move, so a run of
  // short rows stays readable without any bar misreporting a height. Columns are
  // spaced independently, since a caption only ever collides within its own.
  const place = (side: 'left' | 'right') => {
    let lastCaption = -Infinity;
    return marks
      .filter((mark) => mark.side === side)
      .map((mark) => {
        const captionY = Math.max(
          mark.top + mark.height / 2,
          lastCaption + MIN_CAPTION_GAP,
        );
        lastCaption = captionY;
        return { ...mark, captionY };
      });
  };

  return (
    <Box
      component="svg"
      aria-hidden
      sx={{
        // Purely an overlay: it reserves no space, so toggling it cannot move
        // the UI it is measuring.
        position: 'absolute',
        inset: 0,
        overflow: 'visible',
        pointerEvents: 'none',
        color: 'text.secondary',
        fontSize: 12,
        '& text': { fill: 'currentColor' },
        '& path': { stroke: 'currentColor', fill: 'none' },
      }}
    >
      {(['right', 'left'] as const).map((side) => {
        const bar = side === 'right' ? anchors.right : anchors.left - 12;
        return place(side).map((mark) => (
          <React.Fragment key={`${side}-${mark.top}-${mark.height}`}>
            {/* The bar: end caps plus the span between them. */}
            <path
              d={`M${bar},${mark.top}H${bar + 12}M${bar + 6},${mark.top}V${
                mark.top + mark.height
              }M${bar},${mark.top + mark.height}H${bar + 12}`}
            />
            {/* One string, not `{n}px` — that splits into two text nodes and SVG
                paints only the first. */}
            <text
              x={side === 'right' ? bar + 20 : bar - 8}
              y={mark.captionY}
              textAnchor={side === 'right' ? 'start' : 'end'}
              dominantBaseline="middle"
            >
              {`${Math.round(mark.height)}px`}
            </text>
          </React.Fragment>
        ));
      })}
    </Box>
  );
}

const LAYERS = [
  { id: 'radius', label: 'New Radius' },
  { id: 'typography', label: 'New Typography' },
  { id: 'focus', label: 'Focus visible' },
] as const;

type LayerId = (typeof LAYERS)[number]['id'];

export default function DensityRecipesDemo() {
  const [recipeId, setRecipeId] = React.useState('medium');
  const [layers, setLayers] = React.useState<Record<LayerId, boolean>>({
    radius: true,
    typography: true,
    focus: true,
  });
  const [grid, setGrid] = React.useState(true);
  const [measured, setMeasured] = React.useState(false);
  const [uiIndex, setUiIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const recipe =
    densityRecipes.find((item) => item.id === recipeId) ?? densityRecipes[1];

  // Every checked layer is an ordinary `createTheme` input; only the scale is
  // the enhancer's own argument. Unchecking one falls back to the defaults.
  const theme = React.useMemo(() => {
    // Both layers write `components`, so they merge rather than overwrite. With
    // the ripple off, the ring is the only keyboard indicator left.
    const components = {
      ...(layers.focus
        ? { MuiButtonBase: { defaultProps: { disableRipple: true } } }
        : {}),
    };
    const base = createTheme({
      colorSchemes,
      components,
      ...(layers.radius ? { shape: recipe.shape } : {}),
      ...(layers.typography ? { typography: recipe.typography } : {}),
      ...(layers.focus ? { focusVisible: true } : {}),
    });
    return enhanceDensity(base, recipe.scale);
  }, [recipe, layers]);

  const cell = recipe.scale['touch-target'] ?? 32;
  const Ui = recipeUis[uiIndex].Component;
  const canvasRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={chromeTheme}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            pb: 2,
          }}
        >
          <ToggleButtonGroup
            exclusive
            value={recipeId}
            onChange={(event, next) => {
              if (next) {
                setRecipeId(next);
              }
            }}
            aria-label="density recipe"
          >
            {densityRecipes.map((item) => (
              <ToggleButton
                key={item.id}
                value={item.id}
                aria-label={`${item.label} density`}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            Extensions
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {LAYERS.map((layer) => (
              <MenuItem
                key={layer.id}
                role="menuitemcheckbox"
                aria-checked={layers[layer.id]}
                onClick={() =>
                  setLayers((prev) => ({ ...prev, [layer.id]: !prev[layer.id] }))
                }
              >
                <ListItemIcon>
                  {layers[layer.id] ? (
                    <CheckBoxIcon color="primary" />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </ListItemIcon>
                {layer.label}
              </MenuItem>
            ))}
          </Menu>
          <FormControlLabel
            sx={{ ml: 'auto' }}
            control={
              <Checkbox
                checked={grid}
                onChange={(event) => setGrid(event.target.checked)}
              />
            }
            label={`Grid (touch-target ${cell}px)`}
          />
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                checked={measured}
                onChange={(event) => setMeasured(event.target.checked)}
              />
            }
            label="Height measurement"
          />
        </Box>
        <Tabs
          value={uiIndex}
          onChange={(event, next) => setUiIndex(next)}
          aria-label="example UI"
        >
          {recipeUis.map((ui) => (
            <Tab key={ui.id} label={ui.label} sx={{ textTransform: 'none' }} />
          ))}
        </Tabs>
      </ThemeProvider>
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          ref={canvasRef}
          sx={[
            {
              // Padding is a whole cell, so the ruling passes through the
              // controls' own edges instead of beside them. It stays put when the
              // ruling is hidden, so toggling cannot reflow the UI below.
              position: 'relative',
              p: `${cell}px`,
              minWidth: 520,
            },
            grid && {
              backgroundSize: `${cell}px ${cell}px`,
              backgroundImage: `linear-gradient(to right, rgba(216, 27, 96, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(216, 27, 96, 0.08) 1px, transparent 1px)`,
            },
            grid &&
              ((muiTheme) =>
                muiTheme.applyStyles('dark', {
                  backgroundImage: `linear-gradient(to right, rgba(244, 143, 177, 0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 143, 177, 0.11) 1px, transparent 1px)`,
                })),
          ]}
        >
          <ThemeProvider theme={theme}>
            <Ui />
          </ThemeProvider>
          {measured ? (
            <HeightAnnotations
              containerRef={canvasRef}
              watch={`${recipeId}-${uiIndex}-${JSON.stringify(layers)}`}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
