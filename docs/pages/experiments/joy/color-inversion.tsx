import * as React from 'react';
import { DndContext, useDraggable, useDroppable, useDndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkOutlined from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import BrandingProvider from 'docs/src/BrandingProvider';

const DraggableChip = function DraggableChip({ dropped }: { dropped?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'chip',
    disabled: dropped,
  });

  return (
    <Chip
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...(dropped && {
        tabIndex: -1,
      })}
      size="sm"
      variant="soft"
      sx={{
        borderRadius: 'xl',
        transform: CSS.Translate.toString(transform),
        zIndex: 1000,
        ...(!dropped && {
          cursor: isDragging ? 'grabbing !important' : 'grab !important',
        }),
      }}
    >
      New
    </Chip>
  );
};

const DraggableIconButton = function DraggableIconButton({ dropped }: { dropped?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'icon-button',
    disabled: dropped,
  });

  return (
    <IconButton
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      variant="outlined"
      color="neutral"
      size="sm"
      sx={{
        transform: CSS.Translate.toString(transform),
        zIndex: 1000,
        ...(!dropped && {
          cursor: isDragging ? 'grabbing !important' : 'grab !important',
        }),
      }}
    >
      <BookmarkOutlined />
    </IconButton>
  );
};

const DraggableText = function DraggableText({ dropped }: { dropped?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'text',
    disabled: dropped,
  });

  return (
    <Typography
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...(dropped && {
        tabIndex: -1,
      })}
      fontSize="xl2"
      fontWeight="lg"
      sx={{
        transform: CSS.Translate.toString(transform),
        zIndex: 1000,
        maxWidth: 268,
        ...(!dropped && {
          cursor: isDragging ? 'grabbing !important' : 'grab !important',
        }),
      }}
    >
      Learn how to build super fast website.
    </Typography>
  );
};

const DraggableButton = function DraggableButton({ dropped }: { dropped?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'button',
    disabled: dropped,
  });
  return (
    <Button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      variant="solid"
      endDecorator={<KeyboardArrowRight />}
      sx={{
        width: 268,
        transform: CSS.Translate.toString(transform),
        zIndex: 1000,
        ...(!dropped && {
          cursor: isDragging ? 'grabbing !important' : 'grab !important',
        }),
      }}
    >
      Read more
    </Button>
  );
};

const Droppable = function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactElement;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });
  const dndContext = useDndContext();
  return React.cloneElement(children, {
    ref: setNodeRef,
    sx: {
      ...children.props?.sx,
      bgcolor: id.startsWith(dndContext.active?.id.toString() || 'unknown')
        ? 'rgba(255 255 255 / 0.3)'
        : null,
    },
  });
};

export default function ColorInversion() {
  const [chipDropped, setChipDropped] = React.useState(false);
  const [iconButtonDropped, setIconButtonDropped] = React.useState(false);
  const [textDropped, setTextDropped] = React.useState(false);
  const [buttonDropped, setButtonDropped] = React.useState(false);
  const renderDroppableChip = () => (
    <Box
      sx={{
        height: 24,
        width: 42,
        borderRadius: 40,
        alignSelf: 'flex-start',
        lineHeight: 1,
      }}
    >
      {chipDropped && <DraggableChip dropped />}
    </Box>
  );
  const renderDroppableIconButton = () => (
    <Box
      sx={{
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        height: 32,
        width: 32,
        bgcolor: 'rgba(255 255 255 / 0.3)',
      }}
    >
      {iconButtonDropped && <DraggableIconButton dropped />}
    </Box>
  );
  const renderDroppableText = () => (
    <Box
      sx={{
        width: 268,
        height: 72,
        bgcolor: 'rgba(255 255 255 / 0.3)',
      }}
    >
      {textDropped && <DraggableText dropped />}
    </Box>
  );
  const renderDroppableButton = () => (
    <Box
      sx={{
        width: 268,
        height: 40,
        bgcolor: 'rgba(255 255 255 / 0.3)',
      }}
    >
      {buttonDropped && <DraggableButton dropped />}
    </Box>
  );
  return (
    <CssVarsProvider>
      <CssBaseline />
      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over?.id.toString().startsWith(active?.id.toString() || 'unknown')) {
            if (active?.id === 'chip') {
              setChipDropped(true);
            }
            if (active?.id === 'icon-button') {
              setIconButtonDropped(true);
            }
            if (active?.id === 'text') {
              setTextDropped(true);
            }
            if (active?.id === 'button') {
              setButtonDropped(true);
            }
          }
        }}
      >
        <Container>
          <Typography textColor="text.secondary" mt={5} mb={3} textAlign="center">
            Drag and drop the elements below to the containers to see the differences.
          </Typography>
          <Box
            sx={{
              minHeight: 120,
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              bgcolor: 'background.level1',
            }}
          >
            {!chipDropped && <DraggableChip />}
            {!iconButtonDropped && <DraggableIconButton />}
            {!textDropped && <DraggableText />}
            {!buttonDropped && <DraggableButton />}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, mt: 10 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography my={2}>
                <Typography color="danger" fontWeight="xl">
                  Without
                </Typography>{' '}
                the color inversion{' '}
              </Typography>
              <Card variant="solid" color="primary" sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}>
                <Droppable id="chip">{renderDroppableChip()}</Droppable>
                <Droppable id="icon-button">{renderDroppableIconButton()}</Droppable>
                <Droppable id="text">{renderDroppableText()}</Droppable>
                <Droppable id="button">{renderDroppableButton()}</Droppable>
              </Card>
              <BrandingProvider>
                <HighlightedCode
                  copyButtonHidden
                  language="jsx"
                  code={`<Card variant="solid" color="primary">`}
                />
              </BrandingProvider>
            </Box>

            <Divider orientation="vertical" />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography my={2}>
                Color inversion is{' '}
                <Typography color="success" fontWeight="xl">
                  enabled
                </Typography>
              </Typography>
              <Card
                variant="solid"
                color="primary"
                invertedColors
                sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}
              >
                <Droppable id="chip2">{renderDroppableChip()}</Droppable>
                <Droppable id="icon-button2">{renderDroppableIconButton()}</Droppable>
                <Droppable id="text2">{renderDroppableText()}</Droppable>
                <Droppable id="button2">{renderDroppableButton()}</Droppable>
              </Card>
              <BrandingProvider>
                <HighlightedCode
                  copyButtonHidden
                  language="jsx"
                  code={`<Card variant="solid" color="primary" invertedColors>`}
                />
              </BrandingProvider>
            </Box>
          </Box>
        </Container>
      </DndContext>
    </CssVarsProvider>
  );
}
