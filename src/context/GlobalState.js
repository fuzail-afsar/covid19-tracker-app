import { createContext, useReducer } from "react";

const initialState = {
  stats: { category: "", data: {} },
  selections: [],
  error: "",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTION":
      return { ...state, selections: action.payload };
    case "SET_STATS":
      return { ...state, stats: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setSelection = (selections) =>
    dispatch({ type: "SET_SELECTION", payload: selections });
  const setStats = (stats) => dispatch({ type: "SET_STATS", payload: stats });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });

  return (
    <GlobalContext.Provider value={{ state, setSelection, setStats, setError }}>
      {children}
    </GlobalContext.Provider>
  );
};
