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
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/joy/Avatar';

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
          <Avatar
            src="https://i.pravatar.cc/40?img=3"
            srcSet="https://i.pravatar.cc/80?img=3"
            sx={{ borderRadius: 'sm' }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography level="body2" textColor="text.primary" mb={0.5}>
              Alex Jonnold
            </Typography>
            <Typography level="body3" textColor="text.tertiary">
              21 Oct 2022
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
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography level="h5" textColor="text.primary">
          Details for our Yosemite Park hike
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
              sx={{ mr: 1, display: 'inline-block' }}
            >
              From
            </Typography>
            <Chip size="sm" variant="outlined" onClick={() => {}}>
              alex.jonnold@hike.com
            </Chip>
          </Box>
          <Box>
            <Typography
              component="span"
              level="body2"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              to
            </Typography>
            <Chip size="sm" variant="outlined" onClick={() => {}}>
              steve@mail.com
            </Chip>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Typography level="body2" mt={2} mb={2}>
        Hello, my friend!
        <br />
        <br />
        So, it seems we are getting there! Our trip is finally here. As you know, I
        love Yosemite National Park, a lot of great climbers and explorers have made
        history there, so I&apos;m very excited to bring you with me in this journey.
        <br />
        <br />
        There are plenty of amazing things to see there, from internationally
        recognized granite cliffs, waterfalls, clear streams, giant sequoia groves,
        lakes, mountains, meadows, glaciers, and a lot o biological diversity. It is
        amazing that almost 95 percent of the park is designated wilderness. Yosemite
        is one of the largest and least fragmented habitat blocks in the Serra
        Nevada, and the park supports a fantastic diversity of plants and animals.
        <br />
        <br />
        I really hope you love coming along with me, we will have an awesome time!
        I&apos;m attaching a few pics I took on the last time I went there-get
        excited!
        <br />
        <br />
        See you soon, Alex Jonnold
      </Typography>
      <Divider />
      <Typography fontWeight="md" fontSize="sm" mt={2} mb={2}>
        Attachments
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '& > div': {
            boxShadow: 'none',
            '--Card-padding': '0px',
            '--Card-radius': theme.vars.radius.sm,
          },
        })}
      >
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=80"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=160 2x"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=80"
              srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=160 2x"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined" orientation="horizontal">
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
              <Box>
                <FolderIcon />
              </Box>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography level="body2" color="primary">
              videos-hike.zip
            </Typography>
            <Typography level="body3">100 MB</Typography>
          </Box>
        </Card>
      </Box>
    </Sheet>
  );
}
