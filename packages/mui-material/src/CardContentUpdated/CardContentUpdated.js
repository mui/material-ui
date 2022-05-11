import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getCardContentUpdatedUtilityClass } from './cardContentUpdatedClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardContentUpdatedUtilityClass, classes);
};

const CardContentRoot = styled('div', {
  name: 'MuiCardContentUpdated',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(() => {
  return {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24,
    },
  };
});

const CardContentUpdated = React.forwardRef(function CardContent(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCardContentUpdated',
  });

  const { className, component = 'div', ...other } = props;

  const ownerState = { ...props, component };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardContentRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

CardContentUpdated.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * @ignore
   */
  component: PropTypes.oneOfType([
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
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default CardContentUpdated;
