import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';

function clampAvatars<T>(
  avatars: Array<T>,
  options: { max?: number; total?: number } = { max: 5 },
) {
  const { max = 5, total } = options;
  let clampedMax = max < 2 ? 2 : max;
  const totalAvatars = total || avatars.length;
  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }
  clampedMax = Math.min(totalAvatars + 1, clampedMax);
  const maxAvatars = Math.min(avatars.length, clampedMax - 1);
  const surplus = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
  return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus };
}

export default function MaxAndTotalAvatars() {
  const dataFromTheServer = {
    people: [
      {
        alt: 'Remy Sharp',
        src: '/static/images/avatar/1.jpg',
      },
      {
        alt: 'Travis Howard',
        src: '/static/images/avatar/2.jpg',
      },
      {
        alt: 'Agnes Walker',
        src: '/static/images/avatar/4.jpg',
      },
      {
        alt: 'Trevor Henderson',
        src: '/static/images/avatar/5.jpg',
      },
    ],
    total: 24,
  };
  const { avatars, surplus } = clampAvatars(dataFromTheServer.people, {
    max: 5,
    total: dataFromTheServer.total,
  });
  return (
    <AvatarGroup>
      {avatars.map((avatar) => (
        <Avatar key={avatar.alt} {...avatar} />
      ))}
      {!!surplus && <Avatar>+{surplus}</Avatar>}
    </AvatarGroup>
  );
}
