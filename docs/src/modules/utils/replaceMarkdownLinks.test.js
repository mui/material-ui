import { expect } from 'chai';
import replaceMarkdownLinks, {
  replaceMaterialLinks,
  replaceAPILinks,
  replaceComponentLinks,
} from './replaceMarkdownLinks';
import FEATURE_TOGGLE from '../../featureToggle';

describe('replaceMarkdownLinks', () => {
  it('replace material related links', () => {
    expect(
      replaceMaterialLinks(`
      [reading this guide on minimizing bundle size](/guides/minimizing-bundle-size/)
      [default props](/customization/theme-components/#default-props)
      [Get started](/getting-started/usage/)
      [Tree view](/discover-more/related-projects/)
    `),
    ).to.equal(`
      [reading this guide on minimizing bundle size](/material/guides/minimizing-bundle-size/)
      [default props](/material/customization/theme-components/#default-props)
      [Get started](/material/getting-started/usage/)
      [Tree view](/material/discover-more/related-projects/)
    `);
  });

  it('should not change if links have been updated', () => {
    expect(
      replaceMaterialLinks(`
      [reading this guide on minimizing bundle size](/material/guides/minimizing-bundle-size/)
      [default props](/material/customization/theme-components/#default-props)
      [Get started](/material/getting-started/usage/)
      [Tree view](/material/discover-more/related-projects/)
    `),
    ).to.equal(`
      [reading this guide on minimizing bundle size](/material/guides/minimizing-bundle-size/)
      [default props](/material/customization/theme-components/#default-props)
      [Get started](/material/getting-started/usage/)
      [Tree view](/material/discover-more/related-projects/)
    `);
  });

  it('replace correct component links', () => {
    expect(
      replaceComponentLinks(`
      [ButtonGroup](/components/button-group/)
      [Buttons](/components/buttons/)
      [text](/components/checkboxes/#main-content)
      [text](/components/radio-buttons#main-content)
      [text](/components/selects/#main-content)
      [text](/components/switches/#main-content)
      [text](/components/text-fields/#main-content)
      [text](/components/avatars/#main-content)
      [text](/components/badges/#main-content)
      [text](/components/chips/#main-content)
      [text](/components/dividers/#main-content)
      [text](/components/icons/#main-content)
      [text](/components/material-icons/#main-content)
      [text](/components/lists/#main-content)
      [text](/components/tables/#main-content)
      [text](/components/tooltips/#main-content)
      [text](/components/dialogs/#main-content)
      [text](/components/snackbars/#main-content)
      [text](/components/cards/#main-content)
      [text](/components/breadcrumbs/#main-content)
      [text](/components/drawers/#main-content)
      [text](/components/links/#main-content)
      [text](/components/menus/#main-content)
      [text](/components/steppers/#main-content)
      [text](/components/tabs/#main-content)
      [text](/components/transitions/#main-content)
      [text](/components/pickers/#main-content)
      [text](/components/trap-focus/#main-content)
      [text](/components/css-baseline/#main-content)
      [text](/components/no-ssr/#main-content)
      [text](/components/image-list/#main-content)
      [text](/components/progress/#main-content)
      -
      [Tree view](/components/tree-view/)
      [Demo](/components/data-grid/demo/)
    `),
    ).to.equal(`
      [ButtonGroup](/material/react-button-group/)
      [Buttons](/material/react-button/)
      [text](/material/react-checkbox/#main-content)
      [text](/material/react-radio-button#main-content)
      [text](/material/react-select/#main-content)
      [text](/material/react-switch/#main-content)
      [text](/material/react-text-field/#main-content)
      [text](/material/react-avatar/#main-content)
      [text](/material/react-badge/#main-content)
      [text](/material/react-chip/#main-content)
      [text](/material/react-divider/#main-content)
      [text](/material/icons/#main-content)
      [text](/material/material-icons/#main-content)
      [text](/material/react-list/#main-content)
      [text](/material/react-table/#main-content)
      [text](/material/react-tooltip/#main-content)
      [text](/material/react-dialog/#main-content)
      [text](/material/react-snackbar/#main-content)
      [text](/material/react-card/#main-content)
      [text](/material/react-breadcrumbs/#main-content)
      [text](/material/react-drawer/#main-content)
      [text](/material/react-link/#main-content)
      [text](/material/react-menu/#main-content)
      [text](/material/react-stepper/#main-content)
      [text](/material/react-tabs/#main-content)
      [text](/material/transitions/#main-content)
      [text](/material/pickers/#main-content)
      [text](/material/react-trap-focus/#main-content)
      [text](/material/react-css-baseline/#main-content)
      [text](/material/react-no-ssr/#main-content)
      [text](/material/react-image-list/#main-content)
      [text](/material/react-progress/#main-content)
      -
      [Tree view](/material/react-tree-view/)
      [Demo](/x/react-data-grid/demo/)
    `);
  });

  it('should do nothing if the components have updated', () => {
    expect(
      replaceComponentLinks(`
      [ButtonGroup](/material/react-button-group/)
      [Buttons](/material/react-button/)
      [text](/material/react-checkbox/#main-content)
      [text](/material/react-radio-button#main-content)
      [text](/material/react-select/#main-content)
      [text](/material/react-switch/#main-content)
      [text](/material/react-text-field/#main-content)
      [text](/material/react-avatar/#main-content)
      [text](/material/react-badge/#main-content)
      [text](/material/react-chip/#main-content)
      [text](/material/react-divider/#main-content)
      [text](/material/icons/#main-content)
      [text](/material/material-icons/#main-content)
      [text](/material/react-list/#main-content)
      [text](/material/react-table/#main-content)
      [text](/material/react-tooltip/#main-content)
      [text](/material/react-dialog/#main-content)
      [text](/material/react-snackbar/#main-content)
      [text](/material/react-card/#main-content)
      [text](/material/react-breadcrumbs/#main-content)
      [text](/material/react-drawer/#main-content)
      [text](/material/react-link/#main-content)
      [text](/material/react-menu/#main-content)
      [text](/material/react-stepper/#main-content)
      [text](/material/react-tabs/#main-content)
      [text](/material/transitions/#main-content)
      [text](/material/pickers/#main-content)
      -
      [Tree view](/material/react-tree-view/)
      [Demo](/x/react-data-grid/demo/)
    `),
    ).to.equal(`
      [ButtonGroup](/material/react-button-group/)
      [Buttons](/material/react-button/)
      [text](/material/react-checkbox/#main-content)
      [text](/material/react-radio-button#main-content)
      [text](/material/react-select/#main-content)
      [text](/material/react-switch/#main-content)
      [text](/material/react-text-field/#main-content)
      [text](/material/react-avatar/#main-content)
      [text](/material/react-badge/#main-content)
      [text](/material/react-chip/#main-content)
      [text](/material/react-divider/#main-content)
      [text](/material/icons/#main-content)
      [text](/material/material-icons/#main-content)
      [text](/material/react-list/#main-content)
      [text](/material/react-table/#main-content)
      [text](/material/react-tooltip/#main-content)
      [text](/material/react-dialog/#main-content)
      [text](/material/react-snackbar/#main-content)
      [text](/material/react-card/#main-content)
      [text](/material/react-breadcrumbs/#main-content)
      [text](/material/react-drawer/#main-content)
      [text](/material/react-link/#main-content)
      [text](/material/react-menu/#main-content)
      [text](/material/react-stepper/#main-content)
      [text](/material/react-tabs/#main-content)
      [text](/material/transitions/#main-content)
      [text](/material/pickers/#main-content)
      -
      [Tree view](/material/react-tree-view/)
      [Demo](/x/react-data-grid/demo/)
    `);
  });

  it('replace correct API links', () => {
    expect(
      replaceAPILinks(`
      [Button](/api/button)
      [No Ssr](/api/no-ssr)
      [Portal](/api/portal)
      [Textarea Autosize](/api/textarea-autosize)
      [ButtonBase](/api/button-base)
      [ButtonUnstyled](/api/button-unstyled)
      [IconButton](/api/icon-button)
      [LoadingButton](/api/loading-button)
      [DataGrid](/api/data-grid/data-grid)
      [DataGridPro](/api/data-grid/data-grid-pro)
      [System](/system/basics)
    `),
    ).to.equal(`
      [Button](/material/api/button)
      [No Ssr](/base/api/no-ssr)
      [Portal](/base/api/portal)
      [Textarea Autosize](/base/api/textarea-autosize)
      [ButtonBase](/material/api/button-base)
      [ButtonUnstyled](/base/api/button-unstyled)
      [IconButton](/material/api/icon-button)
      [LoadingButton](/material/api/loading-button)
      [DataGrid](/x/api/data-grid/data-grid)
      [DataGridPro](/x/api/data-grid/data-grid-pro)
      [System](/system/basics)
    `);
  });

  it('should do nothing if the APIs have updated', () => {
    expect(
      replaceAPILinks(`
      [Button](/material/api/button)
      [ButtonBase](/material/api/button-base)
      [ButtonUnstyled](/base/api/button-unstyled)
      [IconButton](/material/api/icon-button)
      [LoadingButton](/material/api/loading-button)
      [DataGrid](/x/api/data-grid/data-grid)
      [DataGridPro](/x/api/data-grid/data-grid-pro)
      [System](/system/basics)
      `),
    ).to.equal(`
      [Button](/material/api/button)
      [ButtonBase](/material/api/button-base)
      [ButtonUnstyled](/base/api/button-unstyled)
      [IconButton](/material/api/icon-button)
      [LoadingButton](/material/api/loading-button)
      [DataGrid](/x/api/data-grid/data-grid)
      [DataGridPro](/x/api/data-grid/data-grid-pro)
      [System](/system/basics)
      `);
  });

  it('only replace links for components, api', () => {
    expect(
      replaceMarkdownLinks(
        `
        [ButtonGroup](/components/button-group/)
        [Buttons](/components/buttons/)
        [text](/components/checkboxes/#main-content)
        [text](/components/radio-buttons#main-content)
        [text](/components/selects/#main-content)
        [text](/components/switches/#main-content)
        [text](/components/text-fields/#main-content)
        [text](/components/avatars/#main-content)
        [text](/components/badges/#main-content)
        [text](/components/chips/#main-content)
        [text](/components/dividers/#main-content)
        [text](/components/icons/#main-content)
        [text](/components/material-icons/#main-content)
        [text](/components/lists/#main-content)
        [text](/components/tables/#main-content)
        [text](/components/tooltips/#main-content)
        [text](/components/dialogs/#main-content)
        [text](/components/snackbars/#main-content)
        [text](/components/cards/#main-content)
        [text](/components/breadcrumbs/#main-content)
        [text](/components/drawers/#main-content)
        [text](/components/links/#main-content)
        [text](/components/menus/#main-content)
        [text](/components/steppers/#main-content)
        [text](/components/tabs/#main-content)
        [text](/components/transitions/#main-content)
        [text](/components/pickers/#main-content)
        -
        [Tree view](/components/tree-view/)
        [Demo](/components/data-grid/demo/)

        [Button](/material/api/button)
        [ButtonBase](/material/api/button-base)
        [ButtonUnstyled](/base/api/button-unstyled)
        [IconButton](/material/api/icon-button)
        [LoadingButton](/material/api/loading-button)
        [DataGrid](/x/api/data-grid/data-grid)
        [DataGridPro](/x/api/data-grid/data-grid-pro)
        [System](/system/basics)
    `,
      ),
    ).to.equal(`
        [ButtonGroup](/material/react-button-group/)
        [Buttons](/material/react-button/)
        [text](/material/react-checkbox/#main-content)
        [text](/material/react-radio-button#main-content)
        [text](/material/react-select/#main-content)
        [text](/material/react-switch/#main-content)
        [text](/material/react-text-field/#main-content)
        [text](/material/react-avatar/#main-content)
        [text](/material/react-badge/#main-content)
        [text](/material/react-chip/#main-content)
        [text](/material/react-divider/#main-content)
        [text](/material/icons/#main-content)
        [text](/material/material-icons/#main-content)
        [text](/material/react-list/#main-content)
        [text](/material/react-table/#main-content)
        [text](/material/react-tooltip/#main-content)
        [text](/material/react-dialog/#main-content)
        [text](/material/react-snackbar/#main-content)
        [text](/material/react-card/#main-content)
        [text](/material/react-breadcrumbs/#main-content)
        [text](/material/react-drawer/#main-content)
        [text](/material/react-link/#main-content)
        [text](/material/react-menu/#main-content)
        [text](/material/react-stepper/#main-content)
        [text](/material/react-tabs/#main-content)
        [text](/material/transitions/#main-content)
        [text](/material/pickers/#main-content)
        -
        [Tree view](/material/react-tree-view/)
        [Demo](/x/react-data-grid/demo/)

        [Button](/material/api/button)
        [ButtonBase](/material/api/button-base)
        [ButtonUnstyled](/base/api/button-unstyled)
        [IconButton](/material/api/icon-button)
        [LoadingButton](/material/api/loading-button)
        [DataGrid](/x/api/data-grid/data-grid)
        [DataGridPro](/x/api/data-grid/data-grid-pro)
        [System](/system/basics)
    `);
    if (FEATURE_TOGGLE.enable_system_scope) {
      expect(`[Styles](/styles/api/)`).to.equal(`[Styles](/system/styles/api/)`);
    } else {
      expect(`[Styles](/styles/api/)`).to.equal(`[Styles](/styles/api/)`);
    }
  });

  it('does not change after transformed', () => {
    expect(
      replaceMarkdownLinks(
        `
        [ButtonGroup](/material/react-button-group/)
        [Buttons](/material/react-button/)
        [text](/material/react-checkbox/#main-content)
        [text](/material/react-radio-button#main-content)
        [text](/material/react-select/#main-content)
        [text](/material/react-switch/#main-content)
    `,
      ),
    ).to.equal(`
        [ButtonGroup](/material/react-button-group/)
        [Buttons](/material/react-button/)
        [text](/material/react-checkbox/#main-content)
        [text](/material/react-radio-button#main-content)
        [text](/material/react-select/#main-content)
        [text](/material/react-switch/#main-content)
    `);
  });
});
