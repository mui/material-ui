import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AccordionExpandDefault from '../../../../../docs/data/material/components/accordion/AccordionExpandDefault.tsx';
import AccordionExpandIcon from '../../../../../docs/data/material/components/accordion/AccordionExpandIcon.tsx';
import AccordionTransition from '../../../../../docs/data/material/components/accordion/AccordionTransition.tsx';
import AccordionUsage from '../../../../../docs/data/material/components/accordion/AccordionUsage.tsx';
import ControlledAccordions from '../../../../../docs/data/material/components/accordion/ControlledAccordions.tsx';
import CustomizedAccordions from '../../../../../docs/data/material/components/accordion/CustomizedAccordions.tsx';
import DisabledAccordion from '../../../../../docs/data/material/components/accordion/DisabledAccordion.tsx';

export default function Accordion() {
  return (
    <MaterialUILayout>
      <h1>Accordion</h1>
      <section>
        <h2> Accordion Expand Default</h2>
        <div className="demo-container">
          <AccordionExpandDefault />
        </div>
      </section>
      <section>
        <h2> Accordion Expand Icon</h2>
        <div className="demo-container">
          <AccordionExpandIcon />
        </div>
      </section>
      <section>
        <h2> Accordion Transition</h2>
        <div className="demo-container">
          <AccordionTransition />
        </div>
      </section>
      <section>
        <h2> Accordion Usage</h2>
        <div className="demo-container">
          <AccordionUsage />
        </div>
      </section>
      <section>
        <h2> Controlled Accordions</h2>
        <div className="demo-container">
          <ControlledAccordions />
        </div>
      </section>
      <section>
        <h2> Customized Accordions</h2>
        <div className="demo-container">
          <CustomizedAccordions />
        </div>
      </section>
      <section>
        <h2> Disabled Accordion</h2>
        <div className="demo-container">
          <DisabledAccordion />
        </div>
      </section>
    </MaterialUILayout>
  );
}
