import { parseExpression } from '@babel/parser';
import type {
  ObjectExpression,
  SourceLocation,
  Identifier,
  Expression,
  TemplateElement,
} from '@babel/types';
import {
  Params,
  TailProcessorParams,
  ValueCache,
  validateParams,
  IOptions as IBaseOptions,
} from '@wyw-in-js/processor-utils';
import {
  ValueType,
  type ConstValue,
  type ExpressionValue,
  type LazyValue,
  type Replacements,
  type Rules,
} from '@wyw-in-js/shared';
import { CSSObject } from '@emotion/serialize';
import type { PluginCustomOptions } from '../utils/cssFnValueToVariable';
import { cssFnValueToVariable } from '../utils/cssFnValueToVariable';
import { processCssObject } from '../utils/processCssObject';
import { valueToLiteral } from '../utils/valueToLiteral';
import BaseProcessor from './base-processor';
import { Primitive, TemplateCallback } from './keyframes';
import { cache, css } from '../utils/emotion';

type Theme = { [key: 'unstable_sxConfig' | string]: string | number | Theme };

type VariantData = {
  props: (componentProps: unknown) => boolean | Record<string, string | number | boolean | null>;
  style: object;
  originalExpression?: Exclude<ExpressionValue, ConstValue>;
};

type VariantDataTransformed = {
  props: VariantData['props'];
  className: string;
};

export type WrappedNode =
  | string
  | {
      node: Identifier;
      nonLinaria?: true;
      source: string;
    };

export type IOptions = IBaseOptions & PluginCustomOptions;
type ComponentNames = keyof Exclude<Theme['components'], undefined>;

type ComponentMeta = {
  name?: ComponentNames;
  slot?: string;
  skipVariantsResolver?: boolean;
  skipSx?: boolean;
};

/**
 * WyW-in-JS tag processor responsible for converting complex `styled()()` calls
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
 * For Wyw-in-JS tag processors, we need to implement 3 methods of BaseProcessor -
 * 1. doEvaltimeReplacement
 * 2. build
 * 3. doRuntimeReplacement
 */
export class StyledProcessor extends BaseProcessor {
  variableIdx = 0;

  component?: WrappedNode;

  componentMetaArg?: LazyValue;

  styleArgs: ExpressionValue[] | (TemplateElement | ExpressionValue)[];

  finalVariants: {
    props: Record<string, string | number | boolean | null>;
    className: string;
  }[] = [];

  overrides: Record<string, string> = {};

  counterMap: Map<string, number> = new Map();

  baseClasses: string[] = [];

  collectedStyles: [string, string, ExpressionValue | null][] = [];

  collectedVariables: [string, Expression, boolean][] = [];

  collectedVariants: VariantDataTransformed[] = [];

  originalLocation: SourceLocation | null = null;

  isTemplateTag: boolean;

  constructor(params: Params, ...args: TailProcessorParams) {
    if (params.length <= 2) {
      // no need to do any processing if it is an already transformed call or just a reference.
      throw BaseProcessor.SKIP;
    }
    super([params[0]], ...args);
    validateParams(
      params,
      ['callee', ['call', 'member'], ['call', 'template']],
      `Invalid use of ${this.tagSource.imported} tag.`,
    );
    const [callee, memberOrCall, styleCallOrTemplate] = params;
    const [callType, componentArg, componentMetaArg] = memberOrCall;
    const [, ...styleArgs] = styleCallOrTemplate;
    this.isTemplateTag = styleCallOrTemplate[0] === 'template';
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

    styleArgs.flat().forEach((item) => {
      if ('kind' in item) {
        // push item in dependencies so that they get evaluated and we receive its value in build call.
        this.dependencies.push(item);
      }
    });
    if (callee[0] === 'callee') {
      this.originalLocation = callee[1].loc ?? null;
    }
  }

  getClassName(key = 'base') {
    if (!this.counterMap.has(key)) {
      this.counterMap.set(key, 0);
    }
    const currentCount = this.counterMap.get(key) as number;
    this.counterMap.set(key, currentCount + 1);

    return `${this.className}${key === 'base' ? '' : `-${key}`}${
      currentCount > 0 ? `-${currentCount}` : ''
    }`;
  }

  private generateArtifacts() {
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
      // Wyw-in-JS accesses artifacts array to get the final
      // css definitions which are then exposed to the bundler.
      this.artifacts.push(['css', artifact]);
    });
  }

  private buildForTemplateTag(values: ValueCache): void {
    const templateStrs: string[] = [];
    // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
    templateStrs.raw = [];
    const templateExpressions: Primitive[] = [];
    const { themeArgs } = this.options as IOptions;

    this.styleArgs.flat().forEach((item) => {
      if ('kind' in item) {
        switch (item.kind) {
          case ValueType.FUNCTION: {
            const value = values.get(item.ex.name) as TemplateCallback;
            templateExpressions.push(value(themeArgs));
            break;
          }
          case ValueType.CONST:
            templateExpressions.push(item.value);
            break;
          case ValueType.LAZY: {
            const evaluatedValue = values.get(item.ex.name);
            if (typeof evaluatedValue === 'function') {
              templateExpressions.push(evaluatedValue(themeArgs));
            } else {
              templateExpressions.push(evaluatedValue as Primitive);
            }
            break;
          }
          default:
            break;
        }
      } else if (item.type === 'TemplateElement') {
        templateStrs.push(item.value.cooked as string);
        // @ts-ignore
        templateStrs.raw.push(item.value.raw);
      }
    });
    const cssClassName = css(templateStrs, ...templateExpressions);
    const cssText = cache.registered[cssClassName] as string;

    const baseClass = this.getClassName();
    this.baseClasses.push(baseClass);
    this.collectedStyles.push([baseClass, cssText, null]);
    const variantsAccumulator: VariantData[] = [];
    this.processOverrides(values, variantsAccumulator);
    variantsAccumulator.forEach((variant) => {
      this.processVariant(variant);
    });
    this.generateArtifacts();
  }

  /**
   * There are 2 main phases in Wyw-in-JS's processing, Evaltime and Runtime. During Evaltime, Wyw-in-JS prepares minimal code that gets evaluated to get the actual values of the styled arguments. Here, we mostly want to replace the styled calls with a simple string/object of its classname. This is necessary for class composition. For ex, you could potentially do this -
   * ```js
   * const Component = styled(...)(...)
   * const Component2 = styled()({
   *   [`${Component} &`]: {
   *      color: 'red'
   *   }
   * })
   * ```
   * to further target `Component` rendered inside `Component2`.
   */
  doEvaltimeReplacement() {
    this.replacer(this.astService.stringLiteral(this.asSelector), false);
  }

  /**
   * This is called by Wyw-in-JS after evaluating the code. Here, we
   * get access to the actual values of the `styled` arguments
   * which we can use to generate our styles.
   * Order of processing styles -
   * 1. CSS directly declared in styled call
   * 2. CSS declared in theme object's styledOverrides
   * 3. Variants declared in styled call
   * 3. Variants declared in theme object
   */
  build(values: ValueCache): void {
    if (this.isTemplateTag) {
      this.buildForTemplateTag(values);
      return;
    }
    const themeImportIdentifier = this.astService.addDefaultImport(
      `${process.env.PACKAGE_NAME}/theme`,
      'theme',
    );
    // all the variant definitions are collected here so that we can
    // apply variant styles after base styles for more specific targetting.
    const variantsAccumulator: VariantData[] = [];
    (this.styleArgs as ExpressionValue[]).forEach((styleArg) => {
      this.processStyle(values, styleArg, variantsAccumulator, themeImportIdentifier.name);
    });
    this.processOverrides(values, variantsAccumulator);
    variantsAccumulator.forEach((variant) => {
      this.processVariant(variant);
    });
    this.generateArtifacts();
  }

  /**
   * This is the runtime phase where all of the css have been transformed and we finally want to replace the `styled` call with the code that we want in the final bundle. In this particular case, we replace the `styled` calls with
   * ```js
   * const Component = styled('div')({
   *  displayName: 'Component',
   *  name: 'MuiSlider',
   *  slot: 'root',
   *  classes: ['class', 'class-1', '...'],
   *  vars: {
   *    'var-id': [(props) => props.isRed ? 'red' : 'blue', false],
   *    // ...
   *  },
   *  variants: [{
   *    props: {
   *    },
   *    className: 'class-variant-1',
   *  }],
   *  // ...
   * })
   * ```
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

    const classNames = Array.from(
      new Set([this.className, ...(this.baseClasses.length ? this.baseClasses : [])]),
    );
    argProperties.push(
      t.objectProperty(
        t.identifier('classes'),
        t.arrayExpression(classNames.map((cls) => t.stringLiteral(cls))),
      ),
    );

    const varProperties: ReturnType<typeof t.objectProperty>[] = this.collectedVariables.map(
      ([variableId, expression, isUnitLess]) =>
        t.objectProperty(
          t.stringLiteral(variableId),
          t.arrayExpression([expression, t.booleanLiteral(isUnitLess)]),
        ),
    );
    if (varProperties.length) {
      argProperties.push(t.objectProperty(t.identifier('vars'), t.objectExpression(varProperties)));
    }
    if (this.collectedVariants.length) {
      argProperties.push(
        t.objectProperty(t.identifier('variants'), valueToLiteral(this.collectedVariants)),
      );
    }

    let componentMetaExpression: ObjectExpression | undefined;

    if (this.componentMetaArg) {
      const parsedMeta = parseExpression(this.componentMetaArg.source);
      if (parsedMeta.type === 'ObjectExpression') {
        componentMetaExpression = parsedMeta as ObjectExpression;
      }
    }

    const styledImportIdentifier = t.addNamedImport(
      this.tagSource.imported,
      process.env.PACKAGE_NAME as string,
    );
    const styledCall = t.callExpression(
      styledImportIdentifier,
      componentMetaExpression ? [componentName, componentMetaExpression] : [componentName],
    );
    const mainCall = t.callExpression(styledCall, [t.objectExpression(argProperties)]);
    this.replacer(mainCall, true);
  }

  /**
   * Generates css for object directly provided as arguments in the styled call.
   */
  processStyle(
    values: ValueCache,
    styleArg: ExpressionValue,
    variantsAccumulator?: VariantData[],
    themeImportIdentifier?: string,
  ) {
    if (styleArg.kind === ValueType.CONST) {
      if (typeof styleArg.value === 'string') {
        this.collectedStyles.push([this.getClassName(), styleArg.value, styleArg]);
      }
    } else {
      const styleObjOrFn = values.get(styleArg.ex.name);
      const finalStyle = this.processCss(
        styleObjOrFn as object | (() => void),
        styleArg,
        variantsAccumulator,
        themeImportIdentifier,
      );
      const className = this.getClassName();
      this.baseClasses.push(className);
      this.collectedStyles.push([className, finalStyle, styleArg]);
    }
  }

  /**
   * Generates css for styleOverride objects in the theme object.
   */
  processOverrides(values: ValueCache, variantsAccumulator?: VariantData[]) {
    if (!this.componentMetaArg) {
      return;
    }
    const value = values.get(this.componentMetaArg.ex.name) as ComponentMeta;
    const { themeArgs: { theme } = {} } = this.options as IOptions;
    if (!value.name || !value.slot || !theme) {
      return;
    }
    const componentData = theme.components?.[value.name];
    if (!componentData) {
      return;
    }

    if ('styleOverrides' in componentData) {
      const overrides = componentData.styleOverrides as Record<string, CSSObject>;
      if (!overrides) {
        return;
      }
      const overrideStyle = (overrides[value.slot.toLowerCase()] || overrides[value.slot]) as
        | string
        | CSSObject;
      const className = this.getClassName();
      if (typeof overrideStyle === 'string') {
        this.collectedStyles.push([className, overrideStyle, null]);
        return;
      }
      const finalStyle = this.processCss(overrideStyle, null, variantsAccumulator);
      this.baseClasses.push(className);
      this.collectedStyles.push([className, finalStyle, null]);
    }

    if (!variantsAccumulator) {
      return;
    }

    if (
      'variants' in componentData &&
      componentData.variants &&
      value.slot.toLowerCase() === 'root'
    ) {
      variantsAccumulator.push(...(componentData.variants as unknown as VariantData[]));
    }
  }

  /**
   * Generates css for all the variants collected after processing direct css and styleOverride css.
   */
  processVariant(variant: VariantData) {
    const { displayName } = this.options;
    const className = this.getClassName(displayName ? 'variant' : undefined);
    const styleObjOrFn = variant.style;
    const originalExpression = variant.originalExpression;
    const finalStyle = this.processCss(styleObjOrFn, originalExpression ?? null);
    this.collectedStyles.push([className, finalStyle, null]);
    this.collectedVariants.push({
      props: variant.props,
      className,
    });
  }

  processCss(
    styleObjOrFn: ((args: Record<string, unknown>) => void) | object,
    styleArg: ExpressionValue | null,
    variantsAccumulator?: VariantData[],
    themeImportIdentifier?: string,
  ) {
    const { themeArgs = {} } = this.options as IOptions;
    const styleObj = typeof styleObjOrFn === 'function' ? styleObjOrFn(themeArgs) : styleObjOrFn;
    if (!styleObj) {
      return '';
    }
    if (styleObj.variants) {
      variantsAccumulator?.push(
        ...styleObj.variants.map((variant: Omit<VariantData, 'originalExpression'>) => ({
          ...variant,
          originalExpression: styleArg,
        })),
      );
    }
    delete styleObj.variants;
    const res = cssFnValueToVariable({
      styleObj,
      expressionValue: styleArg,
      getVariableName: (cssKey: string, source: string, hasUnit: boolean) =>
        this.getCustomVariableId(cssKey, source, hasUnit),
      filename: this.context.filename,
      options: this.options as IOptions,
      includeThemeArg: typeof styleObjOrFn === 'function',
      themeImportIdentifier,
    });
    if (res.length) {
      this.collectedVariables.push(...res);
    }
    return processCssObject(styleObj, themeArgs);
  }

  public override get asSelector(): string {
    return `.${this.className}`;
  }

  get value(): Expression {
    const t = this.astService;
    return t.stringLiteral(this.className);
  }
}
