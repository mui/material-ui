import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let SocialPerson = (props) => (
  <SvgIcon {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </SvgIcon>
);
SocialPerson = pure(SocialPerson);
SocialPerson.displayName = 'SocialPerson';
SocialPerson.muiName = 'SvgIcon';

export default SocialPerson;
