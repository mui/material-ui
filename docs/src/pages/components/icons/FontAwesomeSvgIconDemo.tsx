import * as React from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

type FontAwesomeSvgIconProps = {
  icon: any;
};

const FontAwesomeSvgIcon = React.forwardRef<
  SVGSVGElement,
  FontAwesomeSvgIconProps
>((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === 'string' ? (
        <path d={svgPathData} />
      ) : (
        /**
         * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
         * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
         * of a duotone icon. 40% is the default opacity.
         *
         * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
         */
        svgPathData.map((d: string, i: number) => (
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function FontAwesomeSvgIconDemo() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton>
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>
      <IconButton>
        <FontAwesomeSvgIcon icon={faEllipsisV} />
      </IconButton>
      <Button variant="contained" startIcon={<FontAwesomeIcon icon={faInfo} />}>
        Example
      </Button>
      <Button
        variant="contained"
        startIcon={<FontAwesomeSvgIcon icon={faInfo} />}
      >
        Example
      </Button>
    </div>
  );
}
