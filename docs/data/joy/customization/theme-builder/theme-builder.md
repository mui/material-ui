# Theme builder

<p class="description">A tool for generating Joy UI theme.</p>

## Customize the palette

1. On the left panel, you see the default Joy UI palettes. Select one to open the color token editor.
2. Each palette contains a `primitive` and `global variant` sets of tokens.

   - **Primitive:** this is the list of 10 values ranging from 50 to 900 (lightest to dark). It's where you add each value's HEX code.
   - **Global variant:** refers to higher level tokens, that use the primitive ones, with semantic meaning.

3. Browse through famous sets of colors or fill in each primitive value with your own HEX color code scale. You can also reduce the number of primitive colors by clicking on the minus icon button.
4. Click on "Show me the code" to see a snippet of your changes, that you can copy and paste onto your codebase. You can also open it on CodeSandbox to play with it even further.

{{"component": "modules/components/JoyThemeBuilder.tsx"}}
