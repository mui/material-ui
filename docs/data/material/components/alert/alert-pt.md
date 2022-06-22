---
product: material-ui
title: Componente React para Alertas
components: Alert, AlertTitle
githubLabel: 'component: Alert'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert'
---

# Alerta

<p class="description">Um alerta exibe uma mensagem curta e importante de uma forma que atrai a atenção do usuário sem interromper o que ele estiver fazendo.</p>

**Nota:** Este componente não está documentado nas [diretrizes do Material Design](https://material.io/), mas MUI o suporta.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Alertas básicos

O alerta oferece quatro níveis de severidade que se distinguem em diferentes ícones e cores.

{{"demo": "BasicAlerts.js"}}

## Descrição

Você pode usar o componente `AlertTitle` para exibir um título formatado acima do conteúdo.

{{"demo": "DescriptionAlerts.js"}}

## Ações

Um alerta pode conter uma ação, como um botão de fechar ou desfazer. A ação é renderizada depois da mensagem, na parte final do alerta.

Se um callback `onClose` é fornecido e a propriedade `action` não é definida, um ícone de fechar será exibido. A propriedade `action` pode ser usada para fornecer uma ação alternativa, por exemplo, usando um Button ou IconButton.

{{"demo": "ActionAlerts.js"}}

### Transição

Você pode utilizar um [componente de transição](/material-ui/transitions/) como um `Collapse` para realizar uma transição na exibição do alerta.

{{"demo": "TransitionAlerts.js"}}

## Ícones

A propriedade `icon` permite que você adicione um ícone no início do componente de alerta. Isto substituirá o ícone padrão de acordo com a severidade especificada.

Você pode alterar a severidade padrão e o mapeamento do ícone com a propriedade `iconMapping`. Isso pode ser definido globalmente utilizando a [customização do tema](/material-ui/customization/theme-components/#default-props).

Definir a propriedade `icon` como falso removerá o ícone completamente.

{{"demo": "IconAlerts.js"}}

## Variantes

Duas variantes adicionais estão disponíveis – delineado e preenchido:

### Delineado

{{"demo": "OutlinedAlerts.js"}}

### Preenchido

{{"demo": "FilledAlerts.js"}}

## Toast

Você pode usar o componente Snackbar para [exibir um toast](/material-ui/react-snackbar/#customized-snackbars) com o componente Alert.

## Cor

A propriedade `color` irá sobrescrever a cor padrão para a severidade especificada.

{{"demo": "ColorAlerts.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

Quando o componente é exibido de forma dinâmica, o conteúdo é automaticamente anunciado pela maioria dos leitores de tela. No momento, os leitores de tela não informam aos usuários sobre alertas que estão presentes quando a página carrega.

O uso de cores para adicionar significado apenas fornece uma indicação visual, que não vai ser transmitida para usuários de tecnologias assistivas, como leitores de tela. Certifique-se de que a informação indicada pela cor seja clara a partir do próprio conteúdo (por exemplo, o texto visível), ou esteja incluída através de meios alternativos, como um texto oculto adicional.

As ações devem ter um índice de tabulação de 0 para que possam ser acessíveis por usuários que usam apenas o teclado.
