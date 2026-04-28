import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function JobCard({ role, team, status, applicants, avatarColors }) {
  const isActive = status === 'Active';
  return (
    <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-semibold text-base">
              {role[0]}
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm leading-tight">
                {role}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {team}
              </p>
            </div>
          </div>
          <Chip
            label={status}
            size="small"
            className={
              isActive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-0 font-medium'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-0 font-medium'
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarGroup max={3}>
              {avatarColors.map((color, i) => (
                <Avatar
                  key={i}
                  sx={{ width: 28, height: 28, fontSize: 12, bgcolor: color }}
                />
              ))}
            </AvatarGroup>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {applicants} applicants
            </span>
          </div>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            Remote
          </span>
        </div>
      </CardContent>
      <CardActions className="px-5 pb-4 pt-0">
        <Button
          size="small"
          className="rounded-full normal-case text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-sm"
        >
          View details
        </Button>
        <Button
          size="small"
          variant="contained"
          className="rounded-full normal-case bg-indigo-600 hover:bg-indigo-700 shadow-none text-sm ml-auto"
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  );
}

export default function TailwindCard() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-sm sm:max-w-2xl sm:grid-cols-2">
      <JobCard
        role="Frontend Developer"
        team="Design Systems"
        status="Active"
        applicants={24}
        avatarColors={['#6366f1', '#8b5cf6', '#ec4899']}
      />
      <JobCard
        role="Backend Engineer"
        team="Platform"
        status="Pending"
        applicants={11}
        avatarColors={['#0ea5e9', '#14b8a6', '#f59e0b']}
      />
    </div>
  );
}
