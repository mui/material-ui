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

- **Major releases** contain significant new features, some developer assistance is expected during the update. Estas versões incluem [alterações que quebram](#what-doesnt-count-as-a-breaking-change). Ao atualizar para uma nova versão principal, talvez seja necessário executar scripts de atualização, refatorar códigos, executar testes adicionais e aprender sobre as novas APIs.
- **Versões menores** contém novos recursos importantes. Versões menores são totalmente compatíveis com versões anteriores; nenhuma assistência do desenvolvedor é esperada durante a atualização, mas você pode opcionalmente modificar seus aplicativos e bibliotecas para começar a usar novas APIs, recursos e capacidades que foram adicionados na versão.
- **Versões de patch** são de baixo risco, contêm correções de bugs e pequenos novos recursos. No developer assistance is expected during the update.

## What doesn't count as a breaking change?

We call "breaking changes" those that require updating your codebase when upgrading to a new version, with the exception of:

- **APIs starting with "unstable\_"**. These are provided as experimental features whose APIs we are not yet confident in. By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner, or simply learn that we don't need the API/feature in the first place.
- **APIs documented as experimental**. Same as the above.
- **Undocumented APIs and internal data structures**. If you access internal properties, there is no warranty. You are on your own.
- **Development warnings**. Since these don't affect production behavior, we may add new warnings or modify existing warnings in between major versions. In fact, this is what allows us to reliably warn about upcoming breaking changes.
- **Pre-releases versions**. We provide pre-release versions as a way to test new features early, but we need the flexibility to make changes based on what we learn in the pre-release period. If you use these versions, note that APIs may change before the stable release.
- **Small CSS changes**. Visual design changes that have a very low probability of negatively impacting your UI are not considered breaking.

## Release frequency

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of MUI.

In general, you can expect the following release cycle:

- A **major** release every 12 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for an urgent bug fix).

## Release schedule

| Data           | Versão | Situação         |
|:-------------- |:------ |:---------------- |
| TBA            | v6.0.0 | Work not started |
| September 2021 | v5.0.0 | Lançada          |
| Maio de 2019   | v4.0.0 | Lançada          |
| September 2018 | v3.0.0 | Work in progress |
| May 2018       | v1.0.0 | Released         |

You can follow the [milestones](https://github.com/mui/material-ui/milestones) for a more detailed overview.

> ⚠️ ** Isenção de responsabilidade **: Operamos em um ambiente dinâmico e as coisas estão sujeitas a alterações. As informações disponibilizadas destinam-se a traçar a orientação geral do framework. Destina-se apenas a fins informativos. Podemos decidir adicionar/remover itens novos a qualquer momento, com base em nossos recursos de capacidade de entrega ou para manter nossos padrões de qualidade. O desenvolvimento, lançamentos e disponibilidade de recursos ou funcionalidades do Material-UI permanece a critério exclusivo da equipe. O roadmap não representa um compromisso, obrigação ou promessa que será entregue em um determinado momento.

## Supported versions

MUI Core has been open-source ([MIT](https://tldrlegal.com/license/mit-license)) since the very beginning, and always will be. Developers can ensure MUI is the right choice for their React applications through MUI's community maintenance strategy. The MUI team regularly ships new releases, bug fixes, and is very welcoming to community pull requests.

Given the reality of time and resource constraints, as well as the desire to keep innovating, over time it becomes necessary to shift focus to newer versions of the framework ([our release schedule](#release-frequency)), while making the transition to newer versions as smooth as possible, including publishing migration guides such as [this one for v5](/material-ui/migration/migration-v4/). The open-source community is always welcome to submit new features and bug fixes as well.

The current status of each MUI version is as follows:

- MUI Core v5: ✅ Active development and continuous support.
- [Material UI v4](https://v4.mui.com/): ⚠️ Guaranteed Support for security issues and regressions.
- [Material UI v3](https://v3.mui.com/): 🅧 No longer supported.
- Material UI v2: 🅧 Never existed.
- [Material UI v1](https://v1.mui.com/): 🅧 No longer supported.
- [Material UI v0.x](https://v0.mui.com/#/): 🅧 No longer supported.

For teams and organizations that require additional support for older versions, MUI has [options available](/material-ui/getting-started/support/#paid-support).

### Suporte a Longo Prazo (LTS)

MUI will continue to provide security updates and support for regressions for one version prior to the current major version, for example regressions caused by external factors such as browser updates, or changes to upstream dependencies.

## Deprecation practices

Sometimes "breaking changes", such as the removal of support for select APIs and features, are necessary. To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools are provided when possible (e.g. codemods).
- The deprecation policy described below is followed so that you have time to update your apps to the latest APIs and best practices.

### Política de Descontinuação

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
