import React from "react";
import "./App.css";
import Filters from "./components/Filters";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Filters />
    </div>
  );
}

export default App;
