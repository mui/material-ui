# Search keywords

You are writing search keywords for Material UI icons, shown on an icon search page. People type short queries (1–3 words) to find an icon, either by what it means ("delete", "settings", "log out") or by what it looks like ("trash can", "three dots", "eye with slash").

## Input

- Sheet images in `{{WORK_DIR}}/sheets/`: each `sheet_XXX.png` is a 4×4 grid of up to 16 icons, each cell labeled `<number>. <IconName>`. The exact icon names per sheet are in `{{WORK_DIR}}/manifest.json` (array of `{ id, file, names }`).
- `{{WORK_DIR}}/synonyms.json` maps each icon name to the search keywords that already exist for it (chosen by people, may be empty or noisy).
- For each sheet, `{{WORK_DIR}}/out/visual_XXX.json` maps each icon name to a short description of what the icon looks like, written earlier.

Read the manifest and `synonyms.json` once. Then, for each sheet, read its visual descriptions and view the sheet image with the Read tool. Do not crop, zoom or otherwise process the images, and do not open icon source files. Only use Read and Write.

Your sheets: {{SHEETS}}

## What to write for every icon

An array of 8–15 lowercase strings, single words or short phrases (at most 3 words), that someone might type to find this icon and that are NOT already covered by the icon name or the existing synonyms. Add what is missing:

- Synonyms for the concept (delete → erase, discard).
- Everyday and informal names for the drawn object (gear → cog; three vertical dots → kebab menu; trash can → bin, dustbin; three horizontal lines → hamburger menu).
- Short appearance phrases people might type, based on the drawing and the visual description ("eye with slash", "arrow in circle", "house with chimney").
- British and American variants where they differ (trash / rubbish, elevator / lift).
- What the icon is typically used for in an app UI (settings page, upload file, log out, mark as favorite).
- The expansion of abbreviations in the name (Hdr → high dynamic range, Sip → session initiation protocol, Mp → megapixel).
- For brand logos, the brand and company name.

Do not include:

- Words already in the icon name or the existing synonyms (plurals and small spelling variants of them count as already covered).
- Generic filler: icon, symbol, button, sign, shape, graphic, image, filled, outlined, solid, black, simple, material.
- Style words: filled, outlined, rounded, sharp, two tone.
- Keywords that belong to a different icon on the sheet: neighboring icons are often variants (Mic, MicOff, MicNone). Keywords must fit this specific icon, for example "mute" for MicOff, not for Mic.

If the name and synonyms already cover an icon well, it is fine to return fewer (at least 5), but never pad with weak words.

## Output

For each of your sheets, write `{{WORK_DIR}}/out/kw_XXX.json` (same `XXX` as the sheet) with the Write tool: one JSON object mapping each exact icon name to its keyword array, for example `{"Mail": ["envelope", "..."], "MailLock": ["..."]}`. Every icon on the sheet must appear exactly once. The file must be valid JSON.

Work through your sheets one at a time. Do not write anywhere else.

When done, reply with one line only: the sheet ids you completed and the total number of icons written.
