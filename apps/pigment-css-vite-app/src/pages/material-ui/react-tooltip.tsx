import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AccessibilityTooltips from '../../../../../docs/data/material/components/tooltips/AccessibilityTooltips.tsx';
import AnchorElTooltips from '../../../../../docs/data/material/components/tooltips/AnchorElTooltips.tsx';
import ArrowTooltips from '../../../../../docs/data/material/components/tooltips/ArrowTooltips.tsx';
import BasicTooltip from '../../../../../docs/data/material/components/tooltips/BasicTooltip.tsx';
import ControlledTooltips from '../../../../../docs/data/material/components/tooltips/ControlledTooltips.tsx';
import CustomizedTooltips from '../../../../../docs/data/material/components/tooltips/CustomizedTooltips.tsx';
import DelayTooltips from '../../../../../docs/data/material/components/tooltips/DelayTooltips.tsx';
import DisabledTooltips from '../../../../../docs/data/material/components/tooltips/DisabledTooltips.tsx';
import FollowCursorTooltips from '../../../../../docs/data/material/components/tooltips/FollowCursorTooltips.tsx';
import NonInteractiveTooltips from '../../../../../docs/data/material/components/tooltips/NonInteractiveTooltips.tsx';
import PositionedTooltips from '../../../../../docs/data/material/components/tooltips/PositionedTooltips.tsx';
import TooltipMargin from '../../../../../docs/data/material/components/tooltips/TooltipMargin.tsx';
import TooltipOffset from '../../../../../docs/data/material/components/tooltips/TooltipOffset.tsx';
import TransitionsTooltips from '../../../../../docs/data/material/components/tooltips/TransitionsTooltips.tsx';
import TriggersTooltips from '../../../../../docs/data/material/components/tooltips/TriggersTooltips.tsx';
import VariableWidth from '../../../../../docs/data/material/components/tooltips/VariableWidth.tsx';

export default function Tooltips() {
  return (
    <MaterialUILayout>
      <h1>Tooltips</h1>
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
    </MaterialUILayout>
  );
}
