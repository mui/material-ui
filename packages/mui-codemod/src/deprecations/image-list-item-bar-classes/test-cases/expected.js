import { imageListItemBarClasses } from '@mui/material-v7/ImageListItemBar';

("&.MuiImageListItemBar-positionBelow > .MuiImageListItemBar-titleWrap");
("&.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-titleWrap");
("&.MuiImageListItemBar-actionPositionRight > .MuiImageListItemBar-titleWrap");
("&.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-actionIcon");

`&.${imageListItemBarClasses.positionBelow} > .${imageListItemBarClasses.titleWrap}`;
`&.${imageListItemBarClasses.actionPositionLeft} > .${imageListItemBarClasses.titleWrap}`;
`&.${imageListItemBarClasses.actionPositionRight} > .${imageListItemBarClasses.titleWrap}`;
`&.${imageListItemBarClasses.actionPositionLeft} > .${imageListItemBarClasses.actionIcon}`;
