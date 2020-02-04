# Versões do Material-UI

<p class="description">Você pode voltar a esta página e mudar a qualquer momento a versão da documentação que você está lendo.</p>

## Versão estável

É recomendado usar a versão mais recente em ambiente de produção.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true, "bg": "inline"}}

## Últimas versões

Aqui pode encontrar a versão em desenvolvimento e sua documentação. Poderá usar esta versão para ver quais alterações que estão a ser implementadas e fornecer um feedback melhor para os contribuidores de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true, "bg": "inline"}}

## Estratégia de controle de versão

A estabilidade garante que componentes e bibliotecas reutilizáveis, tutoriais, ferramentas e práticas aprendidas não se tornem obsoletos inesperadamente. A estabilidade é essencial para que o ecossistema em torno da Material-UI prospere.

Este documento contém as práticas que são seguidas para fornecer uma biblioteca de ponta para interface do usuário, equilibrada com a estabilidade e garantindo que mudanças futuras sejam sempre introduzidas de maneira previsível.

Material-UI segue o [Controle de Versão Semântico 2.0.0](https://semver.org/). Os números de versão do material-UI têm três partes: ` major.minor.patch `. O número da versão é incrementado com base no nível de alteração incluído na nova versão.

- ** versões principais ** contém novos recursos significativos, alguma assistência, mas mínima, do desenvolvedor é esperada durante a atualização. Ao atualizar para uma nova versão principal, talvez seja necessário executar scripts de atualização, refatorar códigos, executar testes adicionais e aprender novas APIs.
- **versões Menores** contém novos recursos importantes. Versões menores são totalmente compatíveis com versões anteriores; nenhuma assistência do desenvolvedor é esperada durante a atualização, mas você pode opcionalmente modificar seus aplicativos e bibliotecas para começar a usar novas APIs, recursos e recursos que foram adicionados na versão.
- ** Versões de patch ** são de baixo risco, contêm correções de bugs e pequenos novos recursos. Nenhuma assistência do desenvolvedor é esperado durante a atualização.

## Frequência de atualização

Um cronograma regular de lançamentos ajuda você a planejar e coordenar suas atualizações de acordo com a evolução contínua do Material-UI.

Em geral, você pode esperar o seguinte ciclo de lançamento:

- A **principal** versão a cada 12 meses.
- 1-3 ** menor ** lançamentos para cada versão principal.
- Uma versão **patch** a cada semana (ou imediatamente para um bugfix urgente).

## Cronograma de lançamento

| Data                       | Versão | Situação |
|:-------------------------- |:------ |:-------- |
| Maio de 2018               | v1.0.0 | Liberada |
| September 2018             | v3.0.0 | Liberada |
| Maio de 2019               | v4.0.0 | Liberada |
| Terceiro trimestre de 2020 | v5.0.0 | ⏳        |


Você pode seguir os [ milestones ](https://github.com/mui-org/material-ui/milestones) para uma visão geral mais detalhada.

> ⚠️ ** Isenção de responsabilidade **: Operamos em um ambiente dinâmico e as coisas estão sujeitas a alterações. The information provided is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## Política de suporte

Encontre detalhes nas [versões suportadas](/getting-started/support/#supported-versions).

## Práticas de substituição

Às vezes, **"alterações significativas"**, tais como a remoção do suporte para selecionar APIs e recursos, são necessários.

Para tornar essas transições o mais fácil possível:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Política de descontinuação

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.