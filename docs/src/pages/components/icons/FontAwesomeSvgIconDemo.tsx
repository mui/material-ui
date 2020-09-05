import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

type FontAwesomeSvgIconProps = {
  icon: IconDefinition;
};

export default function FontAwesomeSvgIconDemo() {
  const FontAwesomeSvgIcon = React.useMemo(
    () =>
      React.forwardRef<SVGSVGElement, FontAwesomeSvgIconProps>((props, ref) => {
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
              svgPathData.map((d, i) => <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />)
            )}
          </SvgIcon>
        );
      }),
    [],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>FontAwesomeIcon</TableCell>
          <TableCell>Custom SvgIcon</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>IconButton (click to see ink)</TableCell>
          <TableCell>
            <IconButton>
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton>
              <FontAwesomeSvgIcon icon={faEllipsisV} />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Button with startIcon</TableCell>
          <TableCell>
            <Button variant="contained" startIcon={<FontAwesomeIcon icon={faInfo} />}>
              Example
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="contained" startIcon={<FontAwesomeSvgIcon icon={faInfo} />}>
              Example
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
