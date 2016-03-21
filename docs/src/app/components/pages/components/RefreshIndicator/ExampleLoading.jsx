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

const RefreshIndicatorExampleLoading = () => (
  <div style={style.container}>
    <RefreshIndicator
      size={40}
      left={10}
      top={0}
      status="loading"
      style={style.refresh}
    />
    <RefreshIndicator
      size={50}
      left={70}
      top={0}
      loadingColor={"#FF9800"}
      status="loading"
      style={style.refresh}
    />
  </div>
);

export default RefreshIndicatorExampleLoading;
