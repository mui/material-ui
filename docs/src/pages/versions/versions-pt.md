# Versões de Material-UI

<p class="description">Pode, em qualquer altura, voltar a esta pagina e selecionar outra versāo da documentaçāo que esta lendo.</p>

## Versão estavél

É recomendado usar a versāo mais recente em ambiente de produção.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Últimas versões

Aqui pode encontrar a versão em desenvolvimento e sua documentação. Poderá usar esta versão para ver quais alterações que estão a ser implementadas e fornecer um feedback melhor para os contribuidores de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Estratégia de controle de versão

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI segue estritamente [Semântico de controle de versão 2.0.0](https://semver.org/). Os números de versão do material-UI têm três partes: ` major.minor.patch `. O número da versão é incrementado com base no nível de alteração incluído na nova versão.

- ** versões principais ** contém novos recursos significativos, alguma assistência, mas mínima, do desenvolvedor é esperada durante a atualização. Ao atualizar para uma nova versão principal, talvez seja necessário executar scripts de atualização, refatorar códigos, executar testes adicionais e aprender novas APIs.
- **versões Menores** contém novos recursos importantes. Versões menores são totalmente compatíveis com versões anteriores; nenhuma assistência do desenvolvedor é esperada durante a atualização, mas você pode opcionalmente modificar seus aplicativos e bibliotecas para começar a usar novas APIs, recursos e recursos que foram adicionados na versão.
- ** Versões de patch ** são de baixo risco, contêm correções de bugs e pequenos novos recursos. Nenhuma assistência do desenvolvedor é esperado durante a atualização.

## Frequência de atualização

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

Em geral, você pode esperar o seguinte ciclo de lançamento:

- Um lançamento **principal** ocorre a cada 6-12 meses.
- 1-3 ** menor ** lançamentos para cada versão principal.
- Uma versão **patch** a cada semana (ou imediatamente para um bugfix urgente).

## Cronograma de lançamento

> Isenção de responsabilidade: As datas são oferecidas como orientação geral e podem ser ajustadas por nós quando necessário para garantir a entrega de um código de alta qualidade.

| Data           | Versão                     |
|:-------------- |:-------------------------- |
| Maio de 2018 ✅ | `@material-ui/core` v1.0.0 |
| Maio de 2019 ✅ | `@material-ui/core` v4.0.0 |
| ? ⏳            | `@material-ui/core` v5.0.0 |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

## Política de suporte

Only the latest version of Material-UI is supported. Ainda não temos recursos para oferecer versões [ LTS ](https://en.wikipedia.org/wiki/Long-term_support).

## Práticas de substituição

Às vezes, **"alterações significativas"**, tais como a remoção do suporte para selecionar APIs e recursos, são necessários.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features iare announced n the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.