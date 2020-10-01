import React from "react";
import "./App.css";
import Api from "./components/Api";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Api />
      </header>
    </div>
  );
};

export default App;
