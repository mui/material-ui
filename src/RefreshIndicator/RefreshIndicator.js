import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '../Paper';
import { CircularProgress } from '../Progress';
import withStyles from '../styles/withStyles';

const VIEWBOX_SIZE = 32;

export const styles = theme => ({
  root: {
    borderRadius: '50%'
  }
})

class RefreshIndicator extends React.Component {
  getPaddingSize() {
    const padding = this.props.size * 0.1;
    return padding;
  }

  getPaperSize() {
    return this.props.size - this.getPaddingSize() * 2;
  }


  getCircleAttr() {
    return {
      radiu: VIEWBOX_SIZE / 2 - 5,
      originX: VIEWBOX_SIZE / 2,
      originY: VIEWBOX_SIZE / 2,
      strokeWidth: 3,
    };
  }

  getArcDeg() {
    const p = this.props.percentage / 100;

    const beginDeg = p * 120;
    const endDeg = p * 410;
    return [beginDeg, endDeg];
  }

  getFactor() {
    const p = this.props.percentage / 100;
    const p1 = Math.min(1, p / 0.4);

    return p1;
  }

  getCircleStyle() {
    const isLoading = this.props.status === 'loading';
    const p1 = isLoading ? 1 : this.getFactor();
    const circle = this.getCircleAttr();
    const perimeter = Math.PI * 2 * circle.radiu;

    const [beginDeg, endDeg] = this.getArcDeg();
    const arcLen = (endDeg - beginDeg) * perimeter / 360;
    const dashOffset = -beginDeg * perimeter / 360;

    return {
      style: {
        strokeDasharray: `${arcLen}, ${(perimeter - arcLen)}`,
        strokeDashoffset: dashOffset,
        stroke: (isLoading || this.props.percentage === 100) ?
          (this.props.loadingColor || this.props.theme.palette.primary[500]) :
          (this.props.color || this.props.theme.palette.grey[300]),
        strokeLinecap: 'round',
        opacity: p1,
        strokeWidth: circle.strokeWidth * p1,
        fill: 'none',
      },
      attr: {
        cx: circle.originX,
        cy: circle.originY,
        r: circle.radiu,
      },
    };
  }

  getPolygonStyle() {
    const p1 = this.getFactor();
    const circle = this.getCircleAttr();

    const triangleCx = circle.originX + circle.radiu;
    const triangleCy = circle.originY;
    const dx = (circle.strokeWidth * 7 / 4) * p1;
    const trianglePath = `${(triangleCx - dx)},${triangleCy} ${(triangleCx + dx)},${
      triangleCy} ${triangleCx},${(triangleCy + dx)}`;

    const [, endDeg] = this.getArcDeg();

    return {
      style: {
        fill: this.props.percentage === 100 ?
          (this.props.loadingColor || this.props.theme.palette.primary[500]) :
          (this.props.color || this.props.theme.palette.grey[300]),
        transform: `rotate(${endDeg}deg)`,
        transformOrigin: `${circle.originX}px ${circle.originY}px`,
        opacity: p1,
      },
      attr: {
        points: trianglePath,
      },
    };
  }

  scalePath(path, step) {
    if (this.props.status !== 'loading') return;

    const currStep = (step || 0) % 3;

    const circle = this.getCircleAttr();
    const perimeter = Math.PI * 2 * circle.radiu;
    const arcLen = perimeter * 0.64;

    let strokeDasharray;
    let strokeDashoffset;
    let transitionDuration;

    if (currStep === 0) {
      strokeDasharray = '1, 200';
      strokeDashoffset = 0;
      transitionDuration = '0ms';
    } else if (currStep === 1) {
      strokeDasharray = `${arcLen}, 200`;
      strokeDashoffset = -15;
      transitionDuration = '750ms';
    } else {
      strokeDasharray = `${arcLen}, 200`;
      strokeDashoffset = -(perimeter - 1);
      transitionDuration = '850ms';
    }

    autoPrefix.set(path.style, 'strokeDasharray', strokeDasharray);
    autoPrefix.set(path.style, 'strokeDashoffset', strokeDashoffset);
    autoPrefix.set(path.style, 'transitionDuration', transitionDuration);

    this.scalePathTimer = setTimeout(() => this.scalePath(path, currStep + 1), currStep ? 750 : 250);
  }

  rotateWrapper(wrapper) {
    if (this.props.status !== 'loading') return;

    autoPrefix.set(wrapper.style, 'transform', null);
    autoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)');
    autoPrefix.set(wrapper.style, 'transitionDuration', '0ms');

    this.rotateWrapperSecondTimer = setTimeout(() => {
      autoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)');
      autoPrefix.set(wrapper.style, 'transitionDuration', '10s');
      autoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear');
    }, 50);

    this.rotateWrapperTimer = setTimeout(() => this.rotateWrapper(wrapper), 10050);
  }

  renderChildren () {
    const paperSize = this.getPaperSize();

    let childrenCmp = null;
    if (this.props.status !== 'ready') {
      childrenCmp=(
        <CircularProgress
          color="accent"
          size={this.props.size - 10}
        />
      );
    } else {
      const circleStyle = this.getCircleStyle(paperSize);
      const polygonStyle = this.getPolygonStyle(paperSize);
      childrenCmp = (
        <svg
          style={{
            width: paperSize,
            height: paperSize,
          }}
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        >
          <circle
            style={circleStyle.style}
            {...circleStyle.attr}
          />
          <polygon
            style={polygonStyle.style}
            {...polygonStyle.attr}
          />
        </svg>
      );
    }

    return childrenCmp;
  }
    
  render () {
    const {
      classes,
      className: classNameProp,
      percentage,
      size,
      status,
      ...other    
    } = this.props;

    return (
      <Paper
        className={classNames(classes.root, classNameProp)}
        style={{ width: size, height: size }}
        {...other}
      >
        {this.renderChildren()}
      </Paper>
    )
  }
}

RefreshIndicator.defaultProps = {
  size: 40
}

export default withStyles(styles, { name: 'MuiRefreshIndicator', withTheme: true })(RefreshIndicator);
