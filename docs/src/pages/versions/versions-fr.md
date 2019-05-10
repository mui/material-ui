# Versions de Materiel-UI

<p class="description">Vous pouvez revenir à cette page et changer de version de document à tout moment.</p>

## Versions stables

La version la plus récente est recommandée en production.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Versions les plus récentes

Ici vous pouvez trouver la dernière documentation non publiée et le code. Vous pouvez l'utiliser pour voir les modifications à venir et fournir des retours aux contributeurs de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Stratégie de gestion des versions

Nous sommes conscients que vous avez besoin de **stabilité** pour la librairie Material-UI. La stabilité garantit des composants réutilisables et les librairies, tutoriels, outils ainsi que les pratiques acquises ne deviennes pas soudainement obsolètes. La stabilité est essentielle au développement de l’écosystème Material-UI.

Ce document contient ** les pratiques que nous suivons ** pour vous fournir une bibliothèque d'interface utilisateur de pointe, équilibrée avec stabilité. Nous nous efforçons de faire en sorte que les futurs changements soient toujours introduits de manière prévisible. Nous voulons que tous ceux qui dépendent de Material-UI sachent quand et comment les nouvelles fonctionnalités sont ajoutées, et bien préparés lorsque celles qui sont obsolètes sont supprimées.

Matériel-UI suit strictement [la gestion sémantique des versions 2.0.0](https://semver.org/). Les numéros de version Material-UI ont trois parties : `majeur.mineur.correctifs`. Le numéro de version est incrémenté en fonction du niveau de changement inclus dans la version.

- Les ** Versions majeures ** contiennent de nouvelles fonctionnalités significatives, mais une aide minimale aux développeurs est attendue durant la mise à jour. Lors de la mise à jour vers une nouvelle version majeure, vous devrez peut-être exécuter des scripts de mise à jour, de la refactorisation du code, exécuter des tests supplémentaires et apprendre de nouvelles API.
- Les ** Versions mineures ** contiennent d'importantes nouvelles fonctionnalités. Les versions mineures sont entièrement compatibles avec les versions antérieures. aucune aide aux développeurs n'est attendue lors de la mise à jour, mais vous pouvez éventuellement modifier vos applications et vos bibliothèques pour commencer à utiliser les nouvelles API, fonctionnalités et capacités ajoutées dans la version.
- Les ** Versions de correctifs ** sont à faible risque, contiennent des corrections de bugs et de petites nouvelles fonctionnalités. Aucune assistance pour les développeurs n'est attendue lors de la mise à jour.

## Fréquence de version

We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Material-UI.

In general, you can expect the following release cycle:

- Une version **majeure** tous les 6 mois.
- 1-3 **mineur** versions pour chaque version majeure.
- A **patch** release every week (anytime for urgent bugfix).

## Calendrier de version

> Disclaimer: The dates are offered as general guidance and may be adjusted by us when necessary to ensure delivery of a high-quality code.

| Date          | Version                    |
|:------------- |:-------------------------- |
| May 2019      | `@material-ui/core` v4.0.0 |
| December 2019 | `@material-ui/core` v5.0.0 |

Vous pouvez suivre [ nos milestones ](https://github.com/mui-org/material-ui/milestones) pour un aperçu plus détaillé.

## Politique de support

We only support the latest version of Material-UI. We don't yet have the resources to offer [LTS](https://en.wikipedia.org/wiki/Long-term_support) releases.

## Pratiques de l'obsolescence

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible, we make two commitments to you:

- We work hard to minimize the number of breaking changes and to provide migration tools when possible.
- We follow the deprecation policy described here, so you have time to update your apps to the latest APIs and best practices.

To help ensure that you have sufficient time and a clear path to update, this is our deprecation policy:

- We announce deprecated features in the changelog, and when possible, with warnings at runtime.
- When we announce a deprecation, we also announce a recommended update path.
- We support existing use of a stable API during the deprecation period, so your code will keep working during that period.
- We only make peer dependency updates (React) that require changes to your apps in a major release.