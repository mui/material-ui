import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let HardwareLaptopChromebook = (props) => (
  <SvgIcon {...props}>
    <path d="M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z"/>
  </SvgIcon>
);
HardwareLaptopChromebook = pure(HardwareLaptopChromebook)
HardwareLaptopChromebook.displayName = 'HardwareLaptopChromebook';

export default HardwareLaptopChromebook;
