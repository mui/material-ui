'use client';
import * as React from 'react';
import ActionAreaCard from '../../../../../../docs/data/material/components/cards/ActionAreaCard';
import BasicCard from '../../../../../../docs/data/material/components/cards/BasicCard';
import ImgMediaCard from '../../../../../../docs/data/material/components/cards/ImgMediaCard';
import MediaCard from '../../../../../../docs/data/material/components/cards/MediaCard';
import MediaControlCard from '../../../../../../docs/data/material/components/cards/MediaControlCard';
import MultiActionAreaCard from '../../../../../../docs/data/material/components/cards/MultiActionAreaCard';
import OutlinedCard from '../../../../../../docs/data/material/components/cards/OutlinedCard';
import RecipeReviewCard from '../../../../../../docs/data/material/components/cards/RecipeReviewCard';

export default function Cards() {
  return (
    <React.Fragment>
      <section>
        <h2> Action Area Card</h2>
        <div className="demo-container">
          <ActionAreaCard />
        </div>
      </section>
      <section>
        <h2> Basic Card</h2>
        <div className="demo-container">
          <BasicCard />
        </div>
      </section>
      <section>
        <h2> Img Media Card</h2>
        <div className="demo-container">
          <ImgMediaCard />
        </div>
      </section>
      <section>
        <h2> Media Card</h2>
        <div className="demo-container">
          <MediaCard />
        </div>
      </section>
      <section>
        <h2> Media Control Card</h2>
        <div className="demo-container">
          <MediaControlCard />
        </div>
      </section>
      <section>
        <h2> Multi Action Area Card</h2>
        <div className="demo-container">
          <MultiActionAreaCard />
        </div>
      </section>
      <section>
        <h2> Outlined Card</h2>
        <div className="demo-container">
          <OutlinedCard />
        </div>
      </section>
      <section>
        <h2> Recipe Review Card</h2>
        <div className="demo-container">
          <RecipeReviewCard />
        </div>
      </section>
    </React.Fragment>
  );
}
