import * as React from 'react';
import Ad from '_shared/Ad';
import Code from '_shared/Code';
import PropTypesTable from '_shared/PropTypesTable';
import { PageMeta } from '_shared/PageMeta';
import { Typography } from '@material-ui/core';
import { WithRouterProps, withRouter } from 'next/router';

const internalComponents = ['Calendar', 'TimePickerView'];
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

      <h4> Import </h4>
      <Code language="jsx">{`import { ${componentName} } from 'material-ui-pickers'`}</Code>

      <h4> Inheritance </h4>
      <Typography gutterBottom>
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
      </Typography>

      <PropTypesTable src={componentName} />

      {!internalComponents.includes(componentName) && (
        <>
          <h4> Modal Wrapper </h4>
          <Typography gutterBottom>Available only with variant "dialog" </Typography>

          <PropTypesTable disableHeader src="ModalWrapper" />
        </>
      )}
    </>
  );
};

export default withRouter(Docs);
