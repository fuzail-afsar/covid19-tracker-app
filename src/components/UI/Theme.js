import React from "react";
import { createTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import defaultTheme from "@material-ui/core/styles/defaultTheme";

export const themeObj = {
  palette: {
    primary: {
      main: "#d61c58",
    },
  },
  overrides: {
    MuiTreeItem: {
      root: {
        backgroundColor: defaultTheme.palette.common.white,
        marginTop: defaultTheme.spacing(1.5),

        "&$selected> $content $label, &$selected:focus > $content $label, $label:hover":
          {
            backgroundColor: defaultTheme.palette.common.white,
            color: "#d61c58",
          },
        "&$expanded > $content $label": {
          color: "#d61c58",
        },
      },
    },
  },
};
const theme = createTheme(themeObj);

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
