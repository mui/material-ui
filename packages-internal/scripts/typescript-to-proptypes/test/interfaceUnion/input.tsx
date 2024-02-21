import * as React from 'react';

type PieValueType = string;

export interface PieSeriesType<Tdata = PieValueType> {
  type: 'pie';
  data: Tdata[];
}

interface PieSeriesType2 {
  type: 'pie';
  data: string[];
}

type LineValueType = number;

export interface LineSeriesType<Tdata = LineValueType> {
  type: 'line';
  data: Tdata[];
}

type ChartSeries = PieSeriesType | LineSeriesType;

interface Props {
  series: ChartSeries;
  pieSeries: PieSeriesType | PieSeriesType2;
}

export default function Grid(props: Props) {
  const { series, pieSeries } = props;
  return <div>{series.type}</div>;
}
