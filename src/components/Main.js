import React, { useContext } from "react";
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";

import { GlobalContext } from "../context/GlobalState";

// Components
import Stats from "./stats/Stats";
import Selection from "./selection/Selection";
import Graph from "./graph/Graph";
import Error from "./Error";

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "89.7vh",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const Main = () => {
  const classes = useStyles();

  const {
    state: { error },
  } = useContext(GlobalContext);
  if (error !== "") return <Error error={error} />;
  return (
    <main className={classes.main}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stats />
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Selection />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper className={classes.paper}>
              <Graph />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Main;
