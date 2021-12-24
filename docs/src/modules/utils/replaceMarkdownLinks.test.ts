import { expect } from 'chai';
import replaceMarkdownLinks, {
  replaceAPILinks,
  replaceComponentLinks,
} from './replaceMarkdownLinks';

describe('replaceMarkdownLinks', () => {
  it('replace correct component links', () => {
    expect(
      replaceComponentLinks(`
      <ul>
      <li><a href="/components/button-group/">Button Group</a></li>
      <li><a href="/components/buttons/">Buttons</a></li>
      <li><a href="/components/tree-view/">Tree view</a></li>
      <li><a href="/components/data-grid/demo/">Demo</a></li>
      </ul>
    `),
    ).to.equal(`
      <ul>
      <li><a href="/material/react-button-group/">Button Group</a></li>
      <li><a href="/material/react-buttons/">Buttons</a></li>
      <li><a href="/material/react-tree-view/">Tree view</a></li>
      <li><a href="/x/react-data-grid/demo/">Demo</a></li>
      </ul>
    `);
  });

  it('should do nothing if the components have updated', () => {
    expect(
      replaceComponentLinks(`
      <ul>
      <li><a href="/material/react-button-group/">Button Group</a></li>
      <li><a href="/material/react-buttons/">Buttons</a></li>
      <li><a href="/material/react-tree-view/">Tree view</a></li>
      <li><a href="/x/react-data-grid/demo/">Demo</a></li>
      </ul>
    `),
    ).to.equal(`
      <ul>
      <li><a href="/material/react-button-group/">Button Group</a></li>
      <li><a href="/material/react-buttons/">Buttons</a></li>
      <li><a href="/material/react-tree-view/">Tree view</a></li>
      <li><a href="/x/react-data-grid/demo/">Demo</a></li>
      </ul>
    `);
  });

  it('replace correct API links', () => {
    expect(
      replaceAPILinks(`
    <h2 id="heading-api"><span class="anchor-link" id="api"></span>API<a aria-labelledby="heading-api" class="anchor-link-style" href="#api" tabindex="-1"><svg><use xlink:href="#anchor-link-icon" /></svg></a></h2><ul>
<li><a href="/api/button/"><code>&lt;Button /&gt;</code></a></li>
<li><a href="/api/button-base/"><code>&lt;ButtonBase /&gt;</code></a></li>
<li><a href="/api/button-unstyled/"><code>&lt;ButtonUnstyled /&gt;</code></a></li>
<li><a href="/api/icon-button/"><code>&lt;IconButton /&gt;</code></a></li>
<li><a href="/api/loading-button/"><code>&lt;LoadingButton /&gt;</code></a></li>
<li><a href="/api/data-grid/data-grid/">DataGrid</a></li>
<li><a href="/api/data-grid/data-grid-pro/">DataGridPro</a></li>
<li><a href="/styles/api/">Styles</a></li>
<li><a href="/system/basics/">System</a></li>
</ul>
    `),
    ).to.equal(`
    <h2 id="heading-api"><span class="anchor-link" id="api"></span>API<a aria-labelledby="heading-api" class="anchor-link-style" href="#api" tabindex="-1"><svg><use xlink:href="#anchor-link-icon" /></svg></a></h2><ul>
<li><a href="/material/api/mui-material/button/"><code>&lt;Button /&gt;</code></a></li>
<li><a href="/material/api/mui-material/button-base/"><code>&lt;ButtonBase /&gt;</code></a></li>
<li><a href="/material/api/mui-base/button-unstyled/"><code>&lt;ButtonUnstyled /&gt;</code></a></li>
<li><a href="/material/api/mui-material/icon-button/"><code>&lt;IconButton /&gt;</code></a></li>
<li><a href="/material/api/mui-lab/loading-button/"><code>&lt;LoadingButton /&gt;</code></a></li>
<li><a href="/x/api/mui-data-grid/data-grid/">DataGrid</a></li>
<li><a href="/x/api/mui-data-grid/data-grid-pro/">DataGridPro</a></li>
<li><a href="/styles/api/">Styles</a></li>
<li><a href="/system/basics/">System</a></li>
</ul>
    `);
  });

  it('should do nothing if the APIs have updated', () => {
    expect(
      replaceAPILinks(`
      <h2 id="heading-api"><span class="anchor-link" id="api"></span>API<a aria-labelledby="heading-api" class="anchor-link-style" href="#api" tabindex="-1"><svg><use xlink:href="#anchor-link-icon" /></svg></a></h2><ul>
  <li><a href="/material/api/mui-material/button/"><code>&lt;Button /&gt;</code></a></li>
  <li><a href="/material/api/mui-material/button-base/"><code>&lt;ButtonBase /&gt;</code></a></li>
  <li><a href="/material/api/mui-base/button-unstyled/"><code>&lt;ButtonUnstyled /&gt;</code></a></li>
  <li><a href="/material/api/mui-material/icon-button/"><code>&lt;IconButton /&gt;</code></a></li>
  <li><a href="/material/api/mui-lab/loading-button/"><code>&lt;LoadingButton /&gt;</code></a></li>
  </ul>
      `),
    ).to.equal(`
      <h2 id="heading-api"><span class="anchor-link" id="api"></span>API<a aria-labelledby="heading-api" class="anchor-link-style" href="#api" tabindex="-1"><svg><use xlink:href="#anchor-link-icon" /></svg></a></h2><ul>
  <li><a href="/material/api/mui-material/button/"><code>&lt;Button /&gt;</code></a></li>
  <li><a href="/material/api/mui-material/button-base/"><code>&lt;ButtonBase /&gt;</code></a></li>
  <li><a href="/material/api/mui-base/button-unstyled/"><code>&lt;ButtonUnstyled /&gt;</code></a></li>
  <li><a href="/material/api/mui-material/icon-button/"><code>&lt;IconButton /&gt;</code></a></li>
  <li><a href="/material/api/mui-lab/loading-button/"><code>&lt;LoadingButton /&gt;</code></a></li>
  </ul>
      `);
  });

  it('only replace links for new routes (/material/* & /x/*)', () => {
    expect(
      replaceMarkdownLinks(
        `
    <ul>
    <li><a href="/components/button-group/">Button Group</a></li>
    <li><a href="/components/buttons/">Buttons</a></li>
    <li><a href="/components/tree-view/">Tree view</a></li>
    <li><a href="/components/data-grid/demo/">Demo</a></li>
    <li><a href="/api/button/"><code>&lt;Button /&gt;</code></a></li>
    <li><a href="/api/button-base/"><code>&lt;ButtonBase /&gt;</code></a></li>
    <li><a href="/api/button-unstyled/"><code>&lt;ButtonUnstyled /&gt;</code></a></li>
    <li><a href="/api/icon-button/"><code>&lt;IconButton /&gt;</code></a></li>
    <li><a href="/api/loading-button/"><code>&lt;LoadingButton /&gt;</code></a></li>
    <li><a href="/api/data-grid/data-grid/">DataGrid</a></li>
    <li><a href="/api/data-grid/data-grid-pro/">DataGridPro</a></li>
    <li><a href="/styles/api/">Styles</a></li>
    <li><a href="/system/basics/">System</a></li>
    </ul>
    `,
        '/material/react-buttons',
      ),
    ).to.equal(`
    <ul>
    <li><a href="/material/react-button-group/">Button Group</a></li>
    <li><a href="/material/react-buttons/">Buttons</a></li>
    <li><a href="/material/react-tree-view/">Tree view</a></li>
    <li><a href="/x/react-data-grid/demo/">Demo</a></li>
    <li><a href="/material/api/mui-material/button/"><code>&lt;Button /&gt;</code></a></li>
    <li><a href="/material/api/mui-material/button-base/"><code>&lt;ButtonBase /&gt;</code></a></li>
    <li><a href="/material/api/mui-base/button-unstyled/"><code>&lt;ButtonUnstyled /&gt;</code></a></li>
    <li><a href="/material/api/mui-material/icon-button/"><code>&lt;IconButton /&gt;</code></a></li>
    <li><a href="/material/api/mui-lab/loading-button/"><code>&lt;LoadingButton /&gt;</code></a></li>
    <li><a href="/x/api/mui-data-grid/data-grid/">DataGrid</a></li>
    <li><a href="/x/api/mui-data-grid/data-grid-pro/">DataGridPro</a></li>
    <li><a href="/styles/api/">Styles</a></li>
    <li><a href="/system/basics/">System</a></li>
    </ul>
    `);
  });

  it('does nothing for old routes', () => {
    expect(
      replaceMarkdownLinks(
        `
      <ul>
      <li><a href="/components/button-group/">Button Group</a></li>
      <li><a href="/components/buttons/">Buttons</a></li>
      <li><a href="/components/tree-view/">Tree view</a></li>
      <li><a href="/components/data-grid/demo/">Demo</a></li>
      </ul>
    `,
        '/components/buttons/',
      ),
    ).to.equal(`
      <ul>
      <li><a href="/components/button-group/">Button Group</a></li>
      <li><a href="/components/buttons/">Buttons</a></li>
      <li><a href="/components/tree-view/">Tree view</a></li>
      <li><a href="/components/data-grid/demo/">Demo</a></li>
      </ul>
    `);
  });
});
