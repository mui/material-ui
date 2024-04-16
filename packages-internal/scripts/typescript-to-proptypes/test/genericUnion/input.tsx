import * as React from 'react';

type PieValueType = string;

export interface PieSeriesType<Tdata = PieValueType> {
  type: 'pie';
  data: Tdata[];
}

type LineValueType = number;

export interface LineSeriesType<Tdata = LineValueType> {
  type: 'line';
  data: Tdata[];
}

interface Config {
  pie: { series: PieSeriesType };
  line: { series: LineSeriesType };
}

type ChartSeries<T extends 'line' | 'pie'> = Config[T]['series'];

interface Props<T extends 'line' | 'pie' = 'line' | 'pie'> {
  series: ChartSeries<T>;
}

export default function Grid(props: Props) {
  const { series } = props;
  return <div>{series.type}</div>;
}
