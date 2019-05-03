
//useMediaQuery internally depends on useTheme,
//useWidth standalone depends on theme object though (can be created by createMuiTheme or useTheme )

//useMediaContext 
//WidthProvider depends internally on useTheme or can be bypassed by providing a theme object as an attribute


const ssrMatchMedia = query => ({
   matches: mediaQuery.match(query, {
       width: 3000,
   }),
});

theme={{ props: { MuiUseMediaQuery: { ssrMatchMedia } } }}

import mediaQuery from 'css-mediaquery';


# MediaQueryList

## props
- matches
- media
- onchange: => handler passing an event object with props  
	- matches: boolean
        - media: the actual matched string

## methods
- addListener
- removeListener
- dispatchEvent

mql = window.matchMedia('(max-witdh: 600px)')

store as key value in a map(query, mql, initiallyTrue) so if the query is fullfilled the onchange handler is fired
or all the listeners are called that are registered with add listener

on change fires on both events, when the value is no longer true or when the value becomes untrue

nothing happens if the query is true and the matched was already made
or when the query is false and there and it never matched.


```javascript
export default function ServerSide() {
  // Use https://github.com/ericf/css-mediaquery as ponyfill.
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      // For the sake of this demo, we are using a fixed value.
      // In production, you can look into client-hint https://caniuse.com/#search=client%20hint
      // or user-agent resolution.
      width: 800,
    }),
  });

  return (
    <ThemeProvider theme={{ props: { MuiUseMediaQuery: { ssrMatchMedia } } }}>
      <MyComponent />
    </ThemeProvider>
  );
}
```

