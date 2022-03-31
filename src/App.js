import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [tab, setTab] = React.useState("provider");

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar tab={tab} setTab={setTab} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
