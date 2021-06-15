import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '../styles/styled';

const NotchedOutlineRoot = styled('fieldset')({
  textAlign: 'left',
  position: 'absolute',
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: '0 8px',
  pointerEvents: 'none',
  borderRadius: 'inherit',
  borderStyle: 'solid',
  borderWidth: 1,
  overflow: 'hidden',
  minWidth: '0%',
});

const NotchedOutlineLegend = styled('legend', { skipSx: true })(({ styleProps, theme }) => ({
  ...(styleProps.label === undefined && {
    padding: 0,
    lineHeight: '11px', // sync with `height` in `legend` styles
    transition: theme.transitions.create('width', {
      duration: 150,
      easing: theme.transitions.easing.easeOut,
    }),
  }),
  ...(styleProps.label !== undefined && {
    display: 'block',
    width: 'auto',
    padding: 0,
    height: 11, // sync with `lineHeight` in `legend` styles
    fontSize: '0.75em',
    visibility: 'hidden',
    maxWidth: 0.01,
    transition: theme.transitions.create('max-width', {
      duration: 50,
      easing: theme.transitions.easing.easeOut,
    }),
    '& > span': {
      paddingLeft: 5,
      paddingRight: 5,
      display: 'inline-block',
    },
    ...(styleProps.notched && {
      maxWidth: '100%',
      transition: theme.transitions.create('max-width', {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50,
      }),
    }),
  }),
}));

/**
 * @ignore - internal component.
 */
export default function NotchedOutline(props) {
  const { children, classes, className, label, notched, ...other } = props;
  const styleProps = {
    ...props,
    notched,
    label,
  };
  return (
    <NotchedOutlineRoot aria-hidden className={className} styleProps={styleProps} {...other}>
      <NotchedOutlineLegend styleProps={styleProps}>
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {label ? (
          <span>{label}</span>
        ) : (
          // notranslate needed while Google Translate will not fix zero-width space issue
          // eslint-disable-next-line react/no-danger
          <span className="notranslate" dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
        )}
      </NotchedOutlineLegend>
    </NotchedOutlineRoot>
  );
}

NotchedOutline.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  style: PropTypes.object,
};
