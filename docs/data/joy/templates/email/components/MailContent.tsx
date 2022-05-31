import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import AspectRatio from '@mui/joy/AspectRatio';
import ListDivider from '@mui/joy/ListDivider';

// Icons import
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import FolderIcon from '@mui/icons-material/Folder';

export default function EmailContent() {
  return (
    <Sheet
      variant="outlined"
      sx={{
        minHeight: 500,
        borderRadius: 'sm',
        p: 2,
        mb: 3,
        bgcolor: 'background.componentBg',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            component="img"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
            }}
          />
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography level="body2" textColor="text.primary" mb={0.5}>
              Janet Erickson
            </Typography>
            <Typography level="body3" textColor="text.tertiary">
              14 Oct 2016
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', height: '32px', flexDirection: 'row', gap: 1.5 }}
        >
          <Button variant="outlined" color="neutral" size="sm">
            Reply
          </Button>
          <IconButton size="sm" variant="outlined" color="neutral">
            <ForwardToInboxRoundedIcon />
          </IconButton>
          <IconButton size="sm" variant="outlined" color="neutral">
            <DeleteRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <ListDivider component="hr" sx={{ mt: 2 }} />
      <Box
        sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography level="h5" textColor="text.primary">
          Blank slates for new website
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Typography
              component="span"
              level="body2"
              textColor="neutral.600"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              From
            </Typography>
            <Chip size="sm" variant="outlined" onClick={() => {}}>
              janet@mail.com
            </Chip>
          </Box>
          <Box>
            <Typography
              component="span"
              level="body2"
              textColor="neutral.600"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              to
            </Typography>
            <Chip size="sm" variant="outlined" onClick={() => {}}>
              janet@mail.com
            </Chip>
          </Box>
        </Box>
      </Box>
      <ListDivider component="hr" />
      <Typography level="body2" textColor="text.secondary" mt={2} mb={2}>
        Hi, Thomas,
        <br />
        <br />
        You don&apos;t have to be a designer to appreciate good typography – just
        check out this student-made device that can detect and name fonts just by
        looking at it.
        <br />
        <br />
        While the pop culture world obsesses over the latest Snapchat filter fads and
        Instagram friending, skilled photographers are taking the shots that
        transcend social media Share Quote. Take advantage of an incredible offer to
        become a skilled and certified photographer, taking frame-worthy shots every
        time with The Hollywood Art Institute Photography Course and Certification.
        <br />
        <br />
        Regards, Janet Erickson
      </Typography>
      <ListDivider component="hr" />
      <Typography
        level="body2"
        fontWeight="md"
        textColor="text.primary"
        mt={2}
        mb={2}
      >
        Attachments
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'flex',
          gap: 2,
          '& > div': {
            boxShadow: 'none',
            '--Card-padding': '0px',
            '--Card-radius': theme.vars.radius.sm,
          },
        })}
      >
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: '80px' }}>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: '80px' }}>
            <img
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined" row>
          <CardOverflow>
            <AspectRatio
              ratio="1"
              sx={{
                minWidth: '80px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FolderIcon />
              </Box>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ p: 2 }}>
            <Typography level="body2" color="primary">
              blank_slates.doc
            </Typography>
            <Typography level="body3">345 Kb</Typography>
          </Box>
        </Card>
      </Box>
    </Sheet>
  );
}
