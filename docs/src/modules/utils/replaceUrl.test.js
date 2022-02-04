import { expect } from 'chai';
import replaceUrl, {
  replaceMaterialLinks,
  replaceAPILinks,
  replaceComponentLinks,
} from './replaceUrl';
import FEATURE_TOGGLE from '../../featureToggle';

describe('replaceUrl', () => {
  it('replace material related pathname', () => {
    expect(replaceMaterialLinks(`/guides/minimizing-bundle-size/`)).to.equal(
      `/material/guides/minimizing-bundle-size/`,
    );
    expect(replaceMaterialLinks(`/customization/theme-components/#default-props`)).to.equal(
      `/material/customization/theme-components/#default-props`,
    );
    expect(replaceMaterialLinks(`/getting-started/usage/`)).to.equal(
      `/material/getting-started/usage/`,
    );
    expect(replaceMaterialLinks(`/discover-more/related-projects/`)).to.equal(
      `/material/discover-more/related-projects/`,
    );
  });

  it('should not change if links have been updated', () => {
    expect(replaceMaterialLinks(`/material/guides/minimizing-bundle-size/`)).to.equal(
      `/material/guides/minimizing-bundle-size/`,
    );
    expect(
      replaceMaterialLinks(`/material/customization/theme-components/#default-props`),
    ).to.equal(`/material/customization/theme-components/#default-props`);
    expect(replaceMaterialLinks(`/material/getting-started/usage/`)).to.equal(
      `/material/getting-started/usage/`,
    );
    expect(replaceMaterialLinks(`/material/discover-more/related-projects/`)).to.equal(
      `/material/discover-more/related-projects/`,
    );
  });

  it('replace correct component links', () => {
    expect(replaceComponentLinks(`/components/button-group/`)).to.equal(
      `/material/react-button-group/`,
    );
    expect(replaceComponentLinks(`/components/data-grid/demo/`)).to.equal(
      `/x/react-data-grid/demo/`,
    );
  });

  it('should do nothing if the components have updated', () => {
    expect(replaceComponentLinks(`/material/react-button-group/`)).to.equal(
      `/material/react-button-group/`,
    );
    expect(replaceComponentLinks(`/x/react-data-grid/demo/`)).to.equal(`/x/react-data-grid/demo/`);
  });

  it('replace correct API links', () => {
    expect(replaceAPILinks(`/api/button/`)).to.equal(`/material/api/button/`);
    expect(replaceAPILinks(`/api/button-unstyled/`)).to.equal(`/base/api/button-unstyled/`);
    expect(replaceAPILinks(`/api/loading-button/`)).to.equal(`/material/api/loading-button/`);
    expect(replaceAPILinks(`/api/data-grid/data-grid/`)).to.equal(`/x/api/data-grid/data-grid/`);
    expect(replaceAPILinks(`/system/basic/`)).to.equal(`/system/basic/`);
  });

  it('should do nothing if the APIs have updated', () => {
    expect(replaceAPILinks(`/material/api/button/`)).to.equal(`/material/api/button/`);
    expect(replaceAPILinks(`/base/api/button-unstyled/`)).to.equal(`/base/api/button-unstyled/`);
    expect(replaceAPILinks(`/material/api/loading-button/`)).to.equal(
      `/material/api/loading-button/`,
    );
    expect(replaceAPILinks(`/x/api/data-grid/`)).to.equal(`/x/api/data-grid/`);
  });

  it('only replace links for new routes (/material/* & /x/*)', () => {
    expect(replaceUrl(`/guides/minimizing-bundle-size/`, '/material/react-buttons')).to.equal(
      `/material/guides/minimizing-bundle-size/`,
    );
    expect(
      replaceUrl(`/components/data-grid/getting-started/#main-content`, '/x/react-data-grid'),
    ).to.equal(`/x/react-data-grid/getting-started/#main-content`);
    expect(
      replaceUrl(`/components/data-grid/components/#main-content`, '/x/react-data-grid'),
    ).to.equal(`/x/react-data-grid/components/#main-content`);
    expect(replaceUrl(`/api/button-unstyled`, '/base/api/button-unstyled')).to.equal(
      `/base/api/button-unstyled`,
    );
    if (FEATURE_TOGGLE.enable_system_scope) {
      expect(replaceUrl(`/styles/api/`, `/system/basics`)).to.equal(`/system/styles/api/`);
    } else {
      expect(replaceUrl(`/styles/api/`, `/system/basics`)).to.equal(`/styles/api/`);
    }
  });

  it('does not replace for old routes', () => {
    expect(replaceUrl(`/guides/minimizing-bundle-size/`, '/components/buttons')).to.equal(
      `/guides/minimizing-bundle-size/`,
    );
    expect(
      replaceUrl(`/components/data-grid/getting-started/#main-content`, '/components/buttons'),
    ).to.equal(`/components/data-grid/getting-started/#main-content`);
  });
});
