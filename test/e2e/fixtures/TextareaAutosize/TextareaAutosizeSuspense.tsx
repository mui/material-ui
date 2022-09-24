import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import * as React from 'react';

function LazyRoute() {
  const [isDone, setIsDone] = React.useState(false);

  if (!isDone) {
    // Force React to show fallback suspense
    throw new Promise((resolve) => {
      window.setTimeout(resolve, 1);
      setIsDone(true);
    });
  }

  return <div />;
}

export default function TextareaAutosizeSuspense() {
  const [showRoute, setShowRoute] = React.useState(false);

  return (
    <React.Suspense fallback={null}>
      <Button onClick={() => setShowRoute((r) => !r)}>Toggle view</Button>
      {showRoute ? <LazyRoute /> : <TextareaAutosize />}
    </React.Suspense>
  );
}
