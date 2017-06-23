import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SentimentNeutral = props =>
  <SvgIcon {...props}>
    <path d="M9 14h6v1.5H9z" /><circle cx="15.5" cy="9.5" r="1.5" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SvgIcon>;

SentimentNeutral = pure(SentimentNeutral);
SentimentNeutral.muiName = 'SvgIcon';

export default SentimentNeutral;
