# Versions de Materiel-UI

<p class="description">Vous pouvez revenir à cette page et changer de version de document à tout moment.</p>

## Versions stables

La version la plus récente est recommandée en production.

{{"demo": "pages/versions/StableVersions.js", "hideToolbar": true, "bg": "inline"}}

## Versions les plus récentes

Ici vous pouvez trouver la dernière documentation non publiée et le code. Vous pouvez l'utiliser pour voir les modifications à venir et fournir des retours aux contributeurs de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Stratégie de gestion des versions

La stabilité garantit des composants réutilisables et les librairies, tutoriels, outils ainsi que les pratiques acquises ne deviennes pas soudainement obsolètes. La stabilité est essentielle au développement de l’écosystème Material-UI.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Le numéro de version est incrémenté en fonction du niveau de changement inclus dans la version. Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/). Les numéros de version Material-UI ont trois parties : `majeur.mineur.correctifs`.

- Les ** Versions majeures ** contiennent de nouvelles fonctionnalités significatives, mais une aide minimale aux développeurs est attendue durant la mise à jour. Lors de la mise à jour vers une nouvelle version majeure, vous devrez peut-être exécuter des scripts de mise à jour, de la refactorisation du code, exécuter des tests supplémentaires et apprendre de nouvelles API.
- Les ** Versions de correctifs ** sont à faible risque, contiennent des corrections de bugs et de petites nouvelles fonctionnalités. Aucune assistance pour les développeurs n'est attendue lors de la mise à jour.
- Les ** Versions de correctifs ** sont à faible risque, contiennent des corrections de bugs et de petites nouvelles fonctionnalités. Aucune assistance pour les développeurs n'est attendue lors de la mise à jour.

## Fréquence de version

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

In general, you can expect the following release cycle:

- Une version **majeure** tous les 12 mois.
- 1-3 **mineur** versions pour chaque version majeure.
- A **patch** release every week (anytime for urgent bugfix).

## Calendrier de version

| Date           | Version | Status   |
|:-------------- |:------- |:-------- |
| May 2018       | v1.0.0  | Released |
| September 2018 | v3.0.0  | Released |
| May 2019       | v4.0.0  | Released |
| Q3 2020        | v5.0.0  | ⏳        |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## Politique de support

Find details on the [supported versions](/getting-started/support/#supported-versions).

## Pratiques de l'obsolescence

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.