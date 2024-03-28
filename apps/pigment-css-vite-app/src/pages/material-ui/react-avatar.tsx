import MaterialUILayout from '../../Layout';
import BackgroundLetterAvatars from '../../../../../docs/data/material/components/avatars/BackgroundLetterAvatars.tsx';
import BadgeAvatars from '../../../../../docs/data/material/components/avatars/BadgeAvatars.tsx';
import CustomSurplusAvatars from '../../../../../docs/data/material/components/avatars/CustomSurplusAvatars.tsx';
import FallbackAvatars from '../../../../../docs/data/material/components/avatars/FallbackAvatars.tsx';
import GroupAvatars from '../../../../../docs/data/material/components/avatars/GroupAvatars.tsx';
import IconAvatars from '../../../../../docs/data/material/components/avatars/IconAvatars.tsx';
import ImageAvatars from '../../../../../docs/data/material/components/avatars/ImageAvatars.tsx';
import LetterAvatars from '../../../../../docs/data/material/components/avatars/LetterAvatars.tsx';
import SizeAvatars from '../../../../../docs/data/material/components/avatars/SizeAvatars.tsx';
import TotalAvatars from '../../../../../docs/data/material/components/avatars/TotalAvatars.tsx';
import VariantAvatars from '../../../../../docs/data/material/components/avatars/VariantAvatars.tsx';

export default function Avatars() {
  return (
    <MaterialUILayout>
      <h1>Avatars</h1>
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
    </MaterialUILayout>
  );
}
