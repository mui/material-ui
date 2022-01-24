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
    expect(replaceComponentLinks(`/components/button-group/#main-content`)).to.equal(
      `/material/react-button-group/#main-content`,
    );
    expect(replaceComponentLinks(`/components/buttons/`)).to.equal(`/material/react-button/`);
    expect(replaceComponentLinks(`/components/buttons/#main-content`)).to.equal(
      `/material/react-button/#main-content`,
    );

    expect(replaceComponentLinks(`/components/checkboxes/`)).to.equal(`/material/react-checkbox/`);
    expect(replaceComponentLinks(`/components/checkboxes/#main-content`)).to.equal(
      `/material/react-checkbox/#main-content`,
    );

    expect(replaceComponentLinks(`/components/radio-buttons/`)).to.equal(
      `/material/react-radio-button/`,
    );
    expect(replaceComponentLinks(`/components/radio-buttons/#main-content`)).to.equal(
      `/material/react-radio-button/#main-content`,
    );

    expect(replaceComponentLinks(`/components/selects/`)).to.equal(`/material/react-select/`);
    expect(replaceComponentLinks(`/components/selects/#main-content`)).to.equal(
      `/material/react-select/#main-content`,
    );

    expect(replaceComponentLinks(`/components/switches/`)).to.equal(`/material/react-switch/`);
    expect(replaceComponentLinks(`/components/switches/#main-content`)).to.equal(
      `/material/react-switch/#main-content`,
    );

    expect(replaceComponentLinks(`/components/text-fields/`)).to.equal(
      `/material/react-text-field/`,
    );
    expect(replaceComponentLinks(`/components/text-fields/#main-content`)).to.equal(
      `/material/react-text-field/#main-content`,
    );

    expect(replaceComponentLinks(`/components/avatars/`)).to.equal(`/material/react-avatar/`);
    expect(replaceComponentLinks(`/components/avatars/#main-content`)).to.equal(
      `/material/react-avatar/#main-content`,
    );

    expect(replaceComponentLinks(`/components/badges/`)).to.equal(`/material/react-badge/`);
    expect(replaceComponentLinks(`/components/badges/#main-content`)).to.equal(
      `/material/react-badge/#main-content`,
    );

    expect(replaceComponentLinks(`/components/chips/`)).to.equal(`/material/react-chip/`);
    expect(replaceComponentLinks(`/components/chips/#main-content`)).to.equal(
      `/material/react-chip/#main-content`,
    );

    expect(replaceComponentLinks(`/components/dividers/`)).to.equal(`/material/react-divider/`);
    expect(replaceComponentLinks(`/components/dividers/#main-content`)).to.equal(
      `/material/react-divider/#main-content`,
    );

    expect(replaceComponentLinks(`/components/icons/`)).to.equal(`/material/icons/`);

    expect(replaceComponentLinks(`/components/material-icons/`)).to.equal(
      `/material/material-icons/`,
    );

    expect(replaceComponentLinks(`/components/lists/`)).to.equal(`/material/react-list/`);
    expect(replaceComponentLinks(`/components/lists/#main-content`)).to.equal(
      `/material/react-list/#main-content`,
    );

    expect(replaceComponentLinks(`/components/image-list/`)).to.equal(
      `/material/react-image-list/`,
    );
    expect(replaceComponentLinks(`/components/image-list/#main-content`)).to.equal(
      `/material/react-image-list/#main-content`,
    );

    expect(replaceComponentLinks(`/components/no-ssr/`)).to.equal(`/material/react-no-ssr/`);
    expect(replaceComponentLinks(`/components/no-ssr/#main-content`)).to.equal(
      `/material/react-no-ssr/#main-content`,
    );

    expect(replaceComponentLinks(`/components/trap-focus/`)).to.equal(
      `/material/react-trap-focus/`,
    );
    expect(replaceComponentLinks(`/components/trap-focus/#main-content`)).to.equal(
      `/material/react-trap-focus/#main-content`,
    );

    expect(replaceComponentLinks(`/components/progress/`)).to.equal(`/material/react-progress/`);
    expect(replaceComponentLinks(`/components/progress/#main-content`)).to.equal(
      `/material/react-progress/#main-content`,
    );

    expect(replaceComponentLinks(`/components/tables/`)).to.equal(`/material/react-table/`);
    expect(replaceComponentLinks(`/components/tables/#main-content`)).to.equal(
      `/material/react-table/#main-content`,
    );

    expect(replaceComponentLinks(`/components/tooltips/`)).to.equal(`/material/react-tooltip/`);
    expect(replaceComponentLinks(`/components/tooltips/#main-content`)).to.equal(
      `/material/react-tooltip/#main-content`,
    );

    expect(replaceComponentLinks(`/components/dialogs/`)).to.equal(`/material/react-dialog/`);
    expect(replaceComponentLinks(`/components/dialogs/#main-content`)).to.equal(
      `/material/react-dialog/#main-content`,
    );

    expect(replaceComponentLinks(`/components/snackbars/`)).to.equal(`/material/react-snackbar/`);
    expect(replaceComponentLinks(`/components/snackbars/#main-content`)).to.equal(
      `/material/react-snackbar/#main-content`,
    );

    expect(replaceComponentLinks(`/components/cards/`)).to.equal(`/material/react-card/`);
    expect(replaceComponentLinks(`/components/cards/#main-content`)).to.equal(
      `/material/react-card/#main-content`,
    );

    expect(replaceComponentLinks(`/components/breadcrumbs/`)).to.equal(
      `/material/react-breadcrumbs/`,
    );
    expect(replaceComponentLinks(`/components/breadcrumbs/#main-content`)).to.equal(
      `/material/react-breadcrumbs/#main-content`,
    );

    expect(replaceComponentLinks(`/components/drawers/`)).to.equal(`/material/react-drawer/`);
    expect(replaceComponentLinks(`/components/drawers/#main-content`)).to.equal(
      `/material/react-drawer/#main-content`,
    );

    expect(replaceComponentLinks(`/components/links/`)).to.equal(`/material/react-link/`);
    expect(replaceComponentLinks(`/components/links/#main-content`)).to.equal(
      `/material/react-link/#main-content`,
    );

    expect(replaceComponentLinks(`/components/menus/`)).to.equal(`/material/react-menu/`);
    expect(replaceComponentLinks(`/components/menus/#main-content`)).to.equal(
      `/material/react-menu/#main-content`,
    );

    expect(replaceComponentLinks(`/components/steppers/`)).to.equal(`/material/react-stepper/`);
    expect(replaceComponentLinks(`/components/steppers/#main-content`)).to.equal(
      `/material/react-stepper/#main-content`,
    );

    expect(replaceComponentLinks(`/components/tabs/`)).to.equal(`/material/react-tabs/`);
    expect(replaceComponentLinks(`/components/tabs/#main-content`)).to.equal(
      `/material/react-tabs/#main-content`,
    );

    expect(replaceComponentLinks(`/components/transitions/`)).to.equal(`/material/transitions/`);
    expect(replaceComponentLinks(`/components/pickers/`)).to.equal(`/material/pickers/`);
    expect(replaceComponentLinks(`/components/about-the-lab/`)).to.equal(
      `/material/about-the-lab/`,
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
    expect(replaceAPILinks(`/api/no-ssr/`)).to.equal(`/base/api/no-ssr/`);
    expect(replaceAPILinks(`/api/portal/`)).to.equal(`/base/api/portal/`);
    expect(replaceAPILinks(`/api/textarea-autosize/`)).to.equal(`/base/api/textarea-autosize/`);
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

  it('[i18n] only replace links for new routes (/material/* & /x/*)', () => {
    expect(replaceUrl(`/zh/guides/minimizing-bundle-size/`, '/zh/material/react-buttons')).to.equal(
      `/zh/material/guides/minimizing-bundle-size/`,
    );
    expect(
      replaceUrl(`/zh/components/data-grid/getting-started/#main-content`, '/zh/x/react-data-grid'),
    ).to.equal(`/zh/x/react-data-grid/getting-started/#main-content`);
    expect(
      replaceUrl(`/zh/components/data-grid/components/#main-content`, '/zh/x/react-data-grid'),
    ).to.equal(`/zh/x/react-data-grid/components/#main-content`);
    expect(replaceUrl(`/zh/api/button-unstyled`, '/zh/base/api/button-unstyled')).to.equal(
      `/zh/base/api/button-unstyled`,
    );
    if (FEATURE_TOGGLE.enable_system_scope) {
      expect(replaceUrl(`/zh/styles/api/`, `/system/basics`)).to.equal(`/zh/system/styles/api/`);
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

  it('does not replace for x marketing page', () => {
    expect(replaceUrl(`/components/data-grid/getting-started/#main-content`, '/x/')).to.equal(
      `/components/data-grid/getting-started/#main-content`,
    );
  });
});
