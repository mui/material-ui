import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

export interface KnobInputProps {
  // Display/probe key only (entry.key / knob.id) — never the write target; the
  // parent's onCommit closes over the ids it fans out to (virtual knobs write
  // several).
  id: string;
  idAttr: 'data-mapping-field' | 'data-token-field';
  label: string;
  // Committed value from the page mapping. External changes (Reset button,
  // preset flip) resync the draft; the input's own commits don't.
  value: string;
  placeholder: string;
  disabled?: boolean;
  // Live feedback computed off the DRAFT per keystroke — passing helper text in
  // from the committed value would lag by the debounce.
  computeHelper?: (draft: string) => { helper?: string; error?: boolean };
  onCommit: (value: string) => void;
}

const COMMIT_DEBOUNCE_MS = 150;

// One sidebar knob: caption label (no floating label) + small input + live
// helper line. Draft state is local; commits upward are debounced so the whole
// page doesn't re-render per keystroke. Commits are UNCONDITIONAL — invalid
// drafts store too (the apply path skips rows that don't parse), error is
// display-only.
export const KnobInput = React.memo(function KnobInput(props: KnobInputProps) {
  const {
    id,
    idAttr,
    label,
    value,
    placeholder,
    disabled = false,
    computeHelper,
    onCommit,
  } = props;
  const [draft, setDraft] = React.useState(value);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pending = React.useRef<string | null>(null);
  const committed = React.useRef(value);
  const onCommitRef = React.useRef(onCommit);
  onCommitRef.current = onCommit;

  const flush = React.useCallback(() => {
    if (timer.current !== undefined) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    if (pending.current !== null) {
      const next = pending.current;
      pending.current = null;
      committed.current = next;
      onCommitRef.current(next);
    }
  }, []);

  // Resync on EXTERNAL committed-value changes only; a value echoing our own
  // commit is a no-op, and must not clobber a newer in-flight draft.
  React.useEffect(() => {
    if (value !== committed.current) {
      if (timer.current !== undefined) {
        clearTimeout(timer.current);
        timer.current = undefined;
      }
      pending.current = null;
      committed.current = value;
      setDraft(value);
    }
  }, [value]);

  // Flush a pending commit on unmount (e.g. family switch mid-typing).
  React.useEffect(() => flush, [flush]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setDraft(next);
    pending.current = next;
    if (timer.current !== undefined) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(flush, COMMIT_DEBOUNCE_MS);
  };

  const feedback = disabled ? undefined : computeHelper?.(draft);

  return (
    <FormControl fullWidth size="small" disabled={disabled} error={Boolean(feedback?.error)}>
      <Typography
        variant="caption"
        component="label"
        htmlFor={`knob-${id}`}
        color={disabled ? 'text.disabled' : 'text.secondary'}
      >
        {label}
      </Typography>
      <OutlinedInput
        id={`knob-${id}`}
        size="small"
        value={draft}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={flush}
        inputProps={{ [idAttr]: id }}
      />
      {computeHelper && <FormHelperText>{feedback?.helper ?? ' '}</FormHelperText>}
    </FormControl>
  );
});
