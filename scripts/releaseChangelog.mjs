/* eslint-disable no-restricted-syntax */
import childProcess from 'child_process';
import { promisify } from 'util';
import { Octokit } from '@octokit/rest';
import chalk from 'chalk';
import yargs from 'yargs';

const exec = promisify(childProcess.exec);

/**
 * @param {string} commitMessage
 * @returns {string} The tags in lowercases, ordered ascending and comma separated
 */
function parseTags(commitMessage) {
  const tagMatch = commitMessage.match(/^(\[[\w-]+\])+/);
  if (tagMatch === null) {
    return '';
  }
  const [tagsWithBracketDelimiter] = tagMatch;
  return tagsWithBracketDelimiter
    .match(/([\w-]+)/g)
    .map((tag) => {
      return tag.toLocaleLowerCase();
    })
    .sort((a, b) => {
      return a.localeCompare(b);
    })
    .join(',');
}

/**
 * @param {Octokit.ReposCompareCommitsResponseCommitsItem} commitsItem
 */
function filterCommit(commitsItem) {
  const commitMessage = commitsItem.commit.message;
  // TODO: Use labels
  return (
    // Filter renovate dependencies updates
    !commitMessage.startsWith('Bump') &&
    !commitMessage.startsWith('Lock file maintenance') &&
    // Filter website changes, no implications for library users
    !commitMessage.startsWith('[website]')
  );
}

async function findLatestTaggedVersion() {
  const { stdout } = await exec(
    [
      'git',
      'describe',
      // Earlier tags used lightweight tags + commit.
      // We switched to annotated tags later.
      '--tags',
      '--abbrev=0',
      // only include "version-tags"
      '--match "v*"',
    ].join(' '),
  );

  return stdout.trim();
}

// Match commit messages like:
// "[docs] Fix small typo on Grid2 page (#44062)"
const prLinkRegEx = /\(#[0-9]+\)$/;

async function main(argv) {
  const { githubToken, lastRelease: lastReleaseInput, release, repo } = argv;

  if (!githubToken) {
    throw new TypeError(
      'Unable to authenticate. Make sure you either call the script with `--githubToken $token` or set `process.env.GITHUB_TOKEN`. The token needs `public_repo` permissions.',
    );
  }
  const octokit = new Octokit({
    auth: githubToken,
    request: {
      fetch,
    },
  });

  const latestTaggedVersion = await findLatestTaggedVersion();
  const lastRelease = lastReleaseInput !== undefined ? lastReleaseInput : latestTaggedVersion;
  if (lastRelease !== latestTaggedVersion) {
    console.warn(
      `Creating changelog for ${lastRelease}..${release} when latest tagged version is '${latestTaggedVersion}'.`,
    );
  }

  /**
   * @type {AsyncIterableIterator<Octokit.Response<Octokit.ReposCompareCommitsResponse>>}
   */
  const timeline = octokit.paginate.iterator(
    octokit.repos.compareCommits.endpoint.merge({
      owner: 'mui',
      repo,
      base: lastRelease,
      head: release,
    }),
  );

  /**
   * @type {Octokit.ReposCompareCommitsResponseCommitsItem[]}
   */
  const commitsItems = [];
  for await (const response of timeline) {
    const { data: compareCommits } = response;
    commitsItems.push(...compareCommits.commits.filter(filterCommit));
  }

  let warnedOnce = false;

  const getAuthor = (commit) => {
    if (!commit.author) {
      if (!warnedOnce) {
        console.warn(
          `The author of the commit: ${commit.commit.tree.url} cannot be retrieved. Please add the github username manually.`,
        );
      }
      warnedOnce = true;
      return chalk.red("TODO INSERT AUTHOR'S USERNAME");
    }

    const authorLogin = commit.author.login;

    if (authorLogin === 'github-actions[bot]') {
      const authorFromMessage = /\(@(?<author>[a-zA-Z0-9-_]+)\) \(#[\d]+\)/.exec(
        commit.commit.message.split('\n')[0],
      );
      if (authorFromMessage.groups?.author) {
        return authorFromMessage.groups.author;
      }
    }

    return authorLogin;
  };

  const authors = Array.from(
    new Set(
      commitsItems.map((commitsItem) => {
        return getAuthor(commitsItem);
      }),
    ),
  );
  const contributorHandles = authors
    .sort((a, b) => a.localeCompare(b))
    .map((author) => `@${author}`)
    .join(', ');

  // We don't know when a particular commit was made from the API.
  // Only that the commits are ordered by date ASC
  const commitsItemsByDateDesc = commitsItems.slice().reverse();
  // Sort by tags ASC, date desc
  // Will only consider exact matches of tags so `[Slider]` will not be grouped with `[Slider][Modal]`
  commitsItems.sort((a, b) => {
    const aTags = parseTags(a.commit.message);
    const bTags = parseTags(b.commit.message);
    if (aTags === bTags) {
      return commitsItemsByDateDesc.indexOf(a) - commitsItemsByDateDesc.indexOf(b);
    }
    return aTags.localeCompare(bTags);
  });
  const changes = commitsItems.map((commitsItem) => {
    let shortMessage = commitsItem.commit.message.split('\n')[0];

    // If the commit message doesn't have an associated PR, add the commit sha for reference.
    if (!prLinkRegEx.test(shortMessage)) {
      shortMessage += ` (${commitsItem.sha.substring(0, 7)})`;
    }

    return `- ${shortMessage} @${getAuthor(commitsItem)}`;
  });
  const nowFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const changelog = `
## TODO RELEASE NAME
<!-- generated comparing ${lastRelease}..${release} -->
_${nowFormatted}_

A big thanks to the ${
    authors.length
  } contributors who made this release possible. Here are some highlights ✨:

TODO INSERT HIGHLIGHTS

${changes.join('\n')}

All contributors of this release in alphabetical order: ${contributorHandles}
`;

  // eslint-disable-next-line no-console -- output of this script
  console.log(changelog);
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    description: 'Creates a changelog',
    builder: (command) => {
      return command
        .option('lastRelease', {
          describe:
            'The release to compare against e.g. `v5.0.0-alpha.23`. Default: The latest tag on the current branch.',
          type: 'string',
        })
        .option('githubToken', {
          default: process.env.GITHUB_TOKEN,
          describe:
            'The personal access token to use for authenticating with GitHub. Needs public_repo permissions.',
          type: 'string',
        })
        .option('release', {
          // #target-branch-reference
          default: 'master',
          describe: 'Ref which we want to release',
          type: 'string',
        })
        .option('repo', {
          default: 'material-ui',
          describe: 'Repository to generate a changelog for',
          type: 'string',
        });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
