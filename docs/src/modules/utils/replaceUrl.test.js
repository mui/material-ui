import { expect } from 'chai';
import replaceUrl, {
  replaceMaterialLinks,
  replaceAPILinks,
  replaceComponentLinks,
} from './replaceUrl';

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
    expect(replaceAPILinks(`/api/button/`)).to.equal(`/material/api/mui-material/button/`);
    expect(replaceAPILinks(`/api/button-unstyled/`)).to.equal(
      `/material/api/mui-base/button-unstyled/`,
    );
    expect(replaceAPILinks(`/api/loading-button/`)).to.equal(
      `/material/api/mui-lab/loading-button/`,
    );
    expect(replaceAPILinks(`/api/data-grid/data-grid/`)).to.equal(
      `/x/api/mui-data-grid/data-grid/`,
    );
    expect(replaceAPILinks(`/styles/api/`)).to.equal(`/styles/api/`);
    expect(replaceAPILinks(`/system/basic/`)).to.equal(`/system/basic/`);
  });

  it('should do nothing if the APIs have updated', () => {
    expect(replaceAPILinks(`/material/api/mui-material/button/`)).to.equal(
      `/material/api/mui-material/button/`,
    );
    expect(replaceAPILinks(`/material/api/mui-base/button-unstyled/`)).to.equal(
      `/material/api/mui-base/button-unstyled/`,
    );
    expect(replaceAPILinks(`/material/api/mui-lab/loading-button/`)).to.equal(
      `/material/api/mui-lab/loading-button/`,
    );
    expect(replaceAPILinks(`/x/api/mui-data-grid/data-grid/`)).to.equal(
      `/x/api/mui-data-grid/data-grid/`,
    );
  });

  it('only replace links for new routes (/material/* & /x/*)', () => {
    expect(replaceUrl(`/guides/minimizing-bundle-size/`, '/material/react-buttons')).to.equal(
      `/material/guides/minimizing-bundle-size/`,
    );
  });

  it('does not replace for old routes', () => {
    expect(replaceUrl(`/guides/minimizing-bundle-size/`, '/components/buttons')).to.equal(
      `/guides/minimizing-bundle-size/`,
    );
  });
});
