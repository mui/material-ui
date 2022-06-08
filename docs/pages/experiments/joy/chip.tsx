/* eslint-disable no-alert */
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import ThumbUp from '@mui/icons-material/ThumbUp';
import DeleteForever from '@mui/icons-material/DeleteForever';
import LocationOn from '@mui/icons-material/LocationOn';
import DirectionsBike from '@mui/icons-material/DirectionsBike';
import AlarmOn from '@mui/icons-material/AlarmOn';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const props = {
  size: ['sm', 'md', 'lg'],
  color: ['primary', 'danger', 'info', 'success', 'warning', 'neutral'],
  variant: ['solid', 'outlined', 'soft'],
  disabled: [true, false],
} as const;

const FavoriteMovies = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <Box>
      <Typography level="h2" fontSize="lg" id="fav-movie" mb={2}>
        Favorite Movies
      </Typography>
      <Box
        role="group"
        aria-labelledby="fav-movie"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
      >
        {[
          'Star trek',
          'Batman',
          'Spider man',
          'Eternals',
          'Shang chi',
          'Jungle cruise',
          'No time to die',
          'Thor',
          'The hulk',
        ].map((name) => {
          const checked = selected.includes(name);
          return (
            <Chip
              key={name}
              variant={checked ? 'soft' : 'plain'}
              color={checked ? 'primary' : 'neutral'}
              startDecorator={checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />}
              sx={{ '--Chip-radius': '4px' }}
            >
              <Checkbox
                variant="outlined"
                color={checked ? 'primary' : 'neutral'}
                disableIcon
                overlay
                label={name}
                checked={checked}
                onChange={(event) => {
                  setSelected((names) =>
                    !event.target.checked ? names.filter((n) => n !== name) : [...names, name],
                  );
                }}
              />
            </Chip>
          );
        })}
      </Box>
    </Box>
  );
};

const BestMovie = () => {
  const [selected, setSelected] = React.useState('');
  return (
    <Box>
      <Typography level="h2" fontSize="lg" id="best-movie" mb={2}>
        Best Movie
      </Typography>
      <RadioGroup
        name="best-movie"
        aria-labelledby="best-movie"
        row
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        {[
          'Star trek',
          'Batman',
          'Spider man',
          'Eternals',
          'Shang chi',
          'Jungle cruise',
          'No time to die',
          'Thor',
          'The hulk',
        ].map((name) => {
          const checked = selected === name;
          return (
            <Chip
              key={name}
              variant={checked ? 'soft' : 'plain'}
              color={checked ? 'primary' : 'neutral'}
              startDecorator={checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />}
              sx={{ '--Chip-radius': '4px' }}
            >
              <Radio
                variant="outlined"
                color={checked ? 'primary' : 'neutral'}
                disableIcon
                overlay
                label={name}
                value={name}
                checked={checked}
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelected(name);
                  }
                }}
              />
            </Chip>
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default function JoyChip() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        {/* Examples */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 5, mt: 5 }}>
          <ChipDelete />
          <ChipDelete variant="soft" />
          <Chip variant="plain" endDecorator={<ChipDelete />}>
            Benny
          </Chip>
          <Chip endDecorator={<ChipDelete />}>Benny</Chip>
          <Chip disabled onClick={() => {}} endDecorator={<ChipDelete />}>
            Benny
          </Chip>
          <Chip variant="soft" startDecorator={<ChipDelete />}>
            Benny
          </Chip>
          <Chip variant="soft" onClick={() => alert('hey')}>
            Benny
          </Chip>
          <Chip variant="soft" startDecorator={<ChipDelete />} onClick={() => alert('hey')}>
            Benny
          </Chip>
          <Chip
            variant="soft"
            endDecorator={<ChipDelete />}
            componentsProps={{
              action: {
                component: 'a',
                href: '#unknown',
              },
            }}
          >
            Benny
          </Chip>
          <Chip
            variant="solid"
            color="success"
            size="sm"
            startDecorator={<Avatar src={`/static/images/avatar/1.jpg`} />}
            endDecorator={<CheckIcon />}
          >
            Benny
          </Chip>
          <Chip
            variant="outlined"
            color="neutral"
            size="lg"
            startDecorator={<Avatar size="sm" src={`/static/images/avatar/1.jpg`} />}
            endDecorator={<CheckIcon fontSize="md" sx={{ mr: 0.25 }} />}
            onClick={() => alert('hey')}
            sx={{ '--Chip-radius': '8px' }}
          >
            Benny
          </Chip>
          <Chip
            variant="outlined"
            color="neutral"
            size="lg"
            startDecorator={<Avatar src={`/static/images/avatar/1.jpg`} size="sm" />}
            endDecorator={<ChipDelete variant="plain" />}
            sx={{ '--Chip-radius': '8px' }}
          >
            Benny
          </Chip>
          <Chip
            variant="outlined"
            color="danger"
            size="sm"
            endDecorator={
              <ChipDelete color="danger" variant="plain">
                <DeleteForever />
              </ChipDelete>
            }
            sx={{ '--Chip-radius': '12px' }}
          >
            Clear
          </Chip>
          <Chip
            variant="outlined"
            color="danger"
            size="sm"
            onClick={() => {}}
            endDecorator={<DeleteForever />}
            sx={{ '--Chip-radius': '12px', minHeight: '28px' }}
          >
            Clear
          </Chip>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 5,
            my: 3,
          }}
        >
          <Box sx={(theme) => ({ p: 0.5, borderRadius: 'sm', ...theme.variants.outlined.neutral })}>
            {['Apple', 'Mango', 'Pineapple', 'Strawberry', 'Mixberry'].map((item) => (
              <Chip
                key={item}
                variant="outlined"
                endDecorator={<ChipDelete sx={{ boxShadow: 'xs' }} />}
                sx={{ mb: 0.5, mr: 0.5 }}
              >
                {item}
              </Chip>
            ))}
          </Box>
          <Box>
            <Typography level="h2" fontSize="lg" id="refine-title" mb={1}>
              Refine results
            </Typography>
            <Box
              role="group"
              aria-labelledby="refine-title"
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
            >
              {[
                'Top Rated',
                'Men',
                'Black',
                'Red',
                'Green',
                'Blue',
                'Turquoise',
                'Shoes',
                'Watches',
              ].map((item) => (
                <Chip
                  key={item}
                  color="neutral"
                  variant="outlined"
                  endDecorator={<ChipDelete variant="plain" />}
                  sx={{ '--Chip-radius': '10px' }}
                >
                  {item}
                </Chip>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {(['soft', 'outlined'] as const).map((variant) => (
              <React.Fragment key={variant}>
                <Chip
                  color="neutral"
                  variant={variant}
                  size="sm"
                  endDecorator={<ChipDelete />}
                  sx={{ '--Chip-decorator-childHeight': '16px' }}
                >
                  <LocationOn sx={{ mr: 0.5 }} /> Portland
                </Chip>
                <Chip
                  color="neutral"
                  variant={variant}
                  size="sm"
                  endDecorator={<ChipDelete />}
                  sx={{ '--Chip-decorator-childHeight': '16px' }}
                >
                  <DirectionsBike sx={{ mr: 0.5 }} /> Biking
                </Chip>
              </React.Fragment>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip variant="soft" startDecorator={<Sun />}>
              Turn on lights
            </Chip>
            <Chip variant="soft" startDecorator={<AlarmOn />}>
              Set alarm
            </Chip>
          </Box>
          <FavoriteMovies />
          <BestMovie />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {/* Without decorators */}
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box
                  key={`${value}-without-decorator`}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Chip {...{ [propName]: value }}>{`${propName}: ${value}`}</Chip>
                  {value !== undefined && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {`${value}`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          {/* With decorators */}
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box
                  key={`${value}-with-decorator`}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Chip endDecorator={<ArrowDropDown />} {...{ [propName]: value }}>
                    <ThumbUp sx={{ mr: 'var(--Chip-gap)' }} />
                    {`${propName}: ${value}`}
                  </Chip>
                  {value !== undefined && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {`${value}`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
