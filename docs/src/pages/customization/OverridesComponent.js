// @flow weak

import React from 'react';
import OverridesClassNames from 'docs/src/pages/customization/OverridesClassNames';

// We can use OverridesClassNames over and over.
function OverridesComponent() {
  return (
    <OverridesClassNames>
      {'Component'}
    </OverridesClassNames>
  );
}

export default OverridesComponent;
