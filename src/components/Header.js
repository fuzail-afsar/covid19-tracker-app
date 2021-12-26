import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Container } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Typography style={{ cursor: "pointer" }} variant="h6">
            Covid-19 Tracker
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
