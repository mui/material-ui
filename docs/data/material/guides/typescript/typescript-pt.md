# TypeScript

<p class="description">Você pode adicionar tipagem estática para o JavaScript para melhorar a produtividade do desenvolvimento e a qualidade do código graças ao TypeScript.</p>

## Uso de `withStyles`

<!-- #default-branch-switch -->

Material-UI requires a minimum version of TypeScript 3.5. Have a look at the [Create React App with TypeScript](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-typescript) example.

Dê uma olhada no exemplo [Create React App com TypeScript](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-typescript).

```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}
```

As opções do modo strict são as mesmas que são necessárias para todos os tipos de pacote publicados no namespace `@types/`. Usando uma `tsconfig.json` menos rigorosa ou omitindo algumas das bibliotecas podem causar erros. Para obter a melhor experiência com os tipos, recomendamos configurar `"strict": true`.

## Manipulando `value` e manipuladores de eventos

Muitos componentes preocupados com a entrada do usuário oferecem uma propriedade `value` ou manipuladores de eventos que incluem o valor atual em `value`. Na maioria das situações, `value` só é manipulado dentro do React, o que permite que seja de qualquer tipo, como objetos ou matrizes.

No entanto, esse tipo não pode ser verificado em tempo de compilação em situações em que depende de nós filhos do componente, por exemplo, para `Select` ou `RadioGroup`. Isso significa que a opção mais segura é tipando como `unknown` e deixar que o desenvolvedor decida como deseja restringir esse tipo. Não oferecemos a possibilidade de usar um tipo genérico nesses casos, devido [as mesmas razões que `event.target` não é genérico no React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

As demonstrações incluem variantes tipadas que usam conversão de tipo. É uma troca aceitável porque os tipos estão todos localizados em um único arquivo e são muito básicos. Você tem que decidir por si mesmo se a mesma troca é aceitável para você. The library types are strict by default and loose via opt-in.

## Uso da propriedade `component`

Moved to [/customization/theming/#custom-variables](/material-ui/customization/theming/#custom-variables).

## Complications with the `component` prop

Because of some TypeScript limitations, using the `component` prop can be problematic if you are creating your custom component based on the Material UI's components. For the composition of the components, you will likely need to use one of these two options:

1. Wrap the Material UI component in order to enhance it
2. Use the `styled()` utility in order to customize the styles of the component

If you are using the first option, take a look at the [composition guide](/material-ui/guides/composition/#with-typescript) for more details.

If you are using the `styled()` utility (regardless of whether it comes from `@mui/material` or `@emotion/styled`), you will need to cast the resulting component as shown below:

```tsx
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  // your custom styles go here
}) as typeof Button;
```
