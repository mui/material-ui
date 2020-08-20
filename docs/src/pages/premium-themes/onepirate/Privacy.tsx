import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Markdown from "./modules/components/Markdown";
import Typography from "./modules/components/Typography";
import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";

function Privacy() {
  const [markdown, setMarkdown] = useState("");

  // https://github.com/webpack/webpack/issues/6680
  useEffect(() => {
    import("./modules/views/privacy.md")
      .then((content) => fetch(content.default))
      .then((response) => response.text())
      .then((responseText) => setMarkdown(responseText));
  });

  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privacy
          </Typography>
          <Markdown>{markdown}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Privacy);
