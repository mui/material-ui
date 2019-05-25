# Versões de Material-UI

<p class="description">Pode, em qualquer altura, voltar a esta pagina e selecionar outra versāo da documentaçāo que esta lendo.</p>

## Versão estavél

É recomendado usar a versāo mais recente em ambiente de produção.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Últimas versões

Aqui pode encontrar a versão em desenvolvimento e sua documentação. Poderá usar esta versão para ver quais alterações que estão a ser implementadas e fornecer um feedback melhor para os contribuidores de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Estratégia de controle de versão

Reconhecemos que necessita de estabilidade da **bibloteca** Material-UI. A estabilidade garante que componentes e bibliotecas reutilizáveis, tutoriais, ferramentas e práticas aprendidas não se tornem obsoletos inesperadamente. A estabilidade é essencial para que o ecossistema em torno da Material-UI prospere.

Este documento contém ** as práticas que seguimos ** para lhe fornecer uma biblioteca de interface moderna, balanceada com estabilidade. Nós nos esforçamos para garantir que mudanças futuras sejam sempre introduzidas de maneira previsível. Queremos que todos que dependem do Material-UI saibam quando e como os novos recursos são adicionados e que estejam bem preparados quando os obsoletos forem removidos.

Material-UI segue estritamente [Semântico de controle de versão 2.0.0](https://semver.org/). Os números de versão do material-UI têm três partes: ` major.minor.patch `. O número da versão é incrementado com base no nível de alteração incluído na nova versão.

- ** versões principais ** contém novos recursos significativos, alguma assistência, mas mínima, do desenvolvedor é esperada durante a atualização. Ao atualizar para uma nova versão principal, talvez seja necessário executar scripts de atualização, refatorar códigos, executar testes adicionais e aprender novas APIs.
- **versões Menores** contém novos recursos importantes. Versões menores são totalmente compatíveis com versões anteriores; nenhuma assistência do desenvolvedor é esperada durante a atualização, mas você pode opcionalmente modificar seus aplicativos e bibliotecas para começar a usar novas APIs, recursos e recursos que foram adicionados na versão.
- ** Versões de patch ** são de baixo risco, contêm correções de bugs e pequenos novos recursos. Nenhuma assistência do desenvolvedor é esperado durante a atualização.

## Frequência de atualização

Trabalhamos em direção a um cronograma regular de lançamentos, para que você possa planejar e coordenar suas atualizações com a evolução contínua do Material-UI.

Em geral, você pode esperar o seguinte ciclo de lançamento:

- A **principal** versão a cada 6 meses.
- 1-3 ** menor ** lançamentos para cada versão principal.
- Uma versão **patch** a cada semana (ou imediatamente para um bugfix urgente).

## Cronograma de lançamento

> Isenção de responsabilidade: As datas são oferecidas como orientação geral e podem ser ajustadas por nós quando necessário para garantir a entrega de um código de alta qualidade.

| Data             | Versão                     |
|:---------------- |:-------------------------- |
| Maio de 2019     | `@material-ui/core` v4.0.0 |
| Dezembro de 2019 | `@material-ui/core` v5.0.0 |

Você pode seguir os [ milestones ](https://github.com/mui-org/material-ui/milestones) para uma visão geral mais detalhada.

## Política de suporte

Oferecemos suporte apenas à versão mais recente do Material-UI. Ainda não temos recursos para oferecer versões [ LTS ](https://en.wikipedia.org/wiki/Long-term_support).

## Práticas de substituição

Às vezes, **"alterações significativas"**, tais como a remoção do suporte para selecionar APIs e recursos, são necessários.

Para fazer essas transições mais fácil possível, fazemos dois compromissos para você:

- Trabalhamos arduamente para minimizar o número de alterações significativas e fornecer ferramentas de migração sempre que possível.
- Seguimos a política de descontinuação descrita aqui, para que você tenha tempo de atualizar seus aplicativos para as APIs e práticas recomendadas mais recentes.

Para ajudar a garantir que você tenha tempo suficiente e um caminho claro para atualizar, esta é nossa política de suspensão de uso:

- Anunciamos recursos obsoletos no changelog e, quando possível, com avisos em tempo de execução.
- Quando anunciamos uma reprovação, anunciamos também um caminho de atualização recomendado.
- Oferecemos suporte existente do uso de uma API estável durante a descontinuação do período, portanto, seu código irá continuar a trabalhar durante esse período.
- Fazemos apenas atualizações de dependências de pares (React) que exigem alterações em seus aplicativos em uma versão principal.