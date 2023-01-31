# Theme builder

<p class="description">A tool for generating Joy UI theme.</p>

## Palette

<details>
  <summary>How to use</summary>

1. At the top-left of the toolbar, pick a color scheme (default to light) to start customizing the colors.
2. On the left panel, you will see the default palettes. Select one to open the token editor.
3. Each palette contains `primitive` and `global variant` tokens.
   - **Primitive tokens**: You can select a predefined colors by clicking "Browse palette" or manually fill the color in the input. The placeholder you see is the default value of the token if you don't provide a custom one. You can remove the token from the theme by clicking the button in front of each token.
   - **Global variant tokens**: When you edit a global variant token, you can choose a value that refers to other token in the theme or fill a color manually. You can also add a new global variant token and preview the change instantly.
4. Once you have done with the customization, you can see the snippet by clicking **_"Show me the code"_** button. An alternative way is to click **_"Open sandbox"_** to open a sandbox playground with the custom theme.

</details>

{{"component": "modules/components/JoyThemeBuilder.tsx"}}
