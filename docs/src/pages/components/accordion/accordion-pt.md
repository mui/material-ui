---
title: Componente de Acordeão React
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Acordeão

<p class="description">Os acordeões contêm fluxos de criação e permitem a edição simplificada de um elemento.</p>

[Um acordeão](https://material.io/archive/guidelines/components/expansion-panels.html) é um contêiner leve que pode estar sozinho ou conectado em uma superfície maior, como um cartão.

> **Nota:** Os acordeões não estão mais documentados nas [diretrizes do Material Design](https://material.io/), mas o Material-UI continuará a suportá-los. Anteriormente, ele era formalmente conhecido como "painel de expansão".

## Acordeão simples

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Acordeão controlado

Estenda o comportamento padrão para criar um acordeão customizado com o componente `Accordion`.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Acordeões customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Ações adicionais

Para colocar uma ação como um `Checkbox` ou um botão dentro do `AccordionSummary`, você precisa parar a propogação do foco e eventos de clique para previnir o painel de expandir/colapsar quando usar a ação. Você deve fornecer também um `aria-label` para a ação, caso contrário, o rótulo da ação aninhada será incluído no rótulo do botão pai que controla a expansão do acordeão.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Performance

O conteúdo dos acordeões é montado por padrão, mesmo que o acordeão não esteja expandido. Esse comportamento padrão tem em mente a renderização do lado do servidor e o SEO. Se você renderizar grandes árvores de componentes dentro de seu acordeão ou simplesmente renderizar muitos acordeões, pode ser uma boa ideia desabilitar esse comportamento padrão habilitando `unmountOnExit` em `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Como acontece com qualquer otimização de desempenho, isso não é uma bala de prata. Certifique-se de identificar gargalos primeiro e, em seguida, experimente essas estratégias de otimização.

## Cabeçalho secundário e colunas

Várias colunas podem ser usadas para estruturar o conteúdo, e um texto auxiliar pode ser adicionado ao acordeão para ajudar o usuário.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Para melhor acessibilidade recomendamos a definição do `id` e `aria-controls` no `AccordionSummary`. O `Accordion` irá derivar os valores de `aria-labelledby` e `id` para a região de conteúdo do acordeão.
