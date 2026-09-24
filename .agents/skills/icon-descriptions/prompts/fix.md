# Description cleanup

`{{WORK_DIR}}/out/visual_to_fix.json` maps UI icon names to one-sentence visual descriptions. Each sentence uses a word that is not allowed: filled, outline, outlined, solid, hollow, black, icon, depicting, showing.

Why: the same description is used for the filled, outlined, rounded, sharp and two-tone versions of each icon, so words about fill or stroke style are wrong for some of those versions. "icon", "depicting" and "showing" are filler.

Rewrite each sentence with a minimal edit so none of those words remain, keeping everything else (objects, positions, counts, arrow directions, letters) exactly as it is:

- Style adjectives: drop them. "house outline with a plus badge" → "house with a plus badge"; "filled circle with a pale arrow" → "circle with an arrow"; "small solid triangle pointing down" → "small triangle pointing down".
- When the word carries real meaning, rephrase instead of dropping: "one dashed and one solid" → "one dashed and one continuous"; "area beneath it filled in" → "area beneath it shaded"; "side view outline of a seat" → "side view of a seat"; "hands showing a time" → "hands pointing to a time".
- Colour words that only exist because of the fill (a pale arrow inside a filled circle) can go: "arrow inside".
- Keep a lowercase start, no trailing period, 5–20 words.

Write `{{WORK_DIR}}/out/visual_fixed.json` with the Write tool: the same keys, each mapped to the rewritten sentence. Include every key. Valid JSON. Do not write anywhere else. You do not need to view any images.

When done, reply with one line: the file path and the number of entries.
