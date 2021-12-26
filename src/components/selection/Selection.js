import React, { useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Skeleton, TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { globalAjax, continentsAjax, countryAjax } from "../../helpers/Ajax";
import { GlobalContext } from "../../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    height: "548px",
    overflowY: "hidden",
    padding: theme.spacing(2),
    "& span": {
      margin: `${theme.spacing(1)}px 0`,
    },
  },
  selectionWrapper: {
    height: "548px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
      borderRadius: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "330px",
    },
  },
  treeView: {
    padding: theme.spacing(2),
    "& > li > .MuiTreeItem-content .MuiTypography-root, li[data-category='continent'] > .MuiTreeItem-content .MuiTypography-root":
      {
        fontSize: "1.2rem",
      },
  },
}));

const Selection = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(["Global"]);
  const [selected, setSelected] = React.useState([]);

  const {
    state: { selections },
    setSelection,
    setStats,
    setError,
  } = useContext(GlobalContext);

  const handleToggle = (_, nodeIds) => {
    if (nodeIds.length >= 3) {
      if (nodeIds[nodeIds.length - 2] !== "Global")
        nodeIds.splice(nodeIds.length - 2, 1);
      else nodeIds.pop();
    }
    return setExpanded(nodeIds);
  };
  const handleSelect = async (event, nodeId) => {
    const category = event.target.closest("li").dataset.category;
    setSelected(nodeId);

    switch (category) {
      case "continent":
        const [{ cases, recovered, active, deaths }] = selections.filter(
          (selection) => selection.continent === nodeId
        );
        return setStats({
          category,
          data: { cases, recovered, active, deaths },
        });
      case "country":
        try {
          const data = await countryAjax(nodeId);
          return setStats({ category, data });
        } catch (error) {
          setError(
            `Oops something went wrong! We couldn't get country ${nodeId} data`
          );
          return console.error(error);
        }
      default:
        try {
          const data = await globalAjax();
          return setStats({ category: "global", data });
        } catch (error) {
          setError("Oops something went wrong! We couldn't get global data");
          return console.error(error);
        }
    }
  };
  useEffect(() => {
    const setSelectionOnLoad = async () => {
      try {
        const data = await continentsAjax();
        setSelection(data);
      } catch (error) {
        setError("Oops something went wrong! We couldn't get continents data");
        console.error(error);
      }
    };
    setSelectionOnLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!selections.length)
    return (
      <div className={classes.skeleton}>
        {[...Array(18)].map((_, i) => (
          <Skeleton key={i} animation="wave" />
        ))}
      </div>
    );

  return (
    <div className={classes.selectionWrapper}>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon color="primary" />}
        defaultExpandIcon={<ChevronRightIcon color="primary" />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        className={classes.treeView}
      >
        <TreeItem nodeId="Global" label="Global">
          {selections.map((selection) => (
            <TreeItem
              key={selection.continent}
              nodeId={selection.continent}
              label={selection.continent}
              data-category="continent"
            >
              {selection.countries.map((country) => (
                <TreeItem
                  key={country}
                  nodeId={country}
                  label={country}
                  data-category="country"
                />
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Selection;
