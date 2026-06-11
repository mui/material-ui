"use client";
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import composeClasses from "@mui/utils/composeClasses";
import rootShouldForwardProp from "../styles/rootShouldForwardProp";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import ListContext from "../List/ListContext";
import ButtonBase from "../ButtonBase";
import useEnhancedEffect from "../utils/useEnhancedEffect";
import focusWithVisible from "../utils/focusWithVisible";
import useForkRef from "../utils/useForkRef";
import useId from "../utils/useId";
import { useRovingTabIndexItem } from "../utils/useRovingTabIndex";
import { dividerClasses } from "../Divider";
import { listItemIconClasses } from "../ListItemIcon";
import { listItemTextClasses } from "../ListItemText";
import { useMenuListContext } from "../MenuList/MenuListContext";
import { useSelectFocusSource } from "../Select/utils";
import menuItemClasses, { getMenuItemUtilityClass } from "./menuItemClasses";

export const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
  const slots = {
    root: [
      "root",
      dense && "dense",
      disabled && "disabled",
      !disableGutters && "gutters",
      divider && "divider",
      selected && "selected",
    ],
  };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

// Color/state adapter (docs/adr/0002), single-axis: MenuItem has no variant or
// palette-color prop, so the token is `--MenuItem-<state>-<prop>` (rest omits the
// `<state>` segment). Background is a value-state in every state (each genuinely
// sets it), so it advances the internal default `--_bg` with the token inside, and
// the root reads `var(--_bg)`. Foreground and border are inert today (MenuItem
// changes neither per state), routed over `--_fg` / `--_border` so they stay
// zero-diff (inherited text / transparent ring) yet become settable — the ring is
// an inset box-shadow, so adding one never shifts the menu's layout. `focus` maps
// to `.Mui-focusVisible`. Compound states (`selected:hover`, `selected:focus`) win
// by specificity, exactly as before.
const buildMenuItemColorVars = (theme) => {
  const vars = theme.vars || theme;
  const action = vars.palette.action;
  const primary = vars.palette.primary.main;
  const selectedBg = theme.alpha(primary, action.selectedOpacity);
  const selectedHoverBg = theme.alpha(
    primary,
    `${action.selectedOpacity} + ${action.hoverOpacity}`
  );
  const selectedFocusBg = theme.alpha(
    primary,
    `${action.selectedOpacity} + ${action.focusOpacity}`
  );

  // One state's style: advance bg (value-state, token inside the default), and
  // route the inert fg/border tokens over the rest defaults.
  const stateStyle = (name, bgDefault) => ({
    "--_bg": `var(--MenuItem-${name}-bg, ${bgDefault})`,
    color: `var(--MenuItem-${name}-fg, var(--_fg))`,
    boxShadow: `inset 0 0 0 1.5px var(--MenuItem-${name}-border, var(--_border))`,
  });

  return {
    "&:hover": {
      textDecoration: "none",
      ...stateStyle("hover", action.hover),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        "--_bg": "var(--MenuItem-bg, transparent)",
      },
    },
    [`&.${menuItemClasses.selected}`]: {
      ...stateStyle("selected", selectedBg),
      [`&.${menuItemClasses.focusVisible}`]: stateStyle("selected-focus", selectedFocusBg),
    },
    [`&.${menuItemClasses.selected}:hover`]: {
      ...stateStyle("selected-hover", selectedHoverBg),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        "--_bg": `var(--MenuItem-selected-bg, ${selectedBg})`,
      },
    },
    [`&.${menuItemClasses.focusVisible}`]: stateStyle("focus", action.focus),
  };
};

const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body1,
    // Density adapter (docs/adr/0001): `dense` is the compactness axis (boolean).
    // The default (non-dense) state is the plain seam `--MenuItem-<key>` over the
    // internal default `--_<key>`; the `dense` variant re-routes the seam to the
    // `--MenuItem-dense-<key>` token. Block + min-height live on the root
    // unconditionally; inline gutters live on the !disableGutters variant.
    "--_minHeight": "48px",
    "--_padBlock": "6px",
    // Color/state seams (docs/adr/0002): rest defaults hold today's values (no bg,
    // inherited text, transparent ring) with the rest token inside; the root reads
    // them once. State advances live in buildMenuItemColorVars below.
    "--_bg": "var(--MenuItem-bg, transparent)",
    "--_fg": "var(--MenuItem-fg, inherit)",
    "--_border": "var(--MenuItem-border, transparent)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    minHeight: "var(--MenuItem-minHeight, var(--_minHeight))",
    paddingTop: "var(--MenuItem-padBlock, var(--_padBlock))",
    paddingBottom: "var(--MenuItem-padBlock, var(--_padBlock))",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    backgroundColor: "var(--_bg)",
    color: "var(--_fg)",
    boxShadow: "inset 0 0 0 1.5px var(--_border)",
    ...buildMenuItemColorVars(theme),
    [`&.${menuItemClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    [`& + .${dividerClasses.root}`]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    [`& + .${dividerClasses.inset}`]: {
      marginLeft: 52,
    },
    [`& .${listItemTextClasses.root}`]: {
      marginTop: 0,
      marginBottom: 0,
    },
    [`& .${listItemTextClasses.inset}`]: {
      paddingLeft: 36,
    },
    [`& .${listItemIconClasses.root}`]: {
      minWidth: "var(--ListItemIcon-minWidth, 36px)",
    },
    variants: [
      {
        props: ({ ownerState }) => !ownerState.disableGutters,
        style: {
          "--_padInline": "16px",
          paddingLeft: "var(--MenuItem-padInline, var(--_padInline))",
          paddingRight: "var(--MenuItem-padInline, var(--_padInline))",
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disableGutters && ownerState.dense,
        style: {
          "--MenuItem-padInline": "var(--MenuItem-dense-padInline, var(--_padInline))",
        },
      },
      {
        props: ({ ownerState }) => ownerState.divider,
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: "padding-box",
        },
      },
      {
        props: ({ ownerState }) => !ownerState.dense,
        style: {
          [theme.breakpoints.up("sm")]: {
            minHeight: "auto",
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.dense,
        style: {
          "--_minHeight": "32px", // https://m2.material.io/components/menus#specs > Dense
          "--_padBlock": "4px",
          "--MenuItem-minHeight": "var(--MenuItem-dense-minHeight, var(--_minHeight))",
          "--MenuItem-padBlock": "var(--MenuItem-dense-padBlock, var(--_padBlock))",
          ...theme.typography.body2,
          [`& .${listItemIconClasses.root} svg`]: {
            fontSize: "1.25rem",
          },
        },
      },
    ],
  }))
);

const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiMenuItem" });
  const {
    autoFocus: shouldAutoFocusOnMount = false,
    component = "li",
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = "menuitem",
    tabIndex: tabIndexProp,
    className,
    ...other
  } = props;

  const focusSource = useSelectFocusSource();
  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      disableGutters,
    }),
    [context.dense, dense, disableGutters]
  );
  const menuListContext = useMenuListContext();
  const rovingItemId = useId();
  // Escape hatch via ButtonBase for when an anchored <Menu> is opened with a pointer
  // interaction on a trigger, the item should receive DOM focus but without focus visible
  // styling. Current API does not allow a reliable `openInteractionType` for anchored menus.
  const suppressFocusVisible = menuListContext.suppressInitialFocusVisible;
  const itemsFocusableWhenDisabled = menuListContext.itemsFocusableWhenDisabled;

  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (shouldAutoFocusOnMount) {
      if (menuItemRef.current) {
        focusWithVisible(menuItemRef.current, focusSource);
      } else if (process.env.NODE_ENV !== "production") {
        console.error(
          "MUI: Unable to set focus to a MenuItem whose component has not been rendered."
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoFocusOnMount]);

  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters,
  };

  const classes = useUtilityClasses(props);

  // Don't forward the 'root' class to the ButtonBase, as it will get duplicated with the one passed to the className prop.
  const { root, ...forwardedClasses } = classes;

  const rovingItemProps = useRovingTabIndexItem({
    id: rovingItemId,
    ref,
    disabled: props.disabled,
    focusableWhenDisabled: itemsFocusableWhenDisabled,
    selected: props.selected,
  });

  const handleRef = useForkRef(menuItemRef, rovingItemProps.ref);

  let tabIndex;
  if (tabIndexProp !== undefined) {
    tabIndex = tabIndexProp;
  } else if (menuListContext.variant === "selectedMenu") {
    tabIndex = rovingItemProps.tabIndex;
  } else if (!props.disabled || itemsFocusableWhenDisabled) {
    // In `menu` variant, registration still drives arrow-key navigation even
    // though each item keeps `tabIndex={-1}`.
    tabIndex = -1;
  }

  return (
    <ListContext.Provider value={childContext}>
      <MenuItemRoot
        ref={handleRef}
        role={role}
        tabIndex={tabIndex}
        component={component}
        internalNativeButton={false}
        focusableWhenDisabled={itemsFocusableWhenDisabled}
        suppressFocusVisible={suppressFocusVisible}
        focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
        className={clsx(classes.root, className)}
        {...other}
        ownerState={ownerState}
        classes={forwardedClasses}
      />
    </ListContext.Provider>
  );
});

MenuItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
};

export default MenuItem;
