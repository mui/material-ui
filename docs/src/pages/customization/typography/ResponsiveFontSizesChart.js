import React from 'react';
// import of a small, pure module in a private demo
// bundle size and module duplication is negligible
/* eslint-disable-next-line no-restricted-imports */
import { convertLength } from '@material-ui/core/styles/cssUtils';
import { makeStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import {
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const colors = ['#443dc2', '#2060df', '#277e91', '#378153', '#4d811d', '#63780d', '#996600'];
const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1'];

const useStyles = makeStyles({
  root: {
    height: 380,
    width: '100%',
    color: 'black',
  },
});

export default function ResponsiveFontSizes() {
  const classes = useStyles();
  const convert = convertLength(theme.typography.htmlFontSize);
  const toPx = (rem) => parseFloat(convert(rem, 'px'));

  const series = variants.map((variantName) => {
    const variant = theme.typography[variantName];
    const data = [];

    data.push({
      viewport: 0,
      fontSize: toPx(variant.fontSize),
    });

    theme.breakpoints.keys.forEach((key) => {
      const viewport = theme.breakpoints.values[key];
      const value = theme.breakpoints.up(key);

      if (variant[value]) {
        data.push({
          viewport: viewport - 1,
          fontSize: data[data.length - 1].fontSize,
        });
        data.push({
          viewport,
          fontSize: toPx(variant[value].fontSize),
        });
      } else if (key === 'xl') {
        data.push({
          viewport,
          fontSize: data[data.length - 1].fontSize,
        });
      }
    });

    return {
      name: variantName,
      data,
    };
  });

  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <LineChart
          margin={{
            top: 50,
            right: 140,
            bottom: 0,
            left: 30,
          }}
        >
          <XAxis dataKey="viewport" type="number">
            <Label position="right" offset={30}>
              viewport (px)
            </Label>
          </XAxis>
          <YAxis dataKey="fontSize" type="number">
            <Label position="top" offset={20}>
              font-size (rem)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          {series.map((serie, index) => (
            <Line
              dataKey="fontSize"
              stroke={colors[index % colors.length]}
              data={serie.data}
              name={serie.name}
              key={serie.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
