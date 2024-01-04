import "./App.css";
import React from "react";
import Deck from "./Deck";

function App() {
  console.log("Rendered App");
  return (
    <div className='App'>
      <Deck numDecks={1} />
    </div>
  );
}

export default App;
