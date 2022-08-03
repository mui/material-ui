import FolderIcon from '@mui/icons-material/Folder';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function CollapsedBreadcrumbs() {
  const [collapsed1, setCollapsed1] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(true);

  return (
    <div
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Sheet variant="plain" color="neutral">
        <Breadcrumbs separator="›">
          {collapsed1 ? (
            <Button
              size="sm"
              onClick={() => setCollapsed1(false)}
              variant="plain"
              color="neutral"
            >
              •••
            </Button>
          ) : (
            <React.Fragment>
              {['Home', 'Desktop'].map((item) => (
                <Link underline="hover" color="neutral" href="/" fontSize="inherit">
                  <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {item}
                </Link>
              ))}
            </React.Fragment>
          )}

          {['Program Files', 'Common Files', 'Services'].map((item) => (
            <Link underline="hover" color="neutral" href="/" fontSize="inherit">
              <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {item}
            </Link>
          ))}

          <Typography fontSize="inherit">
            <FolderIcon sx={{ mr: 0.5, mt: 0.5 }} fontSize="inherit" />
            bablo.txt
          </Typography>
        </Breadcrumbs>
      </Sheet>
      <Sheet variant="plain" color="primary">
        <Breadcrumbs separator="›">
          {collapsed2 ? (
            <Button
              size="sm"
              onClick={() => setCollapsed2(false)}
              variant="plain"
              color="neutral"
            >
              •••
            </Button>
          ) : (
            <React.Fragment>
              {['Project', 'Main'].map((item) => (
                <Link underline="hover" color="neutral" href="/" fontSize="inherit">
                  <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {item}
                </Link>
              ))}
            </React.Fragment>
          )}

          {['UX', 'Services', 'Mixed'].map((item) => (
            <Link underline="hover" color="neutral" href="/" fontSize="inherit">
              <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {item}
            </Link>
          ))}

          <Typography fontSize="inherit" alignItems="center" flexDirection="row">
            <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            design.figma
          </Typography>
        </Breadcrumbs>
      </Sheet>
    </div>
  );
}
