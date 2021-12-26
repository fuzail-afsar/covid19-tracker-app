import "./App.css";
import { GlobalProvider } from "./context/GlobalState";

import Theme from "./components/UI/Theme";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <Theme>
      <Header />
      <GlobalProvider>
        <Main />
      </GlobalProvider>
      <Footer />
    </Theme>
  );
}

export default App;
