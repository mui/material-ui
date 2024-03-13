import * as React from 'react';
import MaterialUILayout from '../../Layout';
import Asynchronous from '../../../../../docs/data/material/components/autocomplete/Asynchronous.tsx';
import AutocompleteHint from '../../../../../docs/data/material/components/autocomplete/AutocompleteHint.tsx';
import CheckboxesTags from '../../../../../docs/data/material/components/autocomplete/CheckboxesTags.tsx';
import ComboBox from '../../../../../docs/data/material/components/autocomplete/ComboBox.tsx';
import ControllableStates from '../../../../../docs/data/material/components/autocomplete/ControllableStates.tsx';
import CountrySelect from '../../../../../docs/data/material/components/autocomplete/CountrySelect.tsx';
import CustomInputAutocomplete from '../../../../../docs/data/material/components/autocomplete/CustomInputAutocomplete.tsx';
import CustomizedHook from '../../../../../docs/data/material/components/autocomplete/CustomizedHook.tsx';
import DisabledOptions from '../../../../../docs/data/material/components/autocomplete/DisabledOptions.tsx';
import Filter from '../../../../../docs/data/material/components/autocomplete/Filter.tsx';
import FixedTags from '../../../../../docs/data/material/components/autocomplete/FixedTags.tsx';
import FreeSolo from '../../../../../docs/data/material/components/autocomplete/FreeSolo.tsx';
import FreeSoloCreateOption from '../../../../../docs/data/material/components/autocomplete/FreeSoloCreateOption.tsx';
import FreeSoloCreateOptionDialog from '../../../../../docs/data/material/components/autocomplete/FreeSoloCreateOptionDialog.tsx';
import GitHubLabel from '../../../../../docs/data/material/components/autocomplete/GitHubLabel.tsx';
import GloballyCustomizedOptions from '../../../../../docs/data/material/components/autocomplete/GloballyCustomizedOptions.tsx';
import GoogleMaps from '../../../../../docs/data/material/components/autocomplete/GoogleMaps.tsx';
import Grouped from '../../../../../docs/data/material/components/autocomplete/Grouped.tsx';
import Highlights from '../../../../../docs/data/material/components/autocomplete/Highlights.tsx';
import LimitTags from '../../../../../docs/data/material/components/autocomplete/LimitTags.tsx';
import Playground from '../../../../../docs/data/material/components/autocomplete/Playground.tsx';
import RenderGroup from '../../../../../docs/data/material/components/autocomplete/RenderGroup.tsx';
import Sizes from '../../../../../docs/data/material/components/autocomplete/Sizes.tsx';
import Tags from '../../../../../docs/data/material/components/autocomplete/Tags.tsx';
import UseAutocomplete from '../../../../../docs/data/material/components/autocomplete/UseAutocomplete.tsx';
import Virtualize from '../../../../../docs/data/material/components/autocomplete/Virtualize.tsx';

export default function Autocomplete() {
  return (
    <MaterialUILayout>
      <h1>Autocomplete</h1>
      <section>
        <h2> Asynchronous</h2>
        <div className="demo-container">
          <Asynchronous />
        </div>
      </section>
      <section>
        <h2> Autocomplete Hint</h2>
        <div className="demo-container">
          <AutocompleteHint />
        </div>
      </section>
      <section>
        <h2> Checkboxes Tags</h2>
        <div className="demo-container">
          <CheckboxesTags />
        </div>
      </section>
      <section>
        <h2> Combo Box</h2>
        <div className="demo-container">
          <ComboBox />
        </div>
      </section>
      <section>
        <h2> Controllable States</h2>
        <div className="demo-container">
          <ControllableStates />
        </div>
      </section>
      <section>
        <h2> Country Select</h2>
        <div className="demo-container">
          <CountrySelect />
        </div>
      </section>
      <section>
        <h2> Custom Input Autocomplete</h2>
        <div className="demo-container">
          <CustomInputAutocomplete />
        </div>
      </section>
      <section>
        <h2> Customized Hook</h2>
        <div className="demo-container">
          <CustomizedHook />
        </div>
      </section>
      <section>
        <h2> Disabled Options</h2>
        <div className="demo-container">
          <DisabledOptions />
        </div>
      </section>
      <section>
        <h2> Filter</h2>
        <div className="demo-container">
          <Filter />
        </div>
      </section>
      <section>
        <h2> Fixed Tags</h2>
        <div className="demo-container">
          <FixedTags />
        </div>
      </section>
      <section>
        <h2> Free Solo</h2>
        <div className="demo-container">
          <FreeSolo />
        </div>
      </section>
      <section>
        <h2> Free Solo Create Option</h2>
        <div className="demo-container">
          <FreeSoloCreateOption />
        </div>
      </section>
      <section>
        <h2> Free Solo Create Option Dialog</h2>
        <div className="demo-container">
          <FreeSoloCreateOptionDialog />
        </div>
      </section>
      <section>
        <h2> Git Hub Label</h2>
        <div className="demo-container">
          <GitHubLabel />
        </div>
      </section>
      <section>
        <h2> Globally Customized Options</h2>
        <div className="demo-container">
          <GloballyCustomizedOptions />
        </div>
      </section>
      <section>
        <h2> Google Maps</h2>
        <div className="demo-container">
          <GoogleMaps />
        </div>
      </section>
      <section>
        <h2> Grouped</h2>
        <div className="demo-container">
          <Grouped />
        </div>
      </section>
      <section>
        <h2> Highlights</h2>
        <div className="demo-container">
          <Highlights />
        </div>
      </section>
      <section>
        <h2> Limit Tags</h2>
        <div className="demo-container">
          <LimitTags />
        </div>
      </section>
      <section>
        <h2> Playground</h2>
        <div className="demo-container">
          <Playground />
        </div>
      </section>
      <section>
        <h2> Render Group</h2>
        <div className="demo-container">
          <RenderGroup />
        </div>
      </section>
      <section>
        <h2> Sizes</h2>
        <div className="demo-container">
          <Sizes />
        </div>
      </section>
      <section>
        <h2> Tags</h2>
        <div className="demo-container">
          <Tags />
        </div>
      </section>
      <section>
        <h2> Use Autocomplete</h2>
        <div className="demo-container">
          <UseAutocomplete />
        </div>
      </section>
      <section>
        <h2> Virtualize</h2>
        <div className="demo-container">
          <Virtualize />
        </div>
      </section>
    </MaterialUILayout>
  );
}
