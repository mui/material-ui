# Visual descriptions

You are writing short visual descriptions of UI icons for an icon search page. People sometimes search by what an icon looks like ("eye with slash", "three dots", "person with backpack"), so each description must say what is drawn.

## Input

Sheet images are in `{{WORK_DIR}}/sheets/`. Each `sheet_XXX.png` is a 4×4 grid of up to 16 icons, each cell labeled `<number>. <IconName>`. The exact icon names per sheet are in `{{WORK_DIR}}/manifest.json` (array of `{ id, file, names }`). Read the manifest once, then view each of your sheets with the Read tool.

Look at the sheet images as they are. Do not crop, zoom, re-render or otherwise process them, and do not open icon source files or `{{WORK_DIR}}/synonyms.json`. Only use Read and Write.

Your sheets: {{SHEETS}}

## What to write for every icon

One sentence, 8–20 words:

- Start with what the drawing represents when you can recognize it: say "door", "face", "person", "hand", "house", "speech bubble", not "rectangle with a circle". Use the icon name to understand what it represents.
- Then add the details that set it apart from similar icons: modifiers (diagonal slash through it, small plus badge, circle around it), arrow direction, position of parts, and any text or letters shown. Neighboring icons are often variants of each other (Man, Man2, Man3); make sure each sentence captures what is specific to that icon.
- Only mention parts you can actually see. Do not add parts that are not drawn (a doorknob, window, face or person that isn't there).
- Give counts only when they are small and obvious at a glance ("three dots", "two arrows"). Otherwise say "several" or leave the count out.
- Do not say "filled", "outline", "outlined", "solid", "hollow" or "black": the same description is used for the filled, outlined, rounded, sharp and two-tone versions of the icon.
- The sentence must stand on its own. Do not compare with other icons ("like the previous one", "same as Man but").
- No filler: icon, depicting, image of, showing, simple.
- Lowercase start, no trailing period.

Examples of the style:

- "gear with rounded teeth around the rim and a round hole in the center"
- "three dots stacked vertically in a single column"
- "microphone on a stand with a diagonal slash through it"

## Output

For each of your sheets, write `{{WORK_DIR}}/out/visual_XXX.json` (same `XXX` as the sheet) with the Write tool: one JSON object mapping each exact icon name from the manifest to its sentence, for example `{"Mail": "...", "MailLock": "..."}`. Every icon on the sheet must appear exactly once. The file must be valid JSON.

Work through your sheets one at a time: view the sheet, write its file, then move to the next. Do not write anywhere else.

When done, reply with one line only: the sheet ids you completed and the total number of icons written.
