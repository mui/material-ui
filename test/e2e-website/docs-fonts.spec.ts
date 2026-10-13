import { test, expect } from '@playwright/test';

for (const javaScriptEnabled of [false, true]) {
  test.describe(`Docs fonts (${javaScriptEnabled ? 'hydrated' : 'server-rendered'})`, () => {
    test.use({ javaScriptEnabled });

    test('keeps normal body text and semibold headings', async ({ page }) => {
      await page.goto('/material-ui/getting-started/installation/');
      if (javaScriptEnabled) {
        await expect(page.locator('body')).toHaveAttribute('dir', 'ltr');
      }

      await expect(page.locator('body')).toHaveCSS('font-weight', '400');

      // Use plain elements to check inheritance without component typography styles.
      const inheritedWeights = await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML =
          '<p>Paragraph</p><label>Label</label><fieldset><legend>Legend</legend></fieldset>';
        document.body.appendChild(container);
        const weights = Array.from(
          container.querySelectorAll('p, label, legend'),
          (element) => getComputedStyle(element).fontWeight,
        );
        container.remove();
        return weights;
      });
      expect(inheritedWeights).toEqual(['400', '400', '400']);

      const heading = page.getByRole('heading', { name: 'Installation', exact: true });
      await expect(heading).toHaveCSS('font-weight', '600');
      await expect(heading).toHaveCSS('font-family', /General Sans/);
    });
  });
}
