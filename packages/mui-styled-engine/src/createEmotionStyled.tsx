'use client';
/* eslint-disable no-underscore-dangle */
// Adapted from @emotion/styled/base 11.14.1 (MIT License, Copyright (c) Emotion team and other contributors)
// https://github.com/emotion-js/emotion/blob/main/packages/styled/src/base.tsx
// It renders the same markup and class names, and only differs in how the styles are serialized:
// the resolved style values are looked up in a cache keyed by their identity before Emotion
// serializes and hashes them.
import * as React from 'react';
import { withEmotionCache, ThemeContext } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { useInsertionEffectAlwaysWithSyncFallback } from '@emotion/use-insertion-effect-with-fallbacks';
import { getRegisteredStyles, registerStyles, insertStyles } from '@emotion/utils';
import isPropValid from '@emotion/is-prop-valid';

type SerializedStyles = ReturnType<typeof serializeStyles>;

function testOmitPropsOnComponent(key: string) {
  return key !== 'theme';
}

function getDefaultShouldForwardProp(tag: any) {
  // 96 is one less than the char code for "a", so this checks for a lowercase character
  return typeof tag === 'string' && tag.charCodeAt(0) > 96 ? isPropValid : testOmitPropsOnComponent;
}

function composeShouldForwardProps(tag: any, options: any, isReal: boolean) {
  let shouldForwardProp: ((propName: string) => boolean) | undefined;

  if (options) {
    const optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp =
      tag.__emotion_forwardProp && optionsShouldForwardProp
        ? (propName: string) =>
            tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName)
        : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
}

function Insertion({
  cache,
  serialized,
  isStringTag,
}: {
  cache: any;
  serialized: SerializedStyles;
  isStringTag: boolean;
}) {
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(() => insertStyles(cache, serialized, isStringTag));

  return null;
}

/**
 * A node of the serialization cache. The resolved style values of a render are walked one at a
 * time: primitives through `primitives`, objects through `objects`.
 */
interface CacheNode {
  primitives?: Map<unknown, CacheNode> | undefined;
  objects?: WeakMap<object, CacheNode> | undefined;
  serialized?: SerializedStyles | undefined;
}

// A node stops caching new primitives past this many, so values that never repeat (a color per
// instance, for example) cannot grow it without bound.
const MAX_PRIMITIVES_PER_NODE = 100;

const ARRAY_START = {};
const ARRAY_END = {};

/**
 * Walks `node` to the child for `value`, creating it when needed. Returns `null` when the value
 * cannot be part of a cache key.
 */
function childNode(node: CacheNode, value: unknown): CacheNode | null {
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    node.objects ??= new WeakMap();
    let child = node.objects.get(value);
    if (!child) {
      child = {};
      node.objects.set(value, child);
    }
    return child;
  }

  node.primitives ??= new Map();
  let child = node.primitives.get(value);
  if (!child) {
    if (node.primitives.size >= MAX_PRIMITIVES_PER_NODE) {
      return null;
    }
    child = {};
    node.primitives.set(value, child);
  }
  return child;
}

/**
 * Walks `node` through a resolved interpolation. Returns `null` when its serialization can't be
 * cached by identity: a plain style object, or a function Emotion would still call.
 */
function walkInterpolation(node: CacheNode | null, value: any): CacheNode | null {
  if (node === null) {
    return null;
  }
  if (value == null || typeof value !== 'object') {
    // A function here is a component selector, which Emotion turns into its class name.
    if (typeof value === 'function' && value.__emotion_styles === undefined) {
      return null;
    }
    return childNode(node, value);
  }
  if (Array.isArray(value)) {
    let current: CacheNode | null = childNode(node, ARRAY_START);
    for (let i = 0; i < value.length && current !== null; i += 1) {
      current = walkInterpolation(current, value[i]);
    }
    return current === null ? null : childNode(current, ARRAY_END);
  }
  // Serialized styles and keyframes. Anything else is a style object, which can be a new object on
  // every render, or be mutated.
  if (value.styles !== undefined) {
    return childNode(node, value);
  }
  return null;
}

const cacheRoots = new WeakMap<object, WeakMap<object, CacheNode>>();

function getCacheRoot(emotionCache: any, styles: any[]): CacheNode {
  let roots = cacheRoots.get(emotionCache.registered);
  if (!roots) {
    roots = new WeakMap();
    cacheRoots.set(emotionCache.registered, roots);
  }
  let root = roots.get(styles);
  if (!root) {
    root = {};
    roots.set(styles, root);
  }
  return root;
}

/**
 * Serializes `styles` the way Emotion's `styled` does, reusing the result of a previous render
 * when every resolved value is identical.
 */
function serializeWithCache(
  emotionCache: any,
  styles: any[],
  classInterpolations: string[],
  mergedProps: any,
): SerializedStyles {
  const resolved: any[] = new Array(styles.length + classInterpolations.length);
  let node: CacheNode | null = getCacheRoot(emotionCache, styles);

  for (let i = 0; i < styles.length; i += 1) {
    let value = styles[i];
    // The first value can be the strings of a tagged template, which never change.
    if (i > 0 || value == null || value.raw === undefined) {
      if (typeof value === 'function' && value.__emotion_styles === undefined) {
        value = value(mergedProps);
      }
      node = walkInterpolation(node, value);
    }
    resolved[i] = value;
  }
  for (let i = 0; i < classInterpolations.length; i += 1) {
    resolved[styles.length + i] = classInterpolations[i];
    node = walkInterpolation(node, classInterpolations[i]);
  }

  if (node !== null && node.serialized !== undefined) {
    return copySerialized(node.serialized);
  }

  const serialized = serializeStyles(resolved, emotionCache.registered, mergedProps);
  if (node !== null) {
    node.serialized = copySerialized(serialized);
  }
  return serialized;
}

/**
 * Emotion creates new serialized styles on every render, and a cache's `insert` may change the
 * object it receives (`StyledEngineProvider` wraps `styles` in a CSS layer). The cache keeps its
 * own copy and hands out a new one every time.
 */
function copySerialized(serialized: SerializedStyles): SerializedStyles {
  return {
    name: serialized.name,
    styles: serialized.styles,
    next: serialized.next === undefined ? undefined : copySerialized(serialized.next),
  };
}

export default function createEmotionStyled(tag: any, options?: any): (...args: any[]) => any {
  if (tag === undefined) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
    );
  }

  const isReal = tag.__emotion_real === tag;
  const baseTag = (isReal && tag.__emotion_base) || tag;
  let identifierName: string | undefined;
  let targetClassName: string | undefined;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  const shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  const defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  const shouldUseAs = !defaultShouldForwardProp('as');

  return function createStyledComponent(...args: any[]) {
    const styles: any[] =
      isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`);
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push(...args);
    } else {
      const templateStringsArr = args[0];
      styles.push(templateStringsArr[0]);
      for (let i = 1; i < args.length; i += 1) {
        styles.push(args[i], templateStringsArr[i]);
      }
    }

    const Styled: any = withEmotionCache((props: any, cache: any, ref: any) => {
      const FinalTag = (shouldUseAs && props.as) || baseTag;
      let className = '';
      const classInterpolations: string[] = [];
      let mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};
        // eslint-disable-next-line guard-for-in
        for (const key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = React.useContext(ThemeContext);
      }

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = `${props.className} `;
      }

      const serialized = serializeWithCache(cache, styles, classInterpolations, mergedProps);
      className += `${cache.key}-${serialized.name}`;

      if (targetClassName !== undefined) {
        className += ` ${targetClassName}`;
      }

      const finalShouldForwardProp =
        shouldUseAs && shouldForwardProp === undefined
          ? getDefaultShouldForwardProp(FinalTag)
          : defaultShouldForwardProp;
      const newProps: any = {};

      for (const key in props) {
        if (shouldUseAs && key === 'as') {
          continue;
        }
        if (finalShouldForwardProp(key)) {
          newProps[key] = props[key];
        }
      }

      newProps.className = className;

      if (ref) {
        newProps.ref = ref;
      }

      return (
        <React.Fragment>
          <Insertion
            cache={cache}
            serialized={serialized}
            isStringTag={typeof FinalTag === 'string'}
          />
          <FinalTag {...newProps} />
        </React.Fragment>
      );
    });

    Styled.displayName =
      identifierName !== undefined
        ? identifierName
        : `Styled(${
            typeof baseTag === 'string'
              ? baseTag
              : baseTag.displayName || baseTag.name || 'Component'
          })`;
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;

    Object.defineProperty(Styled, 'toString', {
      value() {
        if (targetClassName === undefined && process.env.NODE_ENV !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        }
        return `.${targetClassName}`;
      },
    });

    Styled.withComponent = (nextTag: any, nextOptions?: any) => {
      const newStyled = createEmotionStyled(nextTag, {
        ...options,
        ...nextOptions,
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true),
      });
      return newStyled(...styles);
    };

    return Styled;
  };
}
