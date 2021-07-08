/* eslint-disable no-restricted-syntax */
const { Octokit } = require('@octokit/rest');
const childProcess = require('child_process');
const { promisify } = require('util');
const yargs = require('yargs');

const exec = promisify(childProcess.exec);

/**
 * @param {string} commitMessage
 * @returns {string} The tags in lowercases, ordered ascending and commaseparated
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
  // TODO: Use labels
  // Filter dependency updates
  return !commitsItem.commit.message.startsWith('Bump');
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

async function main(argv) {
  const { githubToken, lastRelease: lastReleaseInput, release } = argv;

  if (!githubToken) {
    throw new TypeError(
      'Unable to authenticate. Make sure you either call the script with `--githubToken $token` or set `process.env.GITHUB_TOKEN`. The token needs `public_repo` permissions.',
    );
  }
  const octokit = new Octokit({
    auth: githubToken,
  });

  const latestTaggedVersion = await findLatestTaggedVersion();
  const lastRelease = lastReleaseInput !== undefined ? lastReleaseInput : latestTaggedVersion;
  if (lastRelease !== latestTaggedVersion) {
    console.warn(
      `Creating changelog for ${latestTaggedVersion}..${release} when latest tagged version is '${latestTaggedVersion}'.`,
    );
  }

  /**
   * @type {AsyncIterableIterator<Octokit.Response<Octokit.ReposCompareCommitsResponse>>}
   */
  const timeline = octokit.paginate.iterator(
    octokit.repos.compareCommits.endpoint.merge({
      owner: 'mui-org',
      repo: 'material-ui',
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

  const authors = Array.from(
    new Set(
      commitsItems.map((commitsItem) => {
        return commitsItem.author.login;
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
    // Helps changelog author keeping track of order when grouping commits under headings.
    const dateSortMarker = `<!-- ${(
      commitsItemsByDateDesc.length - commitsItemsByDateDesc.indexOf(commitsItem)
    )
      .toString()
      // Padding them with a zero means we can just feed a list into online sorting tools like https://www.online-utility.org/text/sort.jsp
      // i.e. we can sort the lines alphanumerically
      .padStart(Math.ceil(Math.log10(commitsItemsByDateDesc.length)), '0')} -->`;
    const shortMessage = commitsItem.commit.message.split('\n')[0];
    return `- ${dateSortMarker} ${shortMessage} @${commitsItem.author.login}`;
  });
  const nowFormated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const changelog = `
## TODO RELEASE NAME
<!-- generated comparing ${lastRelease}..${release} -->
_${nowFormated}_

Big thanks to the ${
    authors.length
  } contributors who made this release possible. Here are some highlights ✨:

TODO INSERT HIGHLIGHTS

${changes.join('\n')}

All contributors of this release in alphabetical order: ${contributorHandles}
`;

  // eslint-disable-next-line no-console -- output of this script
  console.log(changelog);
}

yargs
  .command({
    command: '$0',
    description: 'Creates a changelog',
    builder: (command) => {
      return command
        .option('lastRelease', {
          describe:
            'The release to compare gainst e.g. `v5.0.0-alpha.23`. Default: The latest tag on the current branch.',
          type: 'string',
        })
        .option('githubToken', {
          default: process.env.GITHUB_TOKEN,
          describe:
            'The personal access token to use for authenticating with GitHub. Needs public_repo permissions.',
          type: 'string',
        })
        .option('release', {
          default: 'next',
          describe: 'Ref which we want to release',
          type: 'string',
        });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
