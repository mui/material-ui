---
description: Here are the most significant improvements in September.
---

# September 2019 Update

Olivier Tassinari. October 12, 2019.

Here are the most significant improvements in September:

- 💄 Add `startIcon` and `endIcon` props for the button. It makes it simpler to append an icon:

  ![button icons](/static/blog/september-2019-update/button-icon.png)

  ```jsx
  import DeleteIcon from '@material-ui/icons/Delete';

  <Button startIcon={<DeleteIcon />}>
    Delete
  </Button>
  ```

- 🔐 Add support for Chrome autofill. The `InputBase` component detects Chrome autofill events and updates the label position accordingly.

  ![Autofill](/static/blog/september-2019-update/autofill.png)

- 📊 Launch a [developer survey](https://www.surveymonkey.com/r/5XHDL76) as a precursor to a major Date Picker enhancement effort. We plan a new investment batch of between 100 and 500 hours.

- 📚 Change imports from `@material-ui/styles` to `@material-ui/core/styles`

  The presence of two almost identical import paths has been a source of confusion: @material-ui/styles and @material-ui/core/styles.
  Starting with v4.5.1, the documentation mentions @material-ui/core/styles as much as possible.

  ```diff
  -import { makeStyles } from '@material-ui/styles';
  +import { makeStyles } from '@material-ui/core/styles';
  ```

  This change removes the need to install the `@material-ui/styles` package directly.
  It prevents the duplication of `@material-ui/styles` in bundles and avoids confusion.
  You can [learn more about the difference](https://material-ui.com/styles/basics/#material-ui-core-styles-vs-material-ui-styles) in the documentation.

But this summary is just scratching the surface. We have accepted 199 commits from 61 different contributors. We have changed 1,219 files with 18,223 additions and 11,957 deletions.

## Our roadmap intent for October

*(We'll do our best, no guarantee!)*

- 🔍 We will provide a ready to use autocomplete, combo box, and multi-select components in the lab. You can already [preview it](https://deploy-preview-17037--material-ui.netlify.app/components/autocomplete/).

  ![combobox](/static/blog/september-2019-update/combobox.png)
  <p class="blog-description">Combo box (limited options)</p>

  ![multiselect](/static/blog/september-2019-update/multiselect.png)
  <p class="blog-description">Multi-select</p>

  ![autocomplete](/static/blog/september-2019-update/autocomplete.png)
  <p class="blog-description">Autocomplete (free options)</p>

- 📅 We will start to work on a [major upgrade](https://github.com/mui-org/material-ui-pickers/issues/1293) of the date/time picker components.

- 🧮 We will start to work on a Data Table component.
⭐️ Notice that the advanced features of the data grid will be paid, behind an enterprise subscription. This is an effort part of [our roadmap](/discover-more/roadmap/) to answer enterprise needs.

- ❓ Please upvote our [GitHub issues](https://github.com/mui-org/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.
