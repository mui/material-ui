import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

// The default scale `enhanceDensity` ships. A measured number is matched back
// against it so a caption can name the step that produced it.
export const DENSITY_SCALE = {
  'xx-small': 4,
  'x-small': 8,
  small: 12,
  medium: 16,
  large: 24,
  'x-large': 32,
  'xx-large': 48,
};

export const DENSITY_TARGETS = {
  'touch-target': 32,
  'icon-target': 16,
};

// The colors browser devtools use when it highlights a box.
const PADDING_COLOR = '#c3e5a5';
const PADDING_EDGE = '#7ba85a';
const MARGIN_COLOR = '#f8cb9c';
const MARGIN_EDGE = '#d99a5b';
const GAP_COLOR = '#9b6cd9';

// One rung = one caption line plus breathing room. Every ladder steps by it,
// so `offset` means the same distance wherever it is used.
const RUNG = 24;

// How far a connector reaches past its rail before the caption starts. Shared
// by every shape, so a comb and a spine on one rail end level with each other.
const REACH = 10;

// The I-beam's bar sits this far INSIDE its rail. Every other side caption
// ladders along the rail itself, and the bar is the one thing drawn down it —
// left on the rail the two are collinear, and the laddered caption reads as
// labelling the beam. Inboard rather than outboard so the caption column stays
// aligned with every other side caption.
const BEAM_INSET = 10;

// Connector + caption inks, one per aspect. Darker than the fills so text holds
// up on white, lifted in dark mode where the fills would be far too dim.
const INK = { padding: '#4f7a35', margin: '#a8641c', gap: '#6c3fb0' };
const INK_DARK = { padding: '#a9d18a', margin: '#f0b47a', gap: '#c9adf0' };

/** The slot a reader toggles: every annotation on it goes together. */
export const slotLabel = (annotation) =>
  annotation.label ??
  annotation.on
    .replace(/^\.Mui/, '')
    .replace(/-root$/, '')
    .replace(/-/g, ' ');

const round = (value) => `${Math.round(value * 10) / 10}px`;

/**
 * `token (24px)` when the annotation names the expression the preset authored,
 * plain px when it doesn't.
 *
 * A token is a claim of authorship, so it is never inferred from the measured
 * number: a standard input at `size="small"` happens to come out at 32px, and
 * naming that `touch-target` would assert a derivation the preset never made.
 * No token means the value is measured, not emitted — and it prints as such.
 */
function caption(value, annotation) {
  return annotation.token ? `${annotation.token} (${round(value)})` : round(value);
}

const rectPath = (rect) =>
  `M${rect.x},${rect.y}H${rect.x + rect.width}V${rect.y + rect.height}H${rect.x}Z`;

const inset = (rect, edges) => ({
  x: rect.x + edges.left,
  y: rect.y + edges.top,
  width: rect.width - edges.left - edges.right,
  height: rect.height - edges.top - edges.bottom,
});

const outset = (rect, edges) => ({
  x: rect.x - Math.abs(edges.left),
  y: rect.y - Math.abs(edges.top),
  width: rect.width + Math.abs(edges.left) + Math.abs(edges.right),
  height: rect.height + Math.abs(edges.top) + Math.abs(edges.bottom),
});

/**
 * A collapsed `Collapse` keeps its children mounted under `visibility: hidden`,
 * which leaves their rect and computed padding intact — so a size test would
 * still measure them. Ask the browser instead, and walk the ancestors where
 * `checkVisibility` isn't available.
 */
function isVisible(node) {
  const check = node.checkVisibility;
  if (typeof check === 'function') {
    return check.call(node, { visibilityProperty: true });
  }
  let current = node;
  while (current) {
    const styles = window.getComputedStyle(current);
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      return false;
    }
    current = current.parentElement;
  }
  return true;
}

/** Re-run `read` whenever the stage could have moved: a resize, a late webfont,
 * or a popper that mounts a frame after the demo does. */
function useStageEffect(stageRef, read, deps) {
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return undefined;
    }
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => read(stage));
    };
    const resize = new ResizeObserver(schedule);
    const observeAll = () => {
      resize.disconnect();
      resize.observe(stage);
      stage.querySelectorAll('*').forEach((node) => resize.observe(node));
    };
    observeAll();
    schedule();
    document.fonts?.ready.then(schedule);
    const mutation = new MutationObserver(() => {
      observeAll();
      schedule();
    });
    mutation.observe(stage, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutation.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Measure every annotated element plus the demo's own bounds, so the numbers can
 * never drift from what the theme emits and captions can hang off the gutters
 * rather than off the component.
 */
export function useAnnotations(stageRef, demoRef, annotations, deps) {
  const [state, setState] = React.useState(null);

  useStageEffect(
    stageRef,
    (stage) => {
      const stageBox = stage.getBoundingClientRect();
      const relative = (rect) => ({
        x: rect.left - stageBox.left,
        y: rect.top - stageBox.top,
        width: rect.width,
        height: rect.height,
      });

      const demo = demoRef.current;
      if (!demo) {
        setState(null);
        return;
      }
      const painted = [demo, ...Array.from(demo.children)]
        .map((node) => node.getBoundingClientRect())
        .filter((box) => box.width > 0 && box.height > 0);
      if (painted.length === 0) {
        setState(null);
        return;
      }
      const left = Math.min(...painted.map((box) => box.left));
      const top = Math.min(...painted.map((box) => box.top));
      const bounds = {
        x: left - stageBox.left,
        y: top - stageBox.top,
        width: Math.max(...painted.map((box) => box.right)) - left,
        height: Math.max(...painted.map((box) => box.bottom)) - top,
      };

      const measured = [];
      annotations.forEach((annotation) => {
        const element = demo.querySelector(annotation.on);
        if (!element || !isVisible(element)) {
          return;
        }
        const styles = window.getComputedStyle(element);
        const edges = (prefix, suffix) => ({
          top: parseFloat(styles[`${prefix}Top${suffix}`]) || 0,
          right: parseFloat(styles[`${prefix}Right${suffix}`]) || 0,
          bottom: parseFloat(styles[`${prefix}Bottom${suffix}`]) || 0,
          left: parseFloat(styles[`${prefix}Left${suffix}`]) || 0,
        });

        // The band is the declared gap, drawn where the first child ends — a
        // `space-between` row would otherwise report all its leftover space.
        const column = parseFloat(styles.columnGap) || 0;
        const row = parseFloat(styles.rowGap) || 0;
        // The band starts where the first child ends, so only that child has to
        // be an element. A Button's label is a bare text node — using the second
        // child to tell a row gap from a column one would miss it entirely.
        const first = element.children[0]?.getBoundingClientRect();
        const second = element.children[1]?.getBoundingClientRect();
        let gap = null;
        if (first) {
          const stacked = second
            ? second.top >= first.bottom - 0.5
            : row > 0.5 && column <= 0.5;
          const size = stacked ? row : column;
          if (size > 0.5) {
            gap = {
              x: (stacked ? first.left : first.right) - stageBox.left,
              y: (stacked ? first.bottom : first.top) - stageBox.top,
              size,
              vertical: stacked,
            };
          }
        }

        const icon = element.matches('svg') ? element : element.querySelector('svg');
        measured.push({
          annotation,
          box: relative(element.getBoundingClientRect()),
          border: edges('border', 'Width'),
          padding: edges('padding', ''),
          margin: edges('margin', ''),
          gap,
          icon: icon ? relative(icon.getBoundingClientRect()) : null,
        });
      });
      setState({ measured, bounds });
    },
    deps,
  );

  return state;
}

/**
 * The end every connector shares: an optional run along the rail to the rung the
 * ladder gave this caption, a riser out of the rail, then the text. A comb and a
 * spine differ in how they reach the rail, never in how they leave it — so both
 * hand the ending here and land level with each other.
 */
function Caption({
  rail,
  side,
  /** where the text sits — the connector's own coordinate, unless a ladder
   * moved it clear of a neighbour. */
  anchor,
  /** the connector's own coordinate, which the run along the rail starts from. */
  natural,
  label,
}) {
  const away = side === 'top' || side === 'left' ? -1 : 1;
  // A top/bottom caption needs no run: the rail already spans the stems and the
  // riser drops at the anchor. Only the side gutters ladder by y.
  if (side === 'top' || side === 'bottom') {
    return (
      <React.Fragment>
        <line
          className="leader"
          x1={anchor}
          y1={rail}
          x2={anchor}
          y2={rail + away * REACH}
        />
        <text
          x={anchor}
          y={rail + away * (side === 'top' ? 16 : 26)}
          textAnchor="middle"
        >
          {label}
        </text>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {/* Stacked clear of a neighbour: run along the rail, then out. */}
      {Math.abs(anchor - natural) > 0.5 ? (
        <line className="leader" x1={rail} y1={natural} x2={rail} y2={anchor} />
      ) : null}
      <line
        className="leader"
        x1={rail}
        y1={anchor}
        x2={rail + away * REACH}
        y2={anchor}
      />
      <text
        x={rail + away * 14}
        y={anchor}
        textAnchor={side === 'left' ? 'end' : 'start'}
        dominantBaseline="middle"
      >
        {label}
      </text>
    </React.Fragment>
  );
}

/** One caption's connector: a stem out of every band it names, a rail joining
 * them, a riser to the label. Axis-aligned throughout — never a diagonal. */

Caption.propTypes = {
  anchor: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  natural: PropTypes.number.isRequired,
  rail: PropTypes.number.isRequired,
  side: PropTypes.oneOf(['bottom', 'left', 'right', 'top']).isRequired,
};

function Comb({ from, rail, side, label, labelAt, tone }) {
  const horizontal = side === 'top' || side === 'bottom';
  const xs = from.map((point) => point.x);
  const ys = from.map((point) => point.y);
  const mid = horizontal
    ? (Math.min(...xs) + Math.max(...xs)) / 2
    : (Math.min(...ys) + Math.max(...ys)) / 2;

  return (
    <g className={tone}>
      {from.map((point) => (
        <line
          key={`${point.x},${point.y}`}
          className="leader"
          x1={point.x}
          y1={point.y}
          x2={horizontal ? point.x : rail}
          y2={horizontal ? rail : point.y}
        />
      ))}
      {from.length > 1 ? (
        <line
          className="leader"
          x1={horizontal ? Math.min(...xs) : rail}
          y1={horizontal ? rail : Math.min(...ys)}
          x2={horizontal ? Math.max(...xs) : rail}
          y2={horizontal ? rail : Math.max(...ys)}
        />
      ) : null}
      <Caption
        rail={rail}
        side={side}
        anchor={labelAt ?? mid}
        natural={mid}
        label={label}
      />
    </g>
  );
}

/** The off-axis connector: one line crossing every band it names, ticked where
 * it meets each, running out to a gutter. A comb's stems leave a band
 * perpendicular to it and so can only reach the band's own pair of gutters; a
 * spine crosses the stack instead, which is what lets a block-axis padding
 * report upward. With one band it is just a stem. */

Comb.propTypes = {
  from: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  /**
   * where the text sits, when it had to move clear of another caption.
   */
  labelAt: PropTypes.number,
  /**
   * the coordinate the rail sits on: a y for top/bottom, an x for left/right.
   */
  rail: PropTypes.number.isRequired,
  side: PropTypes.oneOf(['bottom', 'left', 'right', 'top']).isRequired,
  /**
   * the aspect's colour, so a line reads as padding/margin/gap on sight.
   */
  tone: PropTypes.string,
};

function Spine({ marks, cross, rail, side, label, tone, labelAt }) {
  const vertical = side === 'top' || side === 'bottom';
  const anchor = labelAt ?? cross;
  const away = side === 'top' || side === 'left' ? -1 : 1;
  const far = away < 0 ? Math.max(...marks) : Math.min(...marks);
  const TICK = 5;

  return (
    <g className={tone}>
      <line
        className="leader"
        x1={vertical ? cross : rail}
        y1={vertical ? rail : cross}
        x2={vertical ? cross : far}
        y2={vertical ? far : cross}
      />
      {marks.map((mark) => (
        <line
          key={mark}
          className="dim"
          x1={vertical ? cross - TICK : mark}
          y1={vertical ? mark : cross - TICK}
          x2={vertical ? cross + TICK : mark}
          y2={vertical ? mark : cross + TICK}
        />
      ))}
      <Caption
        rail={rail}
        side={side}
        anchor={anchor}
        natural={cross}
        label={label}
      />
    </g>
  );
}

Spine.propTypes = {
  /**
   * the spine's fixed coordinate: an x when it runs vertically, else a y.
   */
  cross: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  /**
   * where the text sits when the ladder moved it clear of a neighbour.
   */
  labelAt: PropTypes.number,
  /**
   * each band's centre along the crossing axis.
   */
  marks: PropTypes.arrayOf(PropTypes.number).isRequired,
  rail: PropTypes.number.isRequired,
  side: PropTypes.oneOf(['bottom', 'left', 'right', 'top']).isRequired,
  tone: PropTypes.string,
};

function Annotations({ measured, bounds }) {
  const hatchId = React.useId();

  // A caption leaves through the gutter its box is nearest, so a slot low in the
  // demo doesn't drag a leader up across everything above it. Several on the same
  // side stack into lanes.
  // Only the side gutters count: top/bottom separate by rung, not by lane.
  const lanes = { left: 0, right: 0 };
  const nearest = (box, axis) => {
    if (axis === 'inline') {
      return box.y + box.height / 2 < bounds.y + bounds.height / 2
        ? 'top'
        : 'bottom';
    }
    return box.x + box.width / 2 < bounds.x + bounds.width / 2 ? 'left' : 'right';
  };
  /** An I-beam and an icon box measure height, so only a side gutter can hold
   * their caption — the block axis always answers with one. */
  const nearestSide = (box) => nearest(box, 'block');
  // Top/bottom captions only need a new rung when they would actually overlap
  // in x — the same reasoning that gave the side gutters a single rail. Bumping
  // a lane per annotation instead pushed rails far out, and a spine has to run
  // from its rail all the way down through the box.
  const taken = {
    top: [],
    bottom: [],
  };
  const reserveLane = (side, centre, label, rung) => {
    // 13px type: close enough to keep neighbours apart without measuring.
    const half = (label.length * 7.2) / 2 + 8;
    const span = { min: centre - half, max: centre + half };
    const rungs = taken[side];
    if (rung !== undefined) {
      while (rungs.length <= rung) {
        rungs.push([]);
      }
      rungs[rung].push(span);
      return rung;
    }
    for (let i = 0; i < rungs.length; i += 1) {
      if (rungs[i].every((r) => span.max < r.min || span.min > r.max)) {
        rungs[i].push(span);
        return i;
      }
    }
    rungs.push([span]);
    return rungs.length - 1;
  };
  /** `rung` is absolute: which line out from the component the caption sits on.
   * Left undefined it is chosen automatically — the first line where this
   * caption would not overlap one already placed. */
  const nextRail = (side, rung, centre = 0, label = '') => {
    if (side === 'top') {
      return bounds.y - 22 - reserveLane('top', centre, label, rung) * RUNG;
    }
    if (side === 'bottom') {
      return (
        bounds.y +
        bounds.height +
        22 +
        reserveLane('bottom', centre, label, rung) * RUNG
      );
    }
    // Side captions share ONE rail — they separate by y (see `reserveY`), and
    // an x step would make the column drift inward as slots are toggled off.
    lanes[side] += 1;
    return side === 'left' ? bounds.x - 22 : bounds.x + bounds.width + 22;
  };

  // Captions on a side never sit closer than one rung apart, and they descend in
  // annotation order. Where boxes are already far apart (a stacked instance)
  // each keeps its natural y; where they cluster (Alert's slots all share one
  // row) they become an evenly spaced ladder instead of piling up.

  const lastY = {
    left: Number.NEGATIVE_INFINITY,
    right: Number.NEGATIVE_INFINITY,
  };
  const reserveY = (side, y, rung) => {
    // An explicit rung counts down from the demo's top edge; otherwise the
    // caption keeps its natural y, never closer than one rung to the last.
    const next =
      rung === undefined ? Math.max(y, lastY[side] + RUNG) : bounds.y + rung * RUNG;
    lastY[side] = Math.max(lastY[side], next);
    return next;
  };

  const fills = [];
  const marks = [];

  /**
   * Draw one caption's connector. The shape follows from the side: inside the
   * aspect's natural pair a comb's stems reach it directly; outside, only a
   * spine can, by crossing the bands instead of leaving them perpendicular.
   *
   * The rail must be claimed before the rung, in this order — both ladders are
   * stateful, and the caption's position is where they cross.
   */
  const connect = ({
    id,
    naturalPair,
    side,
    offset,
    tone,
    label,
    points,
    /** where the caption sits on a top/bottom rail. */
    alongTop,
    /** the connector's natural y, when the caption lands in a side gutter. */
    alongSide,
  }) => {
    const rail = nextRail(side, offset, alongTop, label);
    const sideways = side === 'left' || side === 'right';
    const labelAt = sideways ? reserveY(side, alongSide, offset) : alongTop;
    const shared = { rail, side, label, tone, labelAt };
    marks.push(
      naturalPair.includes(side) ? (
        <Comb key={id} from={points} {...shared} />
      ) : (
        // A spine travels along one axis, so it ticks each stem at that stem's
        // coordinate on it — the same points the comb would have used.
        <Spine
          key={id}
          marks={points.map((point) => (sideways ? point.x : point.y))}
          cross={sideways ? alongSide : alongTop}
          {...shared}
        />
      ),
    );
  };
  // One ring per element, however many band annotations point at it.
  const ringed = new Set();

  // The ladder walks downward, so annotations must arrive in that order too.
  // Spec order is not visual order — TextField lists InputBase first but renders
  // it last, which pushed every later beam below it into a pile.
  const ordered = [...measured].sort((a, b) => a.box.y - b.box.y);

  ordered.forEach((item, index) => {
    const { annotation, box } = item;
    const key = `${annotation.on}-${annotation.aspect}-${annotation.axis ?? ''}-${index}`;
    const paddingBox = inset(box, item.border);
    const contentBox = inset(paddingBox, item.padding);

    const outline = () => {
      if (!annotation.root && !ringed.has(`outline-${annotation.on}`)) {
        ringed.add(`outline-${annotation.on}`);
        fills.push(
          <path key={`outline-${key}`} className="slot-outline" d={rectPath(box)} />,
        );
      }
    };

    if (annotation.aspect === 'padding' || annotation.aspect === 'margin') {
      const isPadding = annotation.aspect === 'padding';
      const edges = isPadding ? item.padding : item.margin;
      const outer = isPadding ? paddingBox : outset(box, edges);
      const inner = isPadding ? contentBox : box;
      const axis = annotation.axis ?? 'inline';
      const bands =
        axis === 'inline'
          ? [
              { side: 'left', value: edges.left },
              { side: 'right', value: edges.right },
            ]
          : [
              { side: 'top', value: edges.top },
              { side: 'bottom', value: edges.bottom },
            ];

      const live = bands.filter((band) => Math.abs(band.value) > 0.5);
      if (live.length === 0) {
        return;
      }

      const ringKey = `${annotation.aspect}-${annotation.on}`;
      if (!ringed.has(ringKey)) {
        ringed.add(ringKey);
        fills.push(
          <path
            key={`fill-${key}`}
            className={isPadding ? 'padding-box' : 'margin-box'}
            fillRule="evenodd"
            d={`${rectPath(outer)}${rectPath(inner)}`}
          />,
        );
      }
      outline();

      // The natural pair is the one a comb's stems can reach; anything else is
      // an author override and switches the connector to a spine.
      const naturalPair = axis === 'inline' ? ['top', 'bottom'] : ['left', 'right'];
      const side = annotation.place ?? nearest(box, axis);
      const at = annotation.at ?? 0.5;
      const stem = (band) => {
        const near = side === 'top' ? outer.y : outer.y + outer.height;
        const far = side === 'left' ? outer.x : outer.x + outer.width;
        if (band === 'left') {
          return { x: outer.x + Math.abs(edges.left) / 2, y: near };
        }
        if (band === 'right') {
          return { x: outer.x + outer.width - Math.abs(edges.right) / 2, y: near };
        }
        if (band === 'top') {
          return { x: far, y: outer.y + Math.abs(edges.top) / 2 };
        }
        return { x: far, y: outer.y + outer.height - Math.abs(edges.bottom) / 2 };
      };

      // Bands of the same size share one caption; when the two sides differ
      // (AccordionDetails is `xx-small` on top, `small` underneath) each gets
      // its own, because one label can't honestly name both.
      const byValue = new Map();
      live.forEach((band) => {
        const bucket = Math.round(Math.abs(band.value) * 10) / 10;
        byValue.set(bucket, [...(byValue.get(bucket) ?? []), band]);
      });
      // A token names ONE value. When the two bands of an axis differ, it can't
      // honestly label both — Input's block padding is `x-small` on top and a
      // private-var fallback underneath — so the split captions fall back to px.
      const named =
        byValue.size === 1 ? annotation : { ...annotation, token: undefined };
      const tone = isPadding ? 'tone-padding' : 'tone-margin';
      byValue.forEach((group, value) => {
        connect({
          id: `link-${key}-${value}`,
          naturalPair,
          side,
          offset: annotation.offset,
          tone,
          label: caption(group[0].value, named),
          points: group.map((band) => stem(band.side)),
          alongTop: outer.x + outer.width * at,
          alongSide: outer.y + outer.height * at,
        });
      });
      return;
    }

    if (annotation.aspect === 'gap') {
      const { gap } = item;
      if (!gap) {
        return;
      }
      const band = gap.vertical
        ? { x: contentBox.x, y: gap.y, width: contentBox.width, height: gap.size }
        : { x: gap.x, y: contentBox.y, width: gap.size, height: contentBox.height };
      fills.push(
        <rect
          key={`fill-${key}`}
          className="gap-box"
          fill={`url(#${hatchId})`}
          x={band.x}
          y={band.y}
          width={band.width}
          height={band.height}
        />,
      );
      outline();
      // One band, so the comb is a single stem; a place on the other axis still
      // needs the spine, which crosses rather than leaves perpendicular.
      const naturalPair = gap.vertical ? ['left', 'right'] : ['top', 'bottom'];
      const side =
        annotation.place ?? nearest(box, gap.vertical ? 'block' : 'inline');
      const at = annotation.at ?? 0.5;
      const centre = {
        x: band.x + band.width * at,
        y: band.y + band.height * at,
      };
      connect({
        id: `link-${key}`,
        naturalPair,
        side,
        offset: annotation.offset,
        tone: 'tone-gap',
        label: caption(gap.size, annotation),
        points: [
          gap.vertical
            ? { x: side === 'left' ? band.x : band.x + band.width, y: centre.y }
            : { x: centre.x, y: side === 'top' ? band.y : band.y + band.height },
        ],
        alongTop: centre.x,
        alongSide: centre.y,
      });
      return;
    }

    if (annotation.aspect === 'icon') {
      const { icon } = item;
      if (!icon) {
        return;
      }
      fills.push(
        <path key={`icon-${key}`} className="slot-outline" d={rectPath(icon)} />,
      );
      const side = nearestSide(icon);
      connect({
        id: `link-${key}`,
        naturalPair: ['left', 'right'],
        side,
        offset: annotation.offset,
        label: caption(icon.height, annotation),
        points: [
          {
            x: side === 'left' ? icon.x : icon.x + icon.width,
            y: icon.y + icon.height / 2,
          },
        ],
        alongTop: icon.x + icon.width / 2,
        alongSide: icon.y + icon.height / 2,
      });
      return;
    }

    // touch-target — an I-beam in the side gutter, reached by one horizontal
    // stem. An I-beam measures height, so only a side gutter can hold it; it
    // takes the one its box is nearest, and a full-width box that ties goes to
    // whichever side is carrying fewer captions.
    const centred =
      Math.abs(box.x + box.width / 2 - (bounds.x + bounds.width / 2)) < 1;
    const lighter = lanes.left <= lanes.right ? 'left' : 'right';
    const side = centred ? lighter : nearestSide(box);
    const rail = nextRail(side);
    const labelY = reserveY(side, box.y + box.height / 2);
    // The stem still runs to the rail, so it crosses the bar at the box's own
    // centre — which is where an I-beam's leader belongs anyway.
    const bar = rail - (side === 'right' ? 1 : -1) * BEAM_INSET;
    outline();
    marks.push(
      <React.Fragment key={`beam-${key}`}>
        <line
          className="leader"
          x1={side === 'right' ? box.x + box.width : box.x}
          y1={box.y + box.height / 2}
          x2={rail}
          y2={box.y + box.height / 2}
        />
        <line className="dim" x1={bar} y1={box.y} x2={bar} y2={box.y + box.height} />
        <line className="dim" x1={bar - 4} y1={box.y} x2={bar + 4} y2={box.y} />
        <line
          className="dim"
          x1={bar - 4}
          y1={box.y + box.height}
          x2={bar + 4}
          y2={box.y + box.height}
        />
        {Math.abs(labelY - (box.y + box.height / 2)) > 0.5 ? (
          <line
            className="leader"
            x1={rail}
            y1={box.y + box.height / 2}
            x2={rail}
            y2={labelY}
          />
        ) : null}
        <text
          x={rail + (side === 'right' ? 10 : -10)}
          y={labelY}
          textAnchor={side === 'right' ? 'start' : 'end'}
          dominantBaseline="middle"
        >
          {caption(box.height, annotation)}
        </text>
      </React.Fragment>,
    );
  });

  return (
    <Box
      component="svg"
      aria-hidden
      sx={(theme) => ({
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
        // Above a Modal (1300) and a Tooltip (1500) — a demo may open either.
        zIndex: 1600,
        color: 'text.secondary',
        fontSize: 13,
        '& text': { fill: 'currentColor' },
        '& .dim': { stroke: 'currentColor', fill: 'none' },
        '& .leader': {
          stroke: 'currentColor',
          fill: 'none',
          strokeDasharray: '3 3',
          opacity: 0.6,
        },
        '& .padding-box': {
          fill: PADDING_COLOR,
          fillOpacity: 0.7,
          stroke: PADDING_EDGE,
        },
        '& .margin-box': {
          fill: MARGIN_COLOR,
          fillOpacity: 0.7,
          stroke: MARGIN_EDGE,
        },
        '& .slot-outline': {
          fill: 'none',
          stroke: 'currentColor',
          strokeDasharray: '2 2',
          opacity: 0.6,
        },
        '& .gap-box': { stroke: GAP_COLOR, strokeDasharray: '2 2' },
        '& .hatch': { stroke: GAP_COLOR, opacity: 0.55 },
        '& .tone-padding': { color: INK.padding },
        '& .tone-margin': { color: INK.margin },
        '& .tone-gap': { color: INK.gap },
        ...theme.applyStyles('dark', {
          '& .tone-padding': { color: INK_DARK.padding },
          '& .tone-margin': { color: INK_DARK.margin },
          '& .tone-gap': { color: INK_DARK.gap },
        }),
      })}
    >
      <defs>
        <pattern
          id={hatchId}
          width={6}
          height={6}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="hatch" x1={0} y1={0} x2={0} y2={6} strokeWidth={3} />
        </pattern>
      </defs>
      {fills}
      {marks}
    </Box>
  );
}

Annotations.propTypes = {
  bounds: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  measured: PropTypes.arrayOf(
    PropTypes.shape({
      annotation: PropTypes.shape({
        aspect: PropTypes.oneOf(['gap', 'icon', 'margin', 'padding', 'touch-target'])
          .isRequired,
        at: PropTypes.number,
        axis: PropTypes.oneOf(['block', 'inline']),
        label: PropTypes.string,
        offset: PropTypes.number,
        on: PropTypes.string.isRequired,
        place: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
        root: PropTypes.bool,
        token: PropTypes.string,
      }).isRequired,
      border: PropTypes.shape({
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
      }).isRequired,
      box: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      gap: PropTypes.shape({
        size: PropTypes.number.isRequired,
        vertical: PropTypes.bool.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
      icon: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
      margin: PropTypes.shape({
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
      }).isRequired,
      padding: PropTypes.shape({
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export { Annotations };
