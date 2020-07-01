import * as React from 'react';
import { NextFC } from 'next';
import { PageMeta } from '_shared/PageMeta';
import { fetchGithubData } from 'utils/github-api';
import { DOMAIN, GITHUB_URL, HOST_URL } from '_constants';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

interface ReleasesProps {
  tags: string[];
}

const ExternalLink: React.FC<React.HTMLProps<HTMLLinkElement>> = ({ href }) => {
  return (
    <a href={href} rel="noopener noreferrer">
      {href}
    </a>
  );
};

const useStyles = makeStyles({
  scrollableTable: {
    overflowX: 'auto',
  },
});

const Releases: NextFC<ReleasesProps> = ({ tags }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <PageMeta
        title="Releases - @material-ui/pickers"
        description="List of @material-ui/pickers releases with a link to per-release documentation site."
      />

      <Typography variant="h2" gutterBottom>
        Releases
      </Typography>
      <Typography gutterBottom>
        We are using semver strategy for making releases. Here you can find documentation for some
        of previous material-ui-picker's releases. Please note that our versions are not synced with
        @material-ui/core
      </Typography>

      <Paper className={classes.scrollableTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Version</TableCell>
              <TableCell>Documentation Url</TableCell>
              <TableCell>Release notes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <strong> Unpublished </strong>
              </TableCell>
              <TableCell>
                <ExternalLink href="https://dev.material-ui-pickers.dev/" />
              </TableCell>
              <TableCell>
                This is unpublished <b> future in-development </b> version.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <strong> Latest </strong>
              </TableCell>
              <TableCell>
                <ExternalLink href={HOST_URL} />
              </TableCell>
              <TableCell>Latest stable published release</TableCell>
            </TableRow>

            {tags.map(version => {
              const docsLink = `https://${version.replace(/\./g, '-')}.${DOMAIN}`;
              const releaseNotesLink = `${GITHUB_URL}/releases/tag/${version}`;

              return (
                <TableRow>
                  <TableCell>{version}</TableCell>
                  <TableCell>
                    <ExternalLink href={docsLink} />
                  </TableCell>
                  <TableCell>
                    <ExternalLink href={releaseNotesLink} />
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell>v2</TableCell>
              <TableCell>
                <ExternalLink href="https://material-ui-pickers-v2.dmtr-kovalenko.now.sh/" />
              </TableCell>
              <TableCell>
                <ExternalLink href="https://github.com/mui-org/material-ui-pickers/releases/tag/v2.2.4" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

Releases.getInitialProps = () => {
  return fetchGithubData('tags').then(data => ({
    tags: data.map(tagObject => tagObject.name).filter(tag => Number(tag.charAt(1)) > 2),
  }));
};

export default Releases;
