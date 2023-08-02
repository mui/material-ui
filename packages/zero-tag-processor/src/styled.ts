import { BaseProcessor, buildSlug, toValidCSSIdentifier, validateParams } from '@linaria/tags';
import type {
  Expression,
  Params,
  TailProcessorParams,
  ValueCache,
  IOptions as IBaseOptions,
  WrappedNode,
} from '@linaria/tags';
import { ValueType, slugify } from '@linaria/utils';
import type {
  IVariableContext,
  Rules,
  Replacements,
  ExpressionValue,
  LazyValue,
} from '@linaria/utils';
import type { Theme } from '@mui/material/styles';
import type { ParseResult } from '@babel/parser';
import { parseExpression } from '@babel/parser';
import type { SourceLocation } from '@babel/types';
import cssFnValueToVariable from './utils/cssFnValueToVariable';
import processCssObject from './utils/processCssObject';
import valueToLiteral from './utils/valueToLiteral';

type VariantData = {
  props: Record<string, string | number | boolean | null>;
  style: object;
};

type VariantDataTransformed = {
  props: Record<string, string | number | boolean | null>;
  className: string;
};

export type CustomOptions = {
  themeArgs?: {
    theme: Theme;
  };
};

type IOptions = IBaseOptions & CustomOptions;
type ComponentNames = keyof Exclude<Theme['components'], undefined>;

type ComponentMeta = {
  name?: ComponentNames;
  // slot?: string;
  skipVariantsResolver?: boolean;
  skipSx?: boolean;
};

/**
 * Linaria tag processor responsible for converting complex `styled()()` calls
 * at build-time to simple `styled` calls supported by runtime.
 *
 * Ex -
 * ```
 * const SliderTrack = styled('h4', {
 *   name: 'MuiSlider',
 *   slot: 'Track',
 *   overridesResolver: (props, styles) => styles.track,
 * })({
 *   fontSize: 13,
 *   color: (props) => (props.isRed ? 'red' : 'blue'),
 * });
 * ```
 *
 * gets converted to a simple styled call with no nested calls -
 *
 * ```
 * const SliderTrack = styled('h4', {
 *   classes: ['h13ydq1s'],
 *   vars: { 'b1xyu9xj-0': [(t) => (t.isRed ? 'red' : 'blue'), !1] },
 *   variants: [],
 *   name: 'MuiSlider',
 *   slot: 'Track',
 *   overridesResolver: (t, o) => o.track,
 *   overrideStyles: {}
 * })
 * ```
 *
 * and this css
 * ```css
 * .h13ydq1s {
 *   fontSize: 13px,
 *   color: var(--b1xyu9xj-0);
 * }
 * ```
 *
 * For linaria tag processors, we need to implement 3 methods of BaseProcessor -
 * 1. doEvaltimeReplacement
 * 2. build
 * 3. doRuntimeReplacement
 */
export default class StyledProcessor extends BaseProcessor {
  variableIdx = 0;

  component?: WrappedNode;

  componentMetaArg?: LazyValue;

  styleArgs: ExpressionValue[];

  finalVariants: {
    props: Record<string, string | number | boolean | null>;
    className: string;
  }[] = [];

  overrides: Record<string, string> = {};

  counterMap: Map<string, number> = new Map();

  baseClasses: string[] = [];

  collectedStyles: [string, string, ExpressionValue | null][] = [];

  collectedVariables: [string, ParseResult<Expression>, boolean][] = [];

  collectedOverrides: [string, string][] = [];

  collectedVariants: VariantDataTransformed[] = [];

  originalLocation: SourceLocation | null = null;

  defaultProps: Record<string, string | number | boolean | unknown> = {};

  constructor(params: Params, ...args: TailProcessorParams) {
    super(params, ...args);
    validateParams(params, ['callee', '*', '...'], BaseProcessor.SKIP);
    validateParams(params, ['callee', ['call', 'member'], ['call', 'template']], 'Invalid params');
    // console.log(params);
    const [call, memberOrCall, styleCall] = params;
    const [callType, componentArg, componentMetaArg] = memberOrCall;
    const [, ...styleArgs] = styleCall;
    this.componentMetaArg =
      componentMetaArg && componentMetaArg.kind === ValueType.LAZY ? componentMetaArg : undefined;
    this.styleArgs = styleArgs as ExpressionValue[];

    if (callType === 'member') {
      this.component = componentArg;
    } else {
      switch (componentArg.kind) {
        case ValueType.CONST:
          this.component = typeof componentArg.value === 'string' ? componentArg.value : undefined;
          break;
        case ValueType.LAZY:
          this.component = {
            node: componentArg.ex,
            source: componentArg.source,
          };
          this.dependencies.push(componentArg);
          break;
        default:
          this.component = 'FunctionalComponent';
          break;
      }
      if (componentMetaArg && componentMetaArg.kind !== ValueType.FUNCTION) {
        this.dependencies.push(componentMetaArg);
      }
    }
    if (!this.component) {
      throw new Error('Invalid usage of `styled` tag');
    }
    styleArgs.forEach((item) => {
      if (!Array.isArray(item)) {
        if ('kind' in item) {
          this.dependencies.push(item);
        }
      }
    });
    if (call[0] === 'callee') {
      this.originalLocation = call[1].loc ?? null;
    }
  }

  getClassName(key?: string) {
    const mapKey = key ?? 'base';
    if (!this.counterMap.has(mapKey)) {
      this.counterMap.set(mapKey, 0);
    }
    const currentCount = this.counterMap.get(mapKey) as number;
    this.counterMap.set(mapKey, currentCount + 1);

    return `${this.className}${mapKey === 'base' ? '' : `-${mapKey}`}${
      currentCount > 0 ? `-${currentCount}` : ''
    }`;
  }

  doEvaltimeReplacement(): void {
    this.replacer(this.value, false);
  }

  /**
   * Order of processing styles -
   * 1. CSS directly declared in styled call
   * 2. CSS declared in theme object's styledOverrides
   * 3. Variants declared in styled call
   * 3. Variants declared in theme object
   */
  build(values: ValueCache): void {
    const variantsAccumulator: VariantData[] = [];
    this.styleArgs.forEach((styleArg) => {
      this.processStyle(values, styleArg, variantsAccumulator);
    });
    this.processOverrides(values, variantsAccumulator);
    variantsAccumulator.forEach((variant) => {
      this.processVariant(variant);
    });
    const artifacts: [Rules, Replacements][] = this.collectedStyles.map(([className, cssText]) => {
      const rules: Rules = {
        [`.${className}`]: {
          className,
          cssText,
          displayName: this.displayName,
          start: this.location?.start ?? null,
        },
      };
      // @TODO - Refactor for finer location tracking in original code.
      const replacements: Replacements = [
        {
          length: cssText.length,
          original: {
            start: {
              column: this.location?.start.column ?? 0,
              line: this.location?.start.line ?? 0,
            },
            end: {
              column: this.location?.end.column ?? 0,
              line: this.location?.end.line ?? 0,
            },
          },
        },
      ];
      return [rules, replacements];
    });
    artifacts.forEach((artifact) => {
      // linaria accesses artifacts array to get the final
      // css definitions which are then exposed to the bundler.
      this.artifacts.push(['css', artifact]);
    });
  }

  /**
   * This replaces the original styled call during bundling.
   */
  doRuntimeReplacement(): void {
    const t = this.astService;
    let componentName: Expression;
    if (typeof this.component === 'string') {
      if (this.component === 'FunctionalComponent') {
        componentName = t.arrowFunctionExpression([], t.blockStatement([]));
      } else {
        componentName = t.stringLiteral(this.component);
      }
    } else if (this.component?.node) {
      componentName = t.callExpression(t.identifier(this.component.node.name), []);
    } else {
      componentName = t.nullLiteral();
    }
    const argProperties: ReturnType<
      typeof t.objectProperty | typeof t.spreadElement | typeof t.objectMethod
    >[] = [];
    argProperties.push(
      t.objectProperty(
        t.identifier('classes'),
        t.arrayExpression(this.baseClasses.map((cls) => t.stringLiteral(cls))),
      ),
    );

    const varProperties: ReturnType<typeof t.objectProperty>[] = this.collectedVariables.map(
      ([variableId, expression, isUnitLess]) =>
        t.objectProperty(
          t.stringLiteral(variableId),
          t.arrayExpression([expression, t.booleanLiteral(isUnitLess)]),
        ),
    );
    argProperties.push(t.objectProperty(t.identifier('vars'), t.objectExpression(varProperties)));
    argProperties.push(
      t.objectProperty(t.identifier('variants'), valueToLiteral(this.collectedVariants)),
    );
    if (this.componentMetaArg) {
      const parsedMeta = parseExpression(this.componentMetaArg.source);
      if (parsedMeta.type === 'ObjectExpression') {
        argProperties.push(...parsedMeta.properties);
      }
    }
    if (this.defaultProps && Object.keys(this.defaultProps).length > 0) {
      argProperties.push(
        t.objectProperty(t.identifier('defaultProps'), valueToLiteral(this.defaultProps)),
      );
    }
    this.replacer(
      t.callExpression(t.identifier('styled'), [componentName, t.objectExpression(argProperties)]),
      true,
    );
  }

  processStyle(values: ValueCache, styleArg: ExpressionValue, variantsAccumulator?: VariantData[]) {
    if (styleArg.kind === ValueType.CONST) {
      if (typeof styleArg.value === 'string') {
        this.collectedStyles.push([this.getClassName(), styleArg.value, styleArg]);
      }
    } else {
      const styleObjOrFn = values.get(styleArg.ex.name);
      const finalStyle = this.processCss(
        styleObjOrFn as object | Function,
        styleArg,
        variantsAccumulator,
      );
      const className = this.getClassName();
      this.baseClasses.push(className);
      this.collectedStyles.push([className, finalStyle, styleArg]);
    }
  }

  processVariant(variant: VariantData) {
    const { displayName } = this.options;
    const className = this.getClassName(displayName ? 'variant' : undefined);
    const styleObjOrFn = variant.style;
    const finalStyle = this.processCss(styleObjOrFn, null);
    this.collectedStyles.push([className, finalStyle, null]);
    this.collectedVariants.push({
      props: variant.props,
      className,
    });
  }

  processCss(
    styleObjOrFn: Function | object,
    styleArg: ExpressionValue | null,
    variantsAccumulator?: VariantData[],
  ) {
    const { themeArgs } = this.options as IOptions;
    const styleObj = typeof styleObjOrFn === 'function' ? styleObjOrFn(themeArgs) : styleObjOrFn;
    if (styleObj.variants) {
      variantsAccumulator?.push(...styleObj.variants);
      delete styleObj.variants;
    }
    const res = cssFnValueToVariable(
      styleObj,
      styleArg,
      (cssKey: string, source: string, hasUnit: boolean) =>
        this.getCustomVariableId(cssKey, source, hasUnit),
    );
    if (res.length) {
      this.collectedVariables.push(...res);
    }
    return processCssObject(styleObj, themeArgs);
  }

  processOverrides(values: ValueCache, variantsAccumulator?: VariantData[]) {
    if (!this.componentMetaArg) {
      return;
    }
    const value = values.get(this.componentMetaArg.ex.name) as ComponentMeta;
    const { themeArgs: { theme } = {} } = this.options as IOptions;
    if (!value.name || !theme) {
      return;
    }
    const componentData = theme.components?.[value.name];
    if (!componentData) {
      return;
    }
    if ('styleOverrides' in componentData) {
      const overrides = componentData.styleOverrides;
      if (overrides && typeof overrides !== 'string') {
        Object.entries(overrides).forEach(([key, overrideStyle]) => {
          if (typeof overrideStyle === 'string') {
            const className = this.getClassName();
            this.collectedOverrides.push([key, className]);
            this.collectedStyles.push([className, overrideStyle, null]);
            return;
          }
          const finalStyle = this.processCss(overrideStyle, null, variantsAccumulator);
          const className = this.getClassName();
          this.collectedOverrides.push([key, className]);
          this.baseClasses.push(className);
          this.collectedStyles.push([className, finalStyle, null]);
        });
      }
    }
    if (!variantsAccumulator) {
      return;
    }
    if ('variants' in componentData && componentData.variants) {
      variantsAccumulator.push(...(componentData.variants as unknown as VariantData[]));
    }
    if ('defaultProps' in componentData && componentData.defaultProps) {
      this.defaultProps = componentData.defaultProps;
    }
  }

  // Implementation taken from Linaria - https://github.com/callstack/linaria/blob/master/packages/react/src/processors/styled.ts#L284
  protected getCustomVariableId(cssKey: string, source: string, hasUnit: boolean) {
    const context = this.getVariableContext(cssKey, source, hasUnit);
    const customSlugFn = this.options.variableNameSlug;
    if (!customSlugFn) {
      return toValidCSSIdentifier(`${this.slug}-${context.index}`);
    }

    return typeof customSlugFn === 'function'
      ? customSlugFn(context)
      : buildSlug(customSlugFn, context);
  }

  // Implementation taken from Linaria - https://github.com/callstack/linaria/blob/master/packages/react/src/processors/styled.ts#L362
  protected getVariableContext(cssKey: string, source: string, hasUnit: boolean): IVariableContext {
    const getIndex = () => {
      // eslint-disable-next-line no-plusplus
      return this.variableIdx++;
    };

    return {
      componentName: this.displayName,
      componentSlug: this.slug,
      get index() {
        return getIndex();
      },
      precedingCss: cssKey,
      processor: this.constructor.name,
      source: '',
      unit: '',
      valueSlug: slugify(`${source}${hasUnit}`),
    };
  }

  public override get asSelector(): string {
    return `.${this.className}`;
  }

  get value(): Expression {
    const t = this.astService;
    let extendsNode: string | null = null;
    if (typeof this.component !== 'string' && this.component?.node.name) {
      extendsNode = this.component.node.name;
    }
    const newNode = t.objectExpression([
      t.objectProperty(t.identifier('displayName'), t.stringLiteral(this.displayName)),
      t.objectProperty(
        t.identifier('__linaria'),
        t.objectExpression([
          t.objectProperty(t.identifier('className'), t.stringLiteral(this.className)),
          t.objectProperty(
            t.stringLiteral('extends'),
            extendsNode ? t.callExpression(t.identifier(extendsNode), []) : t.nullLiteral(),
          ),
        ]),
      ),
    ]);
    return newNode;
  }
}
