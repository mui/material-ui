import * as React from 'react';
import PropTypes from 'prop-types';
import {
  gridColumnVisibilityModelSelector,
  gridDensitySelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-premium';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import GridMoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardContent,
  CardDetailList,
  CardDetail,
  CardTitle,
  CardMedia,
} from './Card';
import { FileIcon } from './FileIcon';
import { formatDate, formatSize } from '../utils';

const ICON_SIZE_BY_DENSITY = {
  compact: 24,
  standard: 32,
  comfortable: 16,
};

function Thumbnail(props) {
  const { fileIcon } = props;
  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        borderRadius: 1,
        width: 64,
        height: 64,
        overflow: 'hidden',
        backgroundColor: 'grey.200',
        ...theme.applyStyles('dark', {
          backgroundColor: 'grey.800',
        }),
      })}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 4,
          left: 4,
          display: 'flex',
        }}
      >
        {fileIcon}
      </Box>
    </Box>
  );
}

Thumbnail.propTypes = {
  fileIcon: PropTypes.node,
};

function ListCell(props) {
  const { onOpenActions, ...params } = props;
  const apiRef = useGridApiContext();
  const density = useGridSelector(apiRef, gridDensitySelector);
  const columnVisibilityModel = useGridSelector(
    apiRef,
    gridColumnVisibilityModelSelector,
  );

  const showCreatedBy = columnVisibilityModel.createdBy !== false;
  const showSize = columnVisibilityModel.size !== false;
  const showCreatedAt = columnVisibilityModel.createdAt !== false;
  const showUpdatedAt = columnVisibilityModel.updatedAt !== false;
  const showThumbnail = density === 'comfortable';

  const icon = (
    <FileIcon
      type={params.row.type}
      sx={{ fontSize: ICON_SIZE_BY_DENSITY[density] }}
    />
  );

  return (
    <Card>
      <CardMedia>{showThumbnail ? <Thumbnail fileIcon={icon} /> : icon}</CardMedia>
      <CardContent>
        <CardTitle>{params.row.name}</CardTitle>
        {density !== 'compact' && (showCreatedBy || showSize) && (
          <CardDetailList>
            {showCreatedBy && <CardDetail>{params.row.createdBy}</CardDetail>}
            {showSize && <CardDetail>{formatSize(params.row.size)}</CardDetail>}
          </CardDetailList>
        )}
        {density === 'comfortable' && (showCreatedAt || showUpdatedAt) && (
          <CardDetail>
            {showUpdatedAt && `Updated ${formatDate(params.row.updatedAt)}`}
          </CardDetail>
        )}
      </CardContent>

      <IconButton
        aria-label="More options"
        onClick={(event) => {
          event.stopPropagation();
          onOpenActions();
        }}
        sx={{ mr: -0.75 }}
      >
        <GridMoreVertIcon fontSize="small" />
      </IconButton>
    </Card>
  );
}

ListCell.propTypes = {
  onOpenActions: PropTypes.func.isRequired,
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    state: PropTypes.oneOf(['pending', 'uploaded']).isRequired,
    type: PropTypes.oneOf([
      'docx',
      'gif',
      'jpeg',
      'jpg',
      'mov',
      'mp4',
      'pdf',
      'png',
      'tiff',
      'txt',
      'webm',
      'webp',
      'zip',
    ]).isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export { ListCell };
