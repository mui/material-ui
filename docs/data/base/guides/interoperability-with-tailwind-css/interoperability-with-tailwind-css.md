# Interoperability with Tailwind CSS

<p class="description">Learn how to use Tailwind CSS with MUI Base components.</p>

## Getting started

The goal of this guide is to teach you how to style MUI Base components using Tailwind CSS.
The guide assumes you have experience with Tailwind CSS already, or you are at least familiar with it.
We're not going to cover all the steps to build the UI we'll use as an example but rather how to insert MUI Base components, making it interactive and accessible, and style it with Tailwind CSS.
Trough out the guide, we'll build an interactive player.
You can see the final look of it on the picture below.

<img src="/static/images/base-with-tailwind-css/player-final.png" alt="Example UI using Tailwind CSS - player" width="638" />

:::info
The player is took as an inspiration from the [Tailwind CSS](https://tailwindcss.com/)'s documentation.
:::

## Setting up the project

We are going to use `create-react-app` in thsi demo. For setting up the project, follow the instructions give in the [official Tailwind CSS installation page](https://tailwindcss.com/docs/guides/create-react-app).

After you are done with that, add `@mui/base` in the project using:

```sh
npm install @mui/base
```

## Adding the player markdown

Next, we are going to add the markdown for the player that already has Tailwind CSS on top.

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

After this, you should see the player from the picture above. If you try to interact with it, for example use the slider, you will notice that it doesn't do anything. We are going to be adding the functionality in the next steps.

## Adding an interactive Slider component

In order to fix the issue with the uninteractive `Slider`, we are going to use the `SliderUnstyled` component from MUI Base.
Let's add a new file next to the `App.tsx`, called `Slider.tsx`.
Next we will create a custom `Slider` component that uses the `SliderUnstyled` component.

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

You will notice that the `componentsProps` above, defines the class names for the different parts of the slider.
Most of the classes are copied from the initial markup, with small adjustments in order to make the `Slider` functional.
Next, let's use this `Slider` in the `Player` component, by replacing the lines 24-29 with:

```diff
--- a/src/App.tsx
+++ b/src/App.tsx
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

After this you will get the following result:

<img src="/static/images/base-with-tailwind-css/player-slider.png" alt="Example UI using Tailwind CSS - player" width="638" />

You will notice now that the slider is interactive, however it doesn't look exactly as the initial picture.
This is because we haven't defined the element that represents the dot inside the thumb.
In order to do this, is not enough to just propagate classes for the thumb, we need to actually render a custom component for it.
We can do this easily by passing the custom component in the `components` props of the `Slider`.
This is what we need to do

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

If you refresh the page now, you will see that the thumb looks idential as in the first picture.
All that we did is, created custom component, appended the same classes as we did before on the root element, and before rendering the default children provided by the Slider component, we've added a span that represents the dot inside the thumb.
This is just a small example, but you can image building much more custom component for each of the slots available in the MUI Base components.

:::warning
⚠️ When you are building building custom components for the slots, it is important to always <b>propagate the props sent from the owner component on the root element</b>.
This is important, as the props will contain event handlers and aria properties necessaryf or making the component accessible.\
In addition to this, each of the slots receives an `ownerState` object, which contains the props & state of the owner component. This is useful if you want to style the component based on some internal state.
:::

## Adding custom focus visible selector on the buttons

The last step of this guide, will cover how we can add custom styles based on an internal state of the component.
To showcase this, we will create a custom `Button` component, that will use the `focusVisible` state of the `ButtonUnstyled` for applying a cyan ring around the button.

This is how the focused button will look like in the end:

<img src="/static/images/base-with-tailwind-css/player-buttons.png" alt="Example UI using Tailwind CSS - player" width="638" />

Let's add a custom `Button.tsx` file that will have the following content:

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

You can see how in this demo, we use a `callback` for the `root` inside the `componentsProps` so that we can conditionaly apply classes when the `focusVisible` is true.
Last, let's replace the all buttons in the intial markup with the new custom `Button` component.

```diff
--- a/src/App.tsx
+++ b/src/App.tsx
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

You may noticed that I slightly changed the classes use for the custom borders on some of the buttons so that we can have a consistent focus indicator on all buttons.

## Conclusion

This is what we learned in this guide:

✅ How to apply the Tailwind CSS classes inside the MUI Base components using the `componentsProps` prop, which allows us to target each slot inside the components.\
✅ We also learned that in some more involved customization scenarios, we may even need to create custom components for some of the slots. We can then use the `components` prop to pass the custom component. When creating custom components, it is important not to forget to pass all props on the root of the component.\
✅ Lastly, if we want to add some conditional style based on the state of the owner component, we can use a callback as a value inside the `componentsProps` prop.

You can find the complete code of this demo under in the following [link](https://github.com/mui/material-ui/tree/master/examples/mui-base-with-tailwind-css).
