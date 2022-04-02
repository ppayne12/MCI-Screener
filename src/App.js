import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import PatientModule from "./Components/PatientModule";
import ProviderModule from "./Components/ProviderModule";

function App() {
  const [tab, setTab] = React.useState("provider");

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar tab={tab} setTab={setTab} />
        {tab === "provider" ? <ProviderModule /> : <PatientModule />}
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
