import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

const RefreshIndicatorExampleSimple = () => (
  <div style={style.container}>
    <RefreshIndicator
      percentage={30}
      size={40}
      left={10}
      top={0}
      status="ready"
      style={style.refresh}
    />
    <RefreshIndicator
      percentage={60}
      size={50}
      left={65}
      top={0}
      status="ready"
      style={style.refresh}
    />
    <RefreshIndicator
      percentage={80}
      size={60}
      left={120}
      top={0}
      color={"red"}
      status="ready"
      style={style.refresh}
    />
    <RefreshIndicator
      percentage={100}
      size={70}
      left={175}
      top={0}
      color={"red"} // Overridden by percentage={100}
      status="ready"
      style={style.refresh}
    />
  </div>
);

export default RefreshIndicatorExampleSimple;
