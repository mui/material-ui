import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import Timeline from '../Timeline';
import TimelineContent, { timelineContentClasses as classes } from './index';

describe('<TimelineContent />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TimelineContent />, () => ({
    classes,
    inheritComponent: Typography,
    render,
    mount,
    muiName: 'MuiTimelineContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('when align right should have alignRight class', () => {
    const { getByText } = render(
      <Timeline align="right">
        <TimelineContent>content</TimelineContent>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignRight);
  });
});
