import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ChatRounded from '@mui/icons-material/ChatRounded';
import { styled } from '@mui/material/styles';
import SketchIcon from 'docs/src/modules/components/SketchIcon';
import FigmaIcon from 'docs/src/modules/components/FigmaIcon';
import AdobeXDIcon from 'docs/src/modules/components/AdobeXDIcon';
import BundleSizeIcon from 'docs/src/modules/components/BundleSizeIcon';
import W3CIcon from 'docs/src/modules/components/W3CIcon';
import MaterialDesignIcon from 'docs/src/modules/components/MaterialDesignIcon';
import InitialPropsContext from 'docs/src/docs-infra/InitialPropsContext';
import { useTranslate } from 'docs/src/modules/utils/i18n';

function formatBytes(bytes, decimals = 2) {
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'kB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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
  'base-ui': '@mui/base',
  system: '@mui/system',
};

export default function ComponentLinkHeader(props) {
  const {
    markdown: { headers },
    design,
  } = props;
  const t = useTranslate();
  const initialProps = React.useContext(InitialPropsContext);
  const modules = headers.components.concat(headers.hooks);
  const packageName =
    headers.packageName ?? defaultPackageNames[headers.productId] ?? '@mui/material';

  let bundleSizeLabel = t('bundleSize');

  console.log(initialProps.moduleSize);

  if (Object.keys(initialProps.moduleSize).length > 0) {
    bundleSizeLabel = `${bundleSizeLabel}: ${formatBytes(initialProps.moduleSize[modules[0]])}`;
  }

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
            label={bundleSizeLabel}
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
          {packageName !== '@mui/joy' ? (
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
          ) : null}
          {packageName !== '@mui/joy' ? (
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
          ) : null}
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
