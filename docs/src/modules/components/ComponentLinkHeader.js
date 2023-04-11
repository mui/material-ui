import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import SketchIcon from 'docs/src/modules/components/SketchIcon';
import FigmaIcon from 'docs/src/modules/components/FigmaIcon';
import AdobeXDIcon from 'docs/src/modules/components/AdobeXDIcon';
import BundleSizeIcon from 'docs/src/modules/components/BundleSizeIcon';
import ChatRounded from '@mui/icons-material/ChatRounded';
import W3CIcon from 'docs/src/modules/components/W3CIcon';
import MaterialDesignIcon from 'docs/src/modules/components/MaterialDesignIcon';
import { styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Root = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  '& .MuiChip-root .MuiChip-iconSmall': {
    marginLeft: 4,
  },
});

const defaultPackageNames = {
  'material-ui': '@mui/material',
  'joy-ui': '@mui/joy',
  base: '@mui/base',
  system: '@mui/system',
};

export default function ComponentLinkHeader(props) {
  const {
    markdown: { headers },
    design,
  } = props;
  const t = useTranslate();

  const packageName =
    headers.packageName ?? defaultPackageNames[headers.product] ?? '@mui/material';

  return (
    <Root>
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
        <Tooltip title={t('bundleSizeTooltip')}>
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
      {design !== false ? (
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
          <li>
            <Chip
              clickable
              role={undefined}
              component="a"
              size="small"
              variant="outlined"
              rel="nofollow"
              href="https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
              icon={<AdobeXDIcon />}
              data-ga-event-category="ComponentLinkHeader"
              data-ga-event-action="click"
              data-ga-event-label="Adobe XD"
              data-ga-event-split="0.1"
              label="Adobe"
            />
          </li>
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
        </React.Fragment>
      ) : null}
    </Root>
  );
}

ComponentLinkHeader.propTypes = {
  design: PropTypes.bool,
  markdown: PropTypes.shape({
    headers: PropTypes.object.isRequired,
  }).isRequired,
};
