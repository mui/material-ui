import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function ExampleFilterMemberCheckbox() {
  const [members, setMembers] = React.useState([false, true, false]);
  const toggleMember =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMembers = [...members];
      newMembers[index] = event.target.checked;
      setMembers(newMembers);
    };
  return (
    <Sheet
      variant="outlined"
      sx={{ p: 2, borderRadius: 'sm', width: 360, maxWidth: '100%' }}
    >
      <Typography
        id="member"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Team members
      </Typography>
      <div role="group" aria-labelledby="member">
        <List
          sx={{
            '--ListItem-gap': '0.75rem',
            [`& .${checkboxClasses.root}`]: {
              mr: 'auto',
              flexGrow: 1,
              alignItems: 'center',
              flexDirection: 'row-reverse',
            },
          }}
        >
          <ListItem>
            <Avatar aria-hidden="true" src="/static/images/avatar/1.jpg" />
            <Checkbox
              disabled
              label="Friedrich Oberbrunner"
              overlay
              checked={members[0]}
              onChange={toggleMember(0)}
            />
          </ListItem>
          <ListItem
            {...(members[1] && {
              variant: 'soft',
              color: 'primary',
            })}
          >
            <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
            <Checkbox
              overlay
              label={
                <React.Fragment>
                  Adeline O&apos;Reilly{' '}
                  {members[1] && (
                    <Typography
                      aria-hidden="true"
                      sx={{ display: 'block', fontSize: 'sm', color: 'neutral.500' }}
                    >
                      This user is your friend.
                    </Typography>
                  )}
                </React.Fragment>
              }
              checked={members[1]}
              onChange={toggleMember(1)}
              sx={{ color: 'inherit' }}
            />
          </ListItem>
          <ListItem {...(members[2] && { variant: 'soft', color: 'neutral' })}>
            <Avatar aria-hidden="true" variant="solid">
              FP
            </Avatar>
            <Checkbox
              label="Fernando Pidrillio"
              overlay
              color="neutral"
              checked={members[2]}
              onChange={toggleMember(2)}
            />
          </ListItem>
        </List>
      </div>
    </Sheet>
  );
}
