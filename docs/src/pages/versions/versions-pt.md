# Versões do Material-UI

<p class="description">Sempre que precisar, você pode voltar a esta página e mudar a versão da documentação que você está lendo.</p>

## Versão de lançamento

É recomendado usar a versão mais recente em ambiente de produção.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## Últimas versões

Aqui você irá encontrar a versão em desenvolvimento e sua documentação. Poderá usar esta versão para ver quais alterações estão em fase de desenvolvimento e fornecer um feedback melhor para os contribuidores do Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Estratégia de controle de versão

A estabilidade garante que componentes e bibliotecas reutilizáveis, tutoriais, ferramentas e práticas aprendidas não se tornem obsoletas inesperadamente. A estabilidade é essencial para que o ecossistema em torno do Material-UI prospere.

Este documento contém as práticas que são seguidas para fornecer uma biblioteca de ponta para interface do usuário, equilibrada com a estabilidade e garantindo que mudanças futuras sejam sempre introduzidas de maneira previsível.

Material-UI segue o [Controle de Versão Semântico 2.0.0](https://semver.org/). Os números da versão do Material-UI têm três partes: `principal.menor.patch`. O número da versão é incrementado com base no nível de alteração incluído na nova versão.

- **Versões principais** contém novos recursos significativos, porém, é esperado um efeito colateral mínimo para o desenvolvedor durante a atualização. Ao atualizar para uma nova versão principal, talvez seja necessário executar scripts de atualização, refatorar códigos, executar testes adicionais e aprender sobre as novas APIs.
- **Versões menores** contém novos recursos importantes. Versões menores são totalmente compatíveis com versões anteriores; nenhuma assistência do desenvolvedor é esperada durante a atualização, mas você pode opcionalmente modificar seus aplicativos e bibliotecas para começar a usar novas APIs, recursos e capacidades que foram adicionados na versão.
- **Versões de patch** são de baixo risco, contêm correções de bugs e pequenos novos recursos. Nenhuma assistência do desenvolvedor é esperado durante a atualização.

## Frequência de lançamento

Um cronograma regular de lançamentos ajuda você a planejar e coordenar suas atualizações de acordo com a evolução contínua do Material-UI.

Em geral, você pode esperar o seguinte ciclo de lançamento:

- A versão **principal** a cada 12 meses.
- 1-3 lançamentos **menores** para cada versão principal.
- Uma versão **patch** a cada semana (ou imediatamente em caso de um bugfix urgente).

## Cronograma de lançamento

| Data             | Versão | Situação         |
|:---------------- |:------ |:---------------- |
| Maio de 2018     | v1.0.0 | Lançada          |
| Setembro de 2018 | v3.0.0 | Lançada          |
| Maio de 2019     | v4.0.0 | Lançada          |
| Setembro de 2021 | v5.0.0 | Work in progress |

Você pode seguir os [milestones](https://github.com/mui/material-ui/milestones) para uma visão geral mais detalhada.

> ⚠️ ** Isenção de responsabilidade **: Operamos em um ambiente dinâmico e as coisas estão sujeitas a alterações. As informações disponibilizadas destinam-se a traçar a orientação geral do framework. Destina-se apenas a fins informativos. Podemos decidir adicionar/remover itens novos a qualquer momento, com base em nossos recursos de capacidade de entrega ou para manter nossos padrões de qualidade. The development, releases, and timing of any features or functionality remains at the sole discretion of MUI. O roadmap não representa um compromisso, obrigação ou promessa que será entregue em um determinado momento.

## Supported versions

MUI Core has been open-source ([MIT](https://tldrlegal.com/license/mit-license)) since the very beginning, and always will be. Developers can ensure MUI is the right choice for their React applications through MUI's community maintenance strategy. The MUI team regularly ships new releases, bug fixes, and is very welcoming to community pull requests.

Given the reality of time and resource constraints, as well as the desire to keep innovating, over time it becomes necessary to shift focus to newer versions of the framework ([our release schedule](#release-frequency)), while making the transition to newer versions as smooth as possible, including publishing migration guides such as [this one for v5](/guides/migration-v4/). The open-source community is always welcome to submit new features and bug fixes as well.

The current status of each MUI version is as follows:

- MUI Core v5: ✅ Active development and continuous support.
- [MUI Core v4](https://v4.mui.com/): ⚠️ Guaranteed Support (only) for security issues and regressions.
- [MUI Core v3](https://v3.mui.com/): 🅧 No longer supported.
- ~MUI Core v2 (never existed)~.
- [MUI Core v1](https://v1.mui.com/): 🅧 No longer supported.
- [MUI Core v0.x](https://v0.mui.com/#/): 🅧 No longer supported.

For teams and organizations that require additional support for older versions, MUI has [options available](/getting-started/support/#professional-support-premium).

### Long-term support

MUI will continue to give security updates and regressions support (for example, if there's any regression caused by Chrome, React, etc) to the version prior to the current major until the next one is released.

## Práticas de descontinuação

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.
