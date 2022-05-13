import * as React from 'react';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Badge from '@mui/joy/Badge';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';

export default function AvatarVariantsAndColors() {
  const [variant, setVariant] = React.useState<AvatarProps['variant']>('soft');
  const [color, setColor] = React.useState<AvatarProps['color']>('neutral');
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mx: 'auto', alignSelf: 'center', p: 3 }}>
        <Avatar
          variant={variant}
          color={color}
          alt="Cindy Baker"
          src="/static/images/avatar/4.jpg"
        />
        <Avatar variant={variant} color={color}>
          IN
        </Avatar>
      </Box>
      <Box
        sx={{
          maxWidth: 343,
          p: 2,
          bgcolor: 'background.level1',
          borderRadius: 'xs',
        }}
      >
        <Typography id="avatar-variant-selector" fontWeight="lg" mb={1}>
          Variant
        </Typography>
        <RadioGroup
          row
          name="avatar-variant"
          aria-labelledby="avatar-variant-selector"
          value={variant}
          onChange={(event) =>
            setVariant(event.target.value as AvatarProps['variant'])
          }
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {['plain', 'outlined', 'soft', 'solid'].map((value) => {
            const checked = variant === value;
            return (
              <Badge
                key={value}
                size="sm"
                badgeContent={<Check fontSize="sm" />}
                badgeInset="8%"
                invisible={!checked}
                sx={{ '--Badge-paddingX': '0px' }}
              >
                <Chip variant="plain">
                  <Radio
                    variant={checked ? 'outlined' : 'plain'}
                    label={value}
                    value={value}
                    disableIcon
                    overlay
                  />
                </Chip>
              </Badge>
            );
          })}
        </RadioGroup>

        <Typography id="avatar-color-selector" fontWeight="lg" mb={1} mt={3}>
          Color
        </Typography>
        <RadioGroup
          row
          name="avatar-color"
          aria-labelledby="avatar-color-selector"
          value={color}
          onChange={(event) => setColor(event.target.value as AvatarProps['color'])}
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {['neutral', 'primary', 'danger', 'info', 'success', 'warning'].map(
            (value) => {
              const checked = color === value;
              return (
                <Badge
                  key={value}
                  size="sm"
                  badgeContent={<Check fontSize="sm" />}
                  badgeInset="8%"
                  invisible={!checked}
                  sx={{ '--Badge-paddingX': '0px' }}
                >
                  <Chip variant="plain">
                    <Radio
                      variant={checked ? 'outlined' : 'plain'}
                      label={value}
                      value={value}
                      disableIcon
                      overlay
                    />
                  </Chip>
                </Badge>
              );
            },
          )}
        </RadioGroup>
      </Box>
    </Box>
  );
}
