import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonGroupColor,
  ButtonGroupContextService,
  ButtonGroupOrientation,
  ButtonGroupSize,
  ButtonGroupVariant,
} from './ButtonGroupContext.angular';

// ---------------------------------------------------------------------------
// Utility helpers (mirror of React-side capitalize + getButtonGroupUtilityClass)
// ---------------------------------------------------------------------------

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function cls(slot: string): string {
  return `MuiButtonGroup-${slot}`;
}

interface ComputedClasses {
  root: string;
  grouped: string;
  firstButton: string;
  lastButton: string;
  middleButton: string;
}

function computeClasses(ownerState: {
  color: ButtonGroupColor;
  disabled: boolean;
  disableElevation: boolean;
  fullWidth: boolean;
  orientation: ButtonGroupOrientation;
  variant: ButtonGroupVariant;
}): ComputedClasses {
  const { color, disabled, disableElevation, fullWidth, orientation, variant } = ownerState;

  const root = [
    cls('root'),
    cls(variant),
    cls(orientation),
    fullWidth ? cls('fullWidth') : '',
    disableElevation ? cls('disableElevation') : '',
    cls(`color${capitalize(color)}`),
  ]
    .filter(Boolean)
    .join(' ');

  const grouped = [
    cls('grouped'),
    cls(`grouped${capitalize(orientation)}`),
    cls(`grouped${capitalize(variant)}`),
    cls(`grouped${capitalize(variant)}${capitalize(orientation)}`),
    cls(`grouped${capitalize(variant)}${capitalize(color)}`),
    disabled ? cls('disabled') : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    root,
    grouped,
    firstButton: cls('firstButton'),
    lastButton: cls('lastButton'),
    middleButton: cls('middleButton'),
  };
}

// ---------------------------------------------------------------------------
// ButtonGroupItemDirective
// ---------------------------------------------------------------------------

/**
 * Structural directive that marks a button as a member of a ButtonGroup.
 *
 * Apply this directive to every child button inside `<mui-button-group>` so
 * that the parent can detect first / middle / last positions and set the
 * appropriate MUI position classes (`MuiButtonGroup-firstButton`, etc.).
 *
 * React equivalent: each valid child was automatically wrapped in a
 * `<ButtonGroupButtonContext.Provider>` that passed a position class string.
 *
 * Usage:
 * ```html
 * <mui-button-group>
 *   <button muiButtonGroupItem>One</button>
 *   <button muiButtonGroupItem>Two</button>
 *   <button muiButtonGroupItem>Three</button>
 * </mui-button-group>
 * ```
 */
@Directive({
  selector: '[muiButtonGroupItem]',
  standalone: true,
})
export class ButtonGroupItemDirective {
  /** Position class set by the parent ButtonGroupComponent. */
  @HostBinding('class')
  positionClass = '';

  constructor(public readonly elementRef: ElementRef<HTMLElement>) {}
}

// ---------------------------------------------------------------------------
// ButtonGroupComponent
// ---------------------------------------------------------------------------

/**
 * Angular standalone component equivalent of the MUI ButtonGroup React component.
 *
 * Groups related buttons, forwarding shared styling props (color, variant, size,
 * disabled, etc.) down to each child button via `ButtonGroupContextService`, and
 * applies first / middle / last position classes via `ButtonGroupItemDirective`.
 *
 * **Context sharing**
 * React uses `React.createContext` + Provider/Consumer. Angular achieves the same
 * result by providing `ButtonGroupContextService` at the component level:
 * ```
 * providers: [ButtonGroupContextService]
 * ```
 * Each group instance gets its own service instance; child buttons inject it with
 * `@Optional()` to read the shared props.
 *
 * **Root element**
 * The component itself (`<mui-button-group>`) acts as the root element and carries
 * `role="group"` plus all computed MUI CSS classes via `@HostBinding`.
 * React's `component` prop (which swaps the underlying HTML tag) has no direct
 * Angular equivalent; the host element tag is fixed to `<mui-button-group>`.
 *
 * **Styles**
 * The component emits the same CSS class names as the React implementation
 * (`MuiButtonGroup-root`, `MuiButtonGroup-outlined`, etc.) so any existing MUI
 * stylesheet will style it identically.
 *
 * @example
 * ```html
 * <mui-button-group color="primary" variant="outlined" orientation="horizontal">
 *   <button muiButtonGroupItem>One</button>
 *   <button muiButtonGroupItem>Two</button>
 *   <button muiButtonGroupItem>Three</button>
 * </mui-button-group>
 * ```
 */
@Component({
  selector: 'mui-button-group',
  standalone: true,
  imports: [CommonModule, ButtonGroupItemDirective],
  // The component host element itself is the root <div role="group"> equivalent.
  // ng-content projects all child buttons without an extra wrapper element.
  template: `<ng-content></ng-content>`,
  host: { role: 'group' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Provide a fresh ButtonGroupContextService for every ButtonGroup instance so
  // nested groups remain independent (mirrors React context scoping).
  providers: [ButtonGroupContextService],
})
export class ButtonGroupComponent implements OnInit, OnChanges, AfterContentInit {
  /**
   * The color of the component.
   * Supports default theme colors: 'inherit' | 'primary' | 'secondary' |
   * 'error' | 'info' | 'success' | 'warning', or any custom palette key.
   * @default 'primary'
   */
  @Input() color: ButtonGroupColor = 'primary';

  /**
   * If `true`, the component is disabled.
   * Propagated to child buttons via `ButtonGroupContextService`.
   * @default false
   */
  @Input() disabled = false;

  /**
   * If `true`, no elevation (box-shadow) is applied to contained buttons.
   * @default false
   */
  @Input() disableElevation = false;

  /**
   * If `true`, the keyboard-focus ripple is disabled on child buttons.
   * Propagated to child buttons via `ButtonGroupContextService`.
   * @default false
   */
  @Input() disableFocusRipple = false;

  /**
   * If `true`, the ripple effect is disabled on child buttons.
   * Propagated to child buttons via `ButtonGroupContextService`.
   * @default false
   */
  @Input() disableRipple = false;

  /**
   * If `true`, the group (and child buttons) expand to fill 100 % of the
   * container width.
   * @default false
   */
  @Input() fullWidth = false;

  /**
   * Layout orientation of the group.
   * @default 'horizontal'
   */
  @Input() orientation: ButtonGroupOrientation = 'horizontal';

  /**
   * Size of the child buttons.
   * 'small' is equivalent to the dense button styling.
   * @default 'medium'
   */
  @Input() size: ButtonGroupSize = 'medium';

  /**
   * Visual variant shared by all child buttons.
   * @default 'outlined'
   */
  @Input() variant: ButtonGroupVariant = 'outlined';

  /**
   * Additional CSS class name(s) appended to the host element.
   * Equivalent to the React `className` prop.
   */
  @Input() className = '';

  // ContentChildren picks up every [muiButtonGroupItem] descendant so we can
  // assign first / middle / last position classes after content initialises.
  @ContentChildren(ButtonGroupItemDirective, { descendants: true })
  private readonly buttonItems!: QueryList<ButtonGroupItemDirective>;

  private classes!: ComputedClasses;

  /**
   * Binds all computed MUI classes (plus any consumer-supplied `className`)
   * directly onto the host element — equivalent to the React component
   * spreading `className={clsx(classes.root, className)}` onto the root div.
   */
  @HostBinding('class')
  get hostClass(): string {
    return this.classes ? [this.classes.root, this.className].filter(Boolean).join(' ') : '';
  }

  constructor(
    private readonly contextService: ButtonGroupContextService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  // ngOnChanges fires before ngOnInit when inputs are bound; ngOnInit covers
  // the case where the component is rendered with all-default prop values.
  ngOnInit(): void {
    if (!this.classes) {
      this.recompute();
    }
  }

  ngOnChanges(): void {
    this.recompute();
  }

  ngAfterContentInit(): void {
    this.updateButtonPositions();
    // Re-apply position classes whenever projected content changes (e.g. *ngIf
    // conditionally shows/hides buttons).
    this.buttonItems.changes.subscribe(() => {
      this.updateButtonPositions();
      this.cdr.markForCheck();
    });
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Recomputes CSS classes and syncs the context service. */
  private recompute(): void {
    this.classes = computeClasses({
      color: this.color,
      disabled: this.disabled,
      disableElevation: this.disableElevation,
      fullWidth: this.fullWidth,
      orientation: this.orientation,
      variant: this.variant,
    });
    this.syncContext();
  }

  /**
   * Pushes the current prop values into `ButtonGroupContextService` so child
   * Button components can read them.
   *
   * React equivalent:
   * ```jsx
   * const context = React.useMemo(() => ({
   *   className: classes.grouped, color, disabled, ...
   * }), [...]);
   * <ButtonGroupContext.Provider value={context}>
   * ```
   */
  private syncContext(): void {
    const svc = this.contextService;
    svc.className = this.classes?.grouped ?? '';
    svc.color = this.color;
    svc.disabled = this.disabled;
    svc.disableElevation = this.disableElevation;
    svc.disableFocusRipple = this.disableFocusRipple;
    svc.disableRipple = this.disableRipple;
    svc.fullWidth = this.fullWidth;
    svc.size = this.size;
    svc.variant = this.variant;
  }

  /**
   * Iterates over projected `[muiButtonGroupItem]` children and applies the
   * correct position class to each one.
   *
   * React equivalent:
   * ```jsx
   * validChildren.map((child, index) => (
   *   <ButtonGroupButtonContext.Provider
   *     key={index}
   *     value={getButtonPositionClassName(index)}
   *   >
   *     {child}
   *   </ButtonGroupButtonContext.Provider>
   * ))
   * ```
   */
  private updateButtonPositions(): void {
    if (!this.buttonItems) {
      return;
    }
    const items = this.buttonItems.toArray();
    const count = items.length;
    items.forEach((item, index) => {
      item.positionClass = this.getPositionClass(index, count);
    });
  }

  private getPositionClass(index: number, count: number): string {
    const isFirst = index === 0;
    const isLast = index === count - 1;
    if (isFirst && isLast) {
      // Single button — no border-radius trimming needed.
      return '';
    }
    if (isFirst) {
      return this.classes.firstButton;
    }
    if (isLast) {
      return this.classes.lastButton;
    }
    return this.classes.middleButton;
  }
}
