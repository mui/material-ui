<!-- Thanks so much for your PR, your contribution is appreciated! ❤️ -->

If anything is unclear consult https://github.com/mui-org/material-ui/blob/master/CONTRIBUTING.md.

Before you open this pull request make sure the following is true:
- The branch is not behind master.
- If a feature was added:
   - If this was already achievable with the core library explained why this
      needs to be added to the core.
   - Added tests.
   - If this is a common use case considered adding an example to the documentation 
- If a bug was fixed added test cases that fail without the fix.
- The code is formatted with `prettier` (run `yarn prettier`).
- The code is linted (run `yarn lint`).
- If documentation was changed in the source `yarn docs:api` was run.
- If prop types were changed the typescript declarations were updated.
- If typescript declarations were changed `yarn typescript` passed.
- The title of this PR follows the pattern `[Component] Imperative commit message`.