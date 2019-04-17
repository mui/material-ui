import * as React from 'react';
import Ad from '_shared/Ad';
import PropTypesTable from '_shared/PropTypesTable';
import { PageMeta } from '_shared/PageMeta';
import { WithRouterProps, withRouter } from 'next/router';

const Docs: React.FC<WithRouterProps> = ({ router }) => {
  const componentName = router!.query!.component! as any; // just crash if name is invalid

  const title = `${componentName} API`;
  const description = `Here you can find the full list and description for ${componentName} props.`;

  return (
    <>
      <PageMeta title={title} description={description} />

      <h2>{title}</h2>
      <p>{description}</p>

      <Ad />

      <h4> Inheritance </h4>
      <p>
        Any prop not recognized by the pickers and their sub-components are passed down to
        material-ui{' '}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://material-ui.com/api/text-field/#props"
        >
          TextField
        </a>{' '}
        component.
      </p>

      <PropTypesTable src={componentName} />
    </>
  );
};

export default withRouter(Docs);
