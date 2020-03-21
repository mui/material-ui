---
title: Componente do React Alert
components: Alert, AlertTitle
---

# Alert

<p class="description">Um alerta exibe uma mensagem curta e importante de uma forma que atrai a atenção do usuário sem interromper o que ele estiver fazendo.</p>

**Observação:** Este componente não está documentado nos [guias do Material Design](https://material.io/), mas o Material-UI o suporta.

## Alerta simples

Este alerta oferece quatro níveis de severidade que definem diferentes ícones e cores.

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## Descrição

Você pode usar o componente `AlertTitle` para exibir um título formatado acima do conteúdo.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Ações

Um alerta pode conter uma ação, como um botão de fechar ou desfazer. É renderizado depois da mensagem na parte final do alerta.

Se um `onClose` callback é dado e um atributo `action` é passado, um ícone de fechar é exibido. O atributo `action` pode ser usado para fornecer uma ação alternativa, por exemplo usando um Button ou IconButton.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transição

Você pode utilizar um [transition component](/components/transitions/) como `Collapse` para realizar uma transição na aparência do alerta.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Ícones

O atributo `icon` permite que você adicione um ícone no início do componente de alerta. Isto substituirá o ícone padrão de acordo com a gravidade especificada.

Você pode alterar a gravidade padrão para mapeamento de ícones com o atributo `iconMapping`. Isto pode ser definido globalmente utilizando [theme customization](/customization/globals/#default-props).

Definir o atributo ícone como falso removerá o ícone completamente.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variantes

Duas variantes adicionais estão disponíveis – delineadas e preenchidas:

### Outlined

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Preenchido

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Aviso na tela

Você pode usar o componente SnackBar para [exibir um aviso na tela](/components/snackbars/#customized-snackbars) com o componente Alert.

## Cor

A propriedade `color` substituirá a cor padrão para a gravidade especificada.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

Quando o componente é exibido de forma dinâmica, o conteúdo é automaticamente anunciado pela maioria dos leitores de tela. No momento, os leitores de tela não informam aos usuários sobre alertas que estão presentes quando a página carrega.

O uso de cores para adicionar significado apenas fornece uma indicação visual, que não vai ser transmitida para usuários de tecnologias assistivas, como leitores de tela. Certifique-se de que a informação indicada pela cor seja clara a partir do próprio próprio conteúdo (por exemplo, o texto visível), ou esteja incluída através de meios alternativos, como um texto oculto adicional.

As ações devem ter um índice de tabulação igual a 0 para que possam ser alcançadas por usuários que usam apenas o teclado.
