import { Button, Typography, Sheet } from "@mui/joy";

export default function Index() {
  return (
    <Sheet
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography level="h2">Joy UI + React Router Test</Typography>
      <Button color="primary" size="lg">
        Hello from Joy UI!
      </Button>
    </Sheet>
  );
}
