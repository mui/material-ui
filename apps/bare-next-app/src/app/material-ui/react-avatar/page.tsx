'use client';
import * as React from 'react';
import BackgroundLetterAvatars from '../../../../../../docs/data/material/components/avatars/BackgroundLetterAvatars';
import BadgeAvatars from '../../../../../../docs/data/material/components/avatars/BadgeAvatars';
import CustomSurplusAvatars from '../../../../../../docs/data/material/components/avatars/CustomSurplusAvatars';
import FallbackAvatars from '../../../../../../docs/data/material/components/avatars/FallbackAvatars';
import GroupAvatars from '../../../../../../docs/data/material/components/avatars/GroupAvatars';
import IconAvatars from '../../../../../../docs/data/material/components/avatars/IconAvatars';
import ImageAvatars from '../../../../../../docs/data/material/components/avatars/ImageAvatars';
import LetterAvatars from '../../../../../../docs/data/material/components/avatars/LetterAvatars';
import SizeAvatars from '../../../../../../docs/data/material/components/avatars/SizeAvatars';
import TotalAvatars from '../../../../../../docs/data/material/components/avatars/TotalAvatars';
import VariantAvatars from '../../../../../../docs/data/material/components/avatars/VariantAvatars';

export default function Avatars() {
  return (
    <React.Fragment>
      <section>
        <h2> Background Letter Avatars</h2>
        <div className="demo-container">
          <BackgroundLetterAvatars />
        </div>
      </section>
      <section>
        <h2> Badge Avatars</h2>
        <div className="demo-container">
          <BadgeAvatars />
        </div>
      </section>
      <section>
        <h2> Custom Surplus Avatars</h2>
        <div className="demo-container">
          <CustomSurplusAvatars />
        </div>
      </section>
      <section>
        <h2> Fallback Avatars</h2>
        <div className="demo-container">
          <FallbackAvatars />
        </div>
      </section>
      <section>
        <h2> Group Avatars</h2>
        <div className="demo-container">
          <GroupAvatars />
        </div>
      </section>
      <section>
        <h2> Icon Avatars</h2>
        <div className="demo-container">
          <IconAvatars />
        </div>
      </section>
      <section>
        <h2> Image Avatars</h2>
        <div className="demo-container">
          <ImageAvatars />
        </div>
      </section>
      <section>
        <h2> Letter Avatars</h2>
        <div className="demo-container">
          <LetterAvatars />
        </div>
      </section>
      <section>
        <h2> Size Avatars</h2>
        <div className="demo-container">
          <SizeAvatars />
        </div>
      </section>
      <section>
        <h2> Total Avatars</h2>
        <div className="demo-container">
          <TotalAvatars />
        </div>
      </section>
      <section>
        <h2> Variant Avatars</h2>
        <div className="demo-container">
          <VariantAvatars />
        </div>
      </section>
    </React.Fragment>
  );
}
