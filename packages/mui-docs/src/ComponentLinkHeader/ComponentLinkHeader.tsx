import * as React from 'react';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ChatRounded from '@mui/icons-material/ChatRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import { MarkdownHeaders } from '@mui/internal-markdown';
import SketchIcon from '../svgIcons/SketchIcon';
import FigmaIcon from '../svgIcons/FigmaIcon';
import BundleSizeIcon from '../svgIcons/BundleSizeIcon';
import W3CIcon from '../svgIcons/W3CIcon';
import MaterialDesignIcon from '../svgIcons/MaterialDesignIcon';
import { useTranslate } from '../i18n';

const Root = styled('ul')(({ theme }) => ({
  margin: 0,
  marginTop: theme.spacing(2),
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  '& .MuiChip-root': {
    height: 26,
    padding: '0 8px',
    gap: 6,
    '& .MuiChip-label': { padding: 0 },
    '& .MuiChip-iconSmall': {
      margin: 0,
      fontSize: 14,
    },
  },
}));

const defaultPackageNames: Record<string, string | undefined> = {
  'material-ui': '@mui/material',
  'joy-ui': '@mui/joy',
  'base-ui': '@mui/base',
  system: '@mui/system',
};

export interface ComponentLinkHeaderProps {
  design?: boolean;
  markdown: {
    headers: MarkdownHeaders;
  };
}

export function ComponentLinkHeader(props: ComponentLinkHeaderProps) {
  const {
    markdown: { headers },
    design,
  } = props;
  const t = useTranslate();
  const router = useRouter();

  const packageName =
    headers.packageName ?? defaultPackageNames[headers.productId] ?? '@mui/material';

  return (
    <Root>
      <li>
        <Chip
          clickable
          role={undefined}
          component="a"
          size="small"
          variant="outlined"
          href={`${router.pathname}.md`}
          icon={
            <SvgIcon>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <title>Markdown</title>
                <path
                  d="M22.269 19.385H1.731a1.73 1.73 0 0 1-1.73-1.73V6.345a1.73 1.73 0 0 1 1.73-1.73h20.538a1.73 1.73 0 0 1 1.73 1.73v11.308a1.73 1.73 0 0 1-1.73 1.731zm-16.5-3.462v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.461v7.847zM21.231 12h-2.308V8.077h-2.307V12h-2.308l3.461 4.039z"
                  fill="currentColor"
                />
              </svg>
            </SvgIcon>
          }
          data-ga-event-category="ComponentLinkHeader"
          data-ga-event-action="click"
          data-ga-event-label="Markdown"
          data-ga-event-split="0.1"
          label="View as Markdown"
        />
      </li>
      {headers.githubLabel ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={`${process.env.SOURCE_CODE_REPO}/labels/${encodeURIComponent(
              headers.githubLabel,
            )}`}
            icon={<ChatRounded color="primary" />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label={t('githubLabel')}
            data-ga-event-split="0.1"
            label={t('githubLabel')}
          />
        </li>
      ) : null}
      <li>
        <Tooltip title={t('bundleSizeTooltip')} describeChild>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={`https://bundlephobia.com/package/${packageName}@latest`}
            icon={<BundleSizeIcon color="primary" />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label={t('bundleSize')}
            data-ga-event-split="0.1"
            label={t('bundleSize')}
          />
        </Tooltip>
      </li>
      {headers.githubSource ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={`${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}/${headers.githubSource}`}
            icon={<GitHubIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Source"
            data-ga-event-split="0.1"
            label="Source"
          />
        </li>
      ) : null}
      {headers.waiAria ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={headers.waiAria}
            icon={<W3CIcon color="primary" />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="WAI-ARIA"
            data-ga-event-split="0.1"
            label="WAI-ARIA"
          />
        </li>
      ) : null}
      {headers.materialDesign ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={headers.materialDesign}
            icon={<MaterialDesignIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Material Design"
            data-ga-event-split="0.1"
            label="Material Design"
          />
        </li>
      ) : null}
      {design === false ? null : (
        <React.Fragment>
          <li>
            <Chip
              clickable
              role={undefined}
              component="a"
              size="small"
              variant="outlined"
              rel="nofollow"
              href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
              icon={<FigmaIcon />}
              data-ga-event-category="ComponentLinkHeader"
              data-ga-event-action="click"
              data-ga-event-label="Figma"
              data-ga-event-split="0.1"
              label="Figma"
            />
          </li>
          {packageName === '@mui/joy' ? null : (
            <li>
              <Chip
                clickable
                role={undefined}
                component="a"
                size="small"
                variant="outlined"
                rel="nofollow"
                href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
                icon={<SketchIcon />}
                data-ga-event-category="ComponentLinkHeader"
                data-ga-event-action="click"
                data-ga-event-label="Sketch"
                data-ga-event-split="0.1"
                label="Sketch"
              />
            </li>
          )}
        </React.Fragment>
      )}
    </Root>
  );
}
