---
components: Link
---

# Links

<p class="description">O componente Link permite que você personalize facilmente elementos de âncora com suas cores de tema e estilos de tipografia.</p>

## Links simples

O componente Link é construído sobre o componente [Typography](/api/typography/). Você pode aproveitar suas propriedades.

{{"demo": "pages/components/links/Links.js"}}

No entanto, o componente Link possui propriedades padrão diferentes do componente Typography:

- A propriedade `color="primary"`, pelo fato de que o link precisa se destacar.
- A propriedade `variant="inherit"`, já que o link será na maioria das vezes usado como filho de um componente Typography.

## Segurança

Quando você usa `target="_blank"` com Links, é [recomendado](https://developers.google.com/web/tools/lighthouse/audits/noopener) sempre definir `rel="noopener"` ou `rel="noreferrer"` quando conectando a conteúdo de terceiros.

- `rel="noopener"` impede que a nova página possa acessar a propriedade `window.opener` e garante que ela seja executada em um processo separado. Sem isso, a página de destino pode potencialmente redirecionar sua página para uma URL mal-intencionada.
- `rel="noreferrer"` tem o mesmo efeito, mas também impede que o cabeçalho *Referer* seja enviado para a nova página. ⚠️ A remoção do cabeçalho referrer afetará a análise.

## Biblioteca de roteamento de terceiros

Uma situação comum é executar a navegação apenas no lado do cliente, sem uma ida e volta HTTP ao servidor. O componente `Link` fornece uma propriedade para lidar com esta situação: `component`.

Aqui está um [exemplo de integração com react-router](/guides/composition/#link).

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- Ao fornecer o conteúdo para o link, evite descrições genéricas como "clique aqui" ou "vá para". Em vez disso, use [descrições específicas](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- Para a melhor experiência do usuário, os links devem se destacar do texto na página.
- Se o link não tem um href significativo, [ele deve ser renderizado usando um elemento `<button>`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}