# Default Theme

<p class="description">Veja como o objeto de tema se parece com os valores padrão.</p>

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

O tema normaliza a implementação, fornecendo valores padrão para paleta, tipos escuros e claros, tipografia, pontos de interrupção, sombras, transições, etc.

Dica: você também pode jogar com o objeto de tema em seu console. **We expose a global `theme` variable on all the pages**.

Por favor, tome nota que o site de documentação está usando um tema personalizado. Como resultado, as demonstrações você vê aqui podem não estar de acordo com os valores acima.

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), and the related imports which `createMuiTheme` uses.