import { CssBaseline } from "@mui/material";

export function MuiDocument({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}
