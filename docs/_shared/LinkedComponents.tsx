import * as React from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';

interface LinkedComponentsProps {
  components: string[];
}

const LinkedComponents: React.FunctionComponent<LinkedComponentsProps> = ({ components }) => {
  return (
    <ul>
      {components.map(component => (
        <li key={component}>
          <Link prefetch href={`/api/docs?component=${component}`}>
            <a>
              <Typography>{`<${component}/>`}</Typography>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkedComponents;
