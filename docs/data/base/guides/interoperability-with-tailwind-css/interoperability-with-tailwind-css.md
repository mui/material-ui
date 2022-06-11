# Interoperability with Tailwind CSS

<p class="description">Learn how to use Tailwind CSS with MUI Base components.</p>

## Getting started

The goal of this guide is to teach you how to style MUI Base components using Tailwind CSS.
If you don't have experience with Tailwind CSS, we recommend you study that first before diving into this guide.
We're not going to cover all the steps to build the UI we'll use as an example but rather how to insert MUI Base components, making it interactive and accessible, and style it with Tailwind CSS.

This guide result is an interactive media player.
That's how it's going to look like in the end.

<img src="/static/images/base-with-tailwind-css/player-final.png" alt="Screenshot of the media player used as example in the guide, designed by the Tailwind Labs team" width="638" />

:::info
All credits go to the Tailwind Labs team for designing this component, found on the [Tailwind CSS website](https://tailwindcss.com/).
:::

## Setting up the project

We'll use `create-react-app` for this guide. 
For setting it up, follow the instructions given on the [Tailwind CSS installation page](https://tailwindcss.com/docs/guides/create-react-app).

Once you're done with the basic setup, install `@mui/base` in the project:

```sh
npm install @mui/base
```

## Adding the player markdown

Now, create a file called `Player.tsx` and add the markdown below in it, which is already using Tailwind CSS.

```tsx
import * as React from 'react';

const Player = React.forwardRef(function Player(
  props: { className?: string },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { className, ...other } = props;
  return (
    <div className={`max-w-[600px] max-h-[240px] ${className}`} {...other} ref={ref}>
      <div className="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://tailwindcss.com/_next/static/media/full-stack-radio.485d0b2c6e3aa1cacc6b50e462cd3675.png"
            alt=""
            width="88"
            height="88"
            className="flex-none rounded-lg bg-slate-100"
            loading="lazy"
          />
          <div className="min-w-0 flex-auto space-y-1 font-semibold">
            <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
              <abbr title="Episode">Ep.</abbr> 128
            </p>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
              Scaling CSS at Heroku with Utility Classes
            </h2>
            <p className="text-slate-900 dark:text-slate-50 text-lg">
              Full Stack Radio
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2"
                role="progressbar"
                aria-label="music progress"
                aria-valuenow={1456}
                aria-valuemin={0}
                aria-valuemax={4550}
              ></div>
            </div>
            <div className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
              <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <div className="text-cyan-500 dark:text-slate-100">24:16</div>
            <div className="text-slate-500 dark:text-slate-400">75:50</div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Add to favorites">
            <svg width="24" height="24">
              <path
                d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="hidden sm:block lg:hidden xl:block"
            aria-label="Previous"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="m10 12 8-6v12l-8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button type="button" aria-label="Rewind 10 seconds">
            <svg width="24" height="24" fill="none">
              <path
                d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 5v3.111c0 .491.398.889.889.889H9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="Pause"
        >
          <svg width="30" height="32" fill="currentColor">
            <rect x="6" y="4" width="4" height="24" rx="2" />
            <rect x="20" y="4" width="4" height="24" rx="2" />
          </svg>
        </button>
        <div className="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Skip 10 seconds">
            <svg width="24" height="24" fill="none">
              <path
                d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="hidden sm:block lg:hidden xl:block"
            aria-label="Next"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M14 12 6 6v12l8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
          >
            1x
          </button>
        </div>
      </div>
    </div>
  );
});

export default Player;
```

Next, add the `Player` component in the `App.tsx` file.
You should see the player render as it is on the screenshot above.
However, the component is not yet interactive. 
That's what we'll do in the next step.

## Adding an interactive Slider component

Let's start by giving life to the slider. 
For that, we'll use the `SliderUnstyled` component from MUI Base.
The first step is creating a new file called `Slider.tsx`.
Now, copy the code below in the file.

```tsx
import * as React from 'react';
import SliderUnstyled, { SliderUnstyledThumbSlotProps, SliderUnstyledProps } from '@mui/base/SliderUnstyled';

const Slider = React.forwardRef(function Slider(
  props: SliderUnstyledProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
){
  return (<SliderUnstyled
    {...props}
    ref={ref}
    componentsProps={{
      thumb: { className: "ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute" }
      root: { className: "w-full relative inline-block h-2 cursor-pointer" },
      rail: { className: "bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute" },
      track: { className: "bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full" }
    }}
  />);
});

export default Slider;
```

To assign specific Tailwind CSS utility classes for each part of the component, we're using `componentsProps`.
Most of them were copied from the original markup with small adjustments now that it is interactive.

Let's add the `Slider` into the `Player` component now:

```diff
--- a/src/Player.tsx
+++ b/src/Player.tsx
@@ -1,4 +1,5 @@
 import * as React from 'react';
+import Slider from './Slider';

 const Player = React.forwardRef(function Player(props: { className?: string }, ref: React.ForwardedRef<HTMLDivElement>) {
   const { className, ...other } = props;
@@ -21,12 +22,7 @@ const Player = React.forwardRef(function Player(props: { className?: string }, r
         </div>
         <div className="space-y-2">
           <div className="relative">
-            <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
-              <div className="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2" role="progressbar" aria-label="music progress" aria-valuenow={1456} aria-valuemin={0} aria-valuemax={4550}></div>
-            </div>
-            <div className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
-              <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
-            </div>
+            <Slider step={50} defaultValue={1456} max={4550} min={0} />
           </div>
           <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
             <div className="text-cyan-500 dark:text-slate-100">24:16</div>
```

You should be seeing this:

<img src="/static/images/base-with-tailwind-css/player-slider.png" alt="Screenshot of the media player used as example in the guide, designed by the Tailwind Labs team" width="638" />

Even though the slider is now interactive, it still does not look exactly like the original design.
This is because we haven't defined the element that represents the dot inside the thumb.

To do this, it's not enough to just use classes for the thumb, we need also to render a custom component that gets passed in the `components` prop of the `Slider`.

```diff
--- a/src/Slider.tsx
+++ b/src/Slider.tsx
@@ -1,6 +1,17 @@
 import * as React from 'react';
 import SliderUnstyled, { SliderUnstyledThumbSlotProps, SliderUnstyledProps } from '@mui/base/SliderUnstyled';

+const Thumb = React.forwardRef(function Thumb(
+  props: SliderUnstyledThumbSlotProps,
+  ref: React.ForwardedRef<HTMLSpanElement>,
+) {
+  const { ownerState, className, children, ...other } = props;
+  return (<span className={`${className} ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute`} {...other} ref={ref}>
+    <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></span>
+    {children}
+  </span>);
+});
+
 const Slider = React.forwardRef(function Slider(
   props: SliderUnstyledProps,
   ref: React.ForwardedRef<HTMLSpanElement>,
@@ -8,9 +19,11 @@ const Slider = React.forwardRef(function Slider(
   return (<SliderUnstyled
     {...props}
     ref={ref}
+    components={{
+      Thumb,
+    }}
     componentsProps={{
       root: { className: "w-full relative inline-block h-2 cursor-pointer" },
-      thumb: { className: "ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute" },
       rail: { className: "bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute" },
       track: { className: "bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full" }
     }}
```

After refreshing the page, you should see the thumb looking identical to the design now.
What we did was create a custom component, that had the same classes as before now appended to the root element, and before rendering the default children provided by the `Slider`, we added a `<span>` that represents the dot inside the thumb.
This is just an example but you can build a lot more custom components for each and every slot available in the MUI Base components.

:::warning
⚠️ When building custom components for the slots, always <b>propagate the props sent from the owner component on the root element</b>.
This is because the props will contain event handlers and aria properties necessary to make the component accessible.
Additionally, each of the slots receives an `ownerState` object, which contains the props & state of the owner component. 
This is useful if you want to style the component based on some internal state.
:::

## Adding a custom focus visible selector on the buttons

To finish this guide off, let's see how you can add custom styles based on a component's internal state.
We'll create a custom `Button` component that uses the `focusVisible` state from the MUI Base `ButtonUnstyled` to apply a cyan ring around it.

This is how it'll look like:

<img src="/static/images/base-with-tailwind-css/player-buttons.png" alt="Screenshot of a button used as example in the guide, designed by the Tailwind Labs team" width="638" />

Create a `Button.tsx` file and copy the following code:

```tsx
import * as React from 'react';
import ButtonUnstyled, {
  ButtonUnstyledOwnerState,
  ButtonUnstyledProps,
} from '@mui/base/ButtonUnstyled';

const Button = React.forwardRef(function Button(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ...other } = props;
  return (
    <ButtonUnstyled
      componentsProps={{
        root: (state: ButtonUnstyledOwnerState) => ({
          className: `hover:text-cyan-500 transition-colors ${
            state.focusVisible ? 'outline-0 ring-2 ring-cyan-500' : ''
          }`,
        }),
      }}
      {...other}
      ref={ref}
    />
  );
});

export default Button;
```

Note that we're using a `callback` for the `root` element inside the `componentsProps`. 
This allows us to conditionally apply utility classes if `focusVisible` is true.
Now, let's replace all buttons in the initial markup with the new custom `Button` component.

```diff
--- a/src/Player.tsx
+++ b/src/Player.tsx
@@ -1,4 +1,5 @@
 import * as React from 'react';
+import Button from './Button';
 import Slider from './Slider';

 const Player = React.forwardRef(function Player(props: { className?: string }, ref: React.ForwardedRef<HTMLDivElement>) {
@@ -32,46 +33,46 @@ const Player = React.forwardRef(function Player(props: { className?: string }, r
       </div>
       <div className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">         <div className="flex-auto flex items-center justify-evenly">
-          <button type="button" aria-label="Add to favorites">
+          <Button aria-label="Add to favorites">
             <svg width="24" height="24">
               <path d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
-          </button>
-          <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Previous">
+          </Button>
+          <Button className="hidden sm:block lg:hidden xl:block" aria-label="Previous">
             <svg width="24" height="24" fill="none">
               <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M6 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
-          </button>
-          <button type="button" aria-label="Rewind 10 seconds">
+          </Button>
+          <Button aria-label="Rewind 10 seconds">
             <svg width="24" height="24" fill="none">
               <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
-          </button>
+          </Button>
         </div>
-        <button type="button" className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center" aria-label="Pause">
+        <Button className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full border-2 border-slate-900/5 shadow-md flex items-center justify-center" aria-label="Pause">
           <svg width="30" height="32" fill="currentColor">
             <rect x="6" y="4" width="4" height="24" rx="2" />
             <rect x="20" y="4" width="4" height="24" rx="2" />
           </svg>
-        </button>
+        </Button>
         <div className="flex-auto flex items-center justify-evenly">
-          <button type="button" aria-label="Skip 10 seconds">
+          <Button aria-label="Skip 10 seconds">
             <svg width="24" height="24" fill="none">
               <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
-          </button>
-          <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Next">
+          </Button>
+          <Button className="hidden sm:block lg:hidden xl:block" aria-label="Next">
             <svg width="24" height="24" fill="none">
               <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M18 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
-          </button>
-          <button type="button" className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500">
+          </Button>
+          <Button className="rounded-lg text-xs leading-6 font-semibold px-2 border-2 border-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500 hover:ring-cyan-500">
             1x
-          </button>
+          </Button>
         </div>
       </div>
     </div>
```

Some classes were slightly changed on some buttons so we have a consistent focus indicator.

## Conclusion

These are the things we covered in this guide:

✅ How to use Tailwind CSS utility classes to style MUI Base components, using the `componentsProps`prop for targeting specific slots within the component.
✅ How to create custom components for specific slots in more complex customization scenarios.
We used the `component` prop to pass them into the parent component.
✅ How to apply conditional styling based on the owner component's state using a callback as value for the `componentsProps` prop.

Get all the code used in this guide in the [MUI Base with Tailwind CSS](https://github.com/mui/material-ui/tree/master/examples/mui-base-with-tailwind-css) example project.
