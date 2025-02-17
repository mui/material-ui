'use client';
import * as React from 'react';
import AccessibilityTooltips from '../../../../../../docs/data/material/components/tooltips/AccessibilityTooltips';
import AnchorElTooltips from '../../../../../../docs/data/material/components/tooltips/AnchorElTooltips';
import ArrowTooltips from '../../../../../../docs/data/material/components/tooltips/ArrowTooltips';
import BasicTooltip from '../../../../../../docs/data/material/components/tooltips/BasicTooltip';
import ControlledTooltips from '../../../../../../docs/data/material/components/tooltips/ControlledTooltips';
import CustomizedTooltips from '../../../../../../docs/data/material/components/tooltips/CustomizedTooltips';
import DelayTooltips from '../../../../../../docs/data/material/components/tooltips/DelayTooltips';
import DisabledTooltips from '../../../../../../docs/data/material/components/tooltips/DisabledTooltips';
import FollowCursorTooltips from '../../../../../../docs/data/material/components/tooltips/FollowCursorTooltips';
import NonInteractiveTooltips from '../../../../../../docs/data/material/components/tooltips/NonInteractiveTooltips';
import PositionedTooltips from '../../../../../../docs/data/material/components/tooltips/PositionedTooltips';
import TooltipMargin from '../../../../../../docs/data/material/components/tooltips/TooltipMargin';
import TooltipOffset from '../../../../../../docs/data/material/components/tooltips/TooltipOffset';
import TransitionsTooltips from '../../../../../../docs/data/material/components/tooltips/TransitionsTooltips';
import TriggersTooltips from '../../../../../../docs/data/material/components/tooltips/TriggersTooltips';
import VariableWidth from '../../../../../../docs/data/material/components/tooltips/VariableWidth';

export default function Tooltips() {
  return (
    <React.Fragment>
      <section>
        <h2> Accessibility Tooltips</h2>
        <div className="demo-container">
          <AccessibilityTooltips />
        </div>
      </section>
      <section>
        <h2> Anchor El Tooltips</h2>
        <div className="demo-container">
          <AnchorElTooltips />
        </div>
      </section>
      <section>
        <h2> Arrow Tooltips</h2>
        <div className="demo-container">
          <ArrowTooltips />
        </div>
      </section>
      <section>
        <h2> Basic Tooltip</h2>
        <div className="demo-container">
          <BasicTooltip />
        </div>
      </section>
      <section>
        <h2> Controlled Tooltips</h2>
        <div className="demo-container">
          <ControlledTooltips />
        </div>
      </section>
      <section>
        <h2> Customized Tooltips</h2>
        <div className="demo-container">
          <CustomizedTooltips />
        </div>
      </section>
      <section>
        <h2> Delay Tooltips</h2>
        <div className="demo-container">
          <DelayTooltips />
        </div>
      </section>
      <section>
        <h2> Disabled Tooltips</h2>
        <div className="demo-container">
          <DisabledTooltips />
        </div>
      </section>
      <section>
        <h2> Follow Cursor Tooltips</h2>
        <div className="demo-container">
          <FollowCursorTooltips />
        </div>
      </section>
      <section>
        <h2> Non Interactive Tooltips</h2>
        <div className="demo-container">
          <NonInteractiveTooltips />
        </div>
      </section>
      <section>
        <h2> Positioned Tooltips</h2>
        <div className="demo-container">
          <PositionedTooltips />
        </div>
      </section>
      <section>
        <h2> Tooltip Margin</h2>
        <div className="demo-container">
          <TooltipMargin />
        </div>
      </section>
      <section>
        <h2> Tooltip Offset</h2>
        <div className="demo-container">
          <TooltipOffset />
        </div>
      </section>
      <section>
        <h2> Transitions Tooltips</h2>
        <div className="demo-container">
          <TransitionsTooltips />
        </div>
      </section>
      <section>
        <h2> Triggers Tooltips</h2>
        <div className="demo-container">
          <TriggersTooltips />
        </div>
      </section>
      <section>
        <h2> Variable Width</h2>
        <div className="demo-container">
          <VariableWidth />
        </div>
      </section>
    </React.Fragment>
  );
}
