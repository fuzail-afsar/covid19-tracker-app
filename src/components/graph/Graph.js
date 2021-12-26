import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { GlobalContext } from "../../context/GlobalState";
import defaultTheme from "@material-ui/core/styles/defaultTheme";
import { green, yellow, red } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";

const Graph = () => {
  const {
    palette: {
      primary: { main: primary },
    },
  } = defaultTheme;

  const {
    state: { stats },
  } = useContext(GlobalContext);

  if (!Object.keys(stats.data).length)
    return <Skeleton variant="rect" width="100%" height={500} />;

  const labels = [
    ...Object.keys(stats.data).map(
      (statLabel) => statLabel[0].toUpperCase() + statLabel.slice(1)
    ),
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${
          stats.category && stats.category[0].toUpperCase()
        }${stats.category.slice(1)} Graph`,
        data: Object.values(stats.data),
        backgroundColor: [
          `${primary}33`,
          `${green["700"]}33`,
          `${yellow["700"]}33`,
          `${red["700"]}33`,
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          primary,
          green["700"],
          yellow["700"],
          red["700"],
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        width={100}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Graph;
