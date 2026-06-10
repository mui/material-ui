import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const tags = ['React', 'TypeScript', 'CSS', 'Performance', 'Testing'];

export default function TailwindFilterChips() {
  const [selected, setSelected] = React.useState(['React', 'TypeScript']);

  const handleChange = (_, newSelected) => {
    setSelected(newSelected);
  };

  return (
    <div className="flex flex-col gap-3">
      <ToggleButtonGroup
        value={selected}
        onChange={handleChange}
        className="flex-wrap gap-2 border-0"
      >
        {tags.map((tag) => (
          <ToggleButton
            key={tag}
            value={tag}
            className="
              rounded-full px-4 py-1 text-sm normal-case m-0
              border border-neutral-300 dark:border-neutral-600
              bg-white dark:bg-neutral-900
              text-neutral-700 dark:text-neutral-300
              hover:bg-neutral-50 dark:hover:bg-neutral-800
              mui-selected:bg-indigo-600 mui-selected:text-white
              mui-selected:border-indigo-600 dark:mui-selected:bg-indigo-700
            "
          >
            {tag}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {selected.length === 0
          ? 'No filters active'
          : `Active: ${selected.join(', ')}`}
      </p>
    </div>
  );
}
