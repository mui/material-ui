export default function getMinimalJoyTemplate() {
  return `import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import theme from "./theme";

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="outlined" color="primary" />;
  }
  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
};

export default function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Card
        size="lg"
        variant="solid"
        color="primary"
        invertedColors
        sx={{        borderRadius: "sm",
          m: 1,
          fontSize: "lg",
          background: (theme) =>
            \`linear-gradient(-10deg, \${theme.vars.palette.primary[900]} -10%, \${theme.vars.palette.primary[700]}, \${theme.vars.palette.primary[500]} 70%, \${theme.vars.palette.primary[400]})\`
        }}
      >
        <Box sx={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
          <ColorSchemeToggle />
        </Box>
        <Typography level="h1" fontWeight="xl" sx={{ mt: -1 }}>
          Joy UI
        </Typography>
        <Typography sx={{ mt: 0.5 }}>
          Hand-crafted React components with fresh design. Focus on developer
          experience and customizability.
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <List sx={{ mx: -1 }}>
          <ListSubheader>documentation</ListSubheader>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://mui.com/joy-ui/main-features/global-variants/"
              target="_blank"
              rel="noopener"
            >
              Main features &nbsp; <span role="img">↗</span>️
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://mui.com/joy-ui/react-autocomplete/"
              target="_blank"
              rel="noopener"
            >
              Browse components &nbsp; <span role="img">↗</span>️
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://mui.com/joy-ui/customization/approaches/"
              target="_blank"
              rel="noopener"
            >
              Check out theming and customization &nbsp;{" "}
              <span role="img">↗</span>️
            </ListItemButton>
          </ListItem>
        </List>
      </Card>
      <Typography textAlign="center" level="body-sm">
        Developed by{" "}
        <Link
          underline="always"
          href="https://mui.com/about"
          target="_blank"
          rel="noopener"
        >
          MUI
        </Link>{" "}
        team.
      </Typography>
    </CssVarsProvider>
  );
}
`;
}
