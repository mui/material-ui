import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_forwardRef as forwardRef } from '@material-ui/utils';
import useSwitch, { UseSwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';

export interface SwitchUnstyledRootProps {
  type?: string;
  className?: string;
}

export interface SwitchUnstyledThumbProps {
  className?: string;
}

export interface SwitchUnstyledInputProps {
  type?: string;
  className?: string;
}

export interface SwitchUnstyledProps<
  TRoot extends React.ElementType,
  TThumb extends React.ElementType,
  TInput extends 'input' | React.ComponentType,
> extends UseSwitchProps {
  components?: {
    Root?: TRoot;
    Thumb?: TThumb;
    Input?: TInput;
  };

  componentsProps?: {
    root?: React.ComponentPropsWithRef<TRoot>;
    thumb?: React.ComponentPropsWithRef<TThumb>;
    input?: React.ComponentPropsWithRef<TInput>;
  };
}
/**
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [SwitchUnstyled API](https://material-ui.com/api/switch-unstyled/)
 */
const SwitchUnstyled = forwardRef(function SwitchUnstyled<
  TRoot extends React.ElementType = 'span',
  TThumb extends React.ElementType = 'span',
  TInput extends 'input' | React.ComponentType = 'input',
>(props: SwitchUnstyledProps<TRoot, TThumb, TInput>, ref: React.ForwardedRef<any>) {
  const { components = {}, componentsProps = {}, ...otherProps } = props;

  const Root: React.ElementType = components.Root ?? 'span';
  const rootProps: SwitchUnstyledRootProps = componentsProps.root ?? {};

  const Thumb: React.ElementType = components.Thumb ?? 'span';
  const thumbProps: SwitchUnstyledThumbProps = componentsProps.thumb ?? {};

  const Input: React.ElementType = components.Input ?? 'input';
  const inputProps: SwitchUnstyledInputProps =
    componentsProps.input ?? ({} as SwitchUnstyledInputProps);

  const { getInputProps, getRootProps, isChecked, isDisabled, hasVisibleFocus } = useSwitch({
    ...otherProps,
  });

  const stateClasses = {
    [classes.checked]: isChecked,
    [classes.disabled]: isDisabled,
    [classes.focusVisible]: hasVisibleFocus,
  };

  return (
    <Root
      ref={ref}
      {...otherProps}
      {...getRootProps(rootProps)}
      className={clsx(classes.root, stateClasses, rootProps.className)}
    >
      <Thumb {...thumbProps} className={clsx(classes.thumb, thumbProps.className)} />
      <Input
        type="checkbox"
        {...getInputProps(inputProps)}
        className={clsx(classes.input, inputProps.className)}
      />
    </Root>
  );
});

// TODO: restrict intrinsic elements that can go into slots

// @ts-ignore

SwitchUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  components: PropTypes.shape({
    Input: PropTypes.oneOfType([PropTypes.oneOf(['input']), PropTypes.func]),
    Root: PropTypes.oneOfType([
      PropTypes.oneOf([
        'a',
        'abbr',
        'address',
        'animate',
        'animateMotion',
        'animateTransform',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'base',
        'bdi',
        'bdo',
        'big',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'circle',
        'cite',
        'clipPath',
        'code',
        'col',
        'colgroup',
        'data',
        'datalist',
        'dd',
        'defs',
        'del',
        'desc',
        'details',
        'dfn',
        'dialog',
        'div',
        'dl',
        'dt',
        'ellipse',
        'em',
        'embed',
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence',
        'fieldset',
        'figcaption',
        'figure',
        'filter',
        'footer',
        'foreignObject',
        'form',
        'g',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'iframe',
        'image',
        'img',
        'input',
        'ins',
        'kbd',
        'keygen',
        'label',
        'legend',
        'li',
        'line',
        'linearGradient',
        'link',
        'main',
        'map',
        'mark',
        'marker',
        'mask',
        'menu',
        'menuitem',
        'meta',
        'metadata',
        'meter',
        'mpath',
        'nav',
        'noindex',
        'noscript',
        'object',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'param',
        'path',
        'pattern',
        'picture',
        'polygon',
        'polyline',
        'pre',
        'progress',
        'q',
        'radialGradient',
        'rect',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'script',
        'section',
        'select',
        'slot',
        'small',
        'source',
        'span',
        'stop',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'svg',
        'switch',
        'symbol',
        'table',
        'tbody',
        'td',
        'template',
        'text',
        'textarea',
        'textPath',
        'tfoot',
        'th',
        'thead',
        'time',
        'title',
        'tr',
        'track',
        'tspan',
        'u',
        'ul',
        'use',
        'var',
        'video',
        'view',
        'wbr',
        'webview',
      ]),
      PropTypes.func,
    ]),
    Thumb: PropTypes.oneOfType([
      PropTypes.oneOf([
        'a',
        'abbr',
        'address',
        'animate',
        'animateMotion',
        'animateTransform',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'base',
        'bdi',
        'bdo',
        'big',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'circle',
        'cite',
        'clipPath',
        'code',
        'col',
        'colgroup',
        'data',
        'datalist',
        'dd',
        'defs',
        'del',
        'desc',
        'details',
        'dfn',
        'dialog',
        'div',
        'dl',
        'dt',
        'ellipse',
        'em',
        'embed',
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence',
        'fieldset',
        'figcaption',
        'figure',
        'filter',
        'footer',
        'foreignObject',
        'form',
        'g',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'iframe',
        'image',
        'img',
        'input',
        'ins',
        'kbd',
        'keygen',
        'label',
        'legend',
        'li',
        'line',
        'linearGradient',
        'link',
        'main',
        'map',
        'mark',
        'marker',
        'mask',
        'menu',
        'menuitem',
        'meta',
        'metadata',
        'meter',
        'mpath',
        'nav',
        'noindex',
        'noscript',
        'object',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'param',
        'path',
        'pattern',
        'picture',
        'polygon',
        'polyline',
        'pre',
        'progress',
        'q',
        'radialGradient',
        'rect',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'script',
        'section',
        'select',
        'slot',
        'small',
        'source',
        'span',
        'stop',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'svg',
        'switch',
        'symbol',
        'table',
        'tbody',
        'td',
        'template',
        'text',
        'textarea',
        'textPath',
        'tfoot',
        'th',
        'thead',
        'time',
        'title',
        'tr',
        'track',
        'tspan',
        'u',
        'ul',
        'use',
        'var',
        'video',
        'view',
        'wbr',
        'webview',
      ]),
      PropTypes.func,
    ]),
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.object,
} as any;

export default SwitchUnstyled;
