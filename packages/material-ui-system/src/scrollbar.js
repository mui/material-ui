// track, thumb and active are derieved from macOS 10.15.7
const scrollBar = {
  track: '#2b2b2b',
  thumb: '#6b6b6b',
  active: '#959595',
};

function darkScrollbar() {
  return {
    scrollbarColor: `${scrollBar.thumb} ${scrollBar.track}`,
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: scrollBar.track,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: scrollBar.thumb,
      minHeight: 24,
      border: `3px solid ${scrollBar.track}`,
    },
    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
      backgroundColor: scrollBar.active,
    },
    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
      backgroundColor: scrollBar.active,
    },
    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: scrollBar.active,
    },
    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
      backgroundColor: scrollBar.track,
    },
  };
}

export default darkScrollbar;
