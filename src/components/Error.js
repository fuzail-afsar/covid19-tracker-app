import React from "react";

import { makeStyles, Typography, Container, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: "80vh",
  },
}));

const Error = ({ error }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        alignContent="center"
        className={classes.container}
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography component="p" variant="h4" align="center">
            {error}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;
