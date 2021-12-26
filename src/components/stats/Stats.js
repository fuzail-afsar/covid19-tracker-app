import React, { useEffect, useContext } from "react";
import NumberFormat from "react-number-format";

import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import defaultTheme from "@material-ui/core/styles/defaultTheme";
import { green, yellow, red } from "@material-ui/core/colors";

import { globalAjax } from "../../helpers/Ajax";
import { GlobalContext } from "../../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

const Stats = () => {
  const classes = useStyles();

  const {
    palette: {
      primary: { main: primary },
    },
  } = defaultTheme;

  const colors = [primary, green[700], yellow[700], red[700]];

  const {
    state: { stats },
    setStats,
    setError,
  } = useContext(GlobalContext);

  useEffect(() => {
    const setGlobalStatOnLoad = async () => {
      try {
        const data = await globalAjax();
        setStats({ category: "global", data });
      } catch (error) {
        setError("Oops something went wrong! We couldn't get global data");
        console.error(error);
      }
    };
    setGlobalStatOnLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Object.keys(stats.data).length)
    return (
      <div>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    );
  return (
    <Grid container spacing={3}>
      {Object.entries(stats.data).map(([key, value], index) => (
        <Grid key={key} item xs={12} sm={6} md={3}>
          <Paper
            className={classes.paper}
            align="center"
            style={{ borderBottom: `10px solid ${colors[index]}` }}
          >
            <Typography
              variant="h6"
              component="p"
              style={{ color: colors[index] }}
            >
              {key.toUpperCase()}
            </Typography>
            <NumberFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => (
                <Typography component="p">{value}</Typography>
              )}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stats;
