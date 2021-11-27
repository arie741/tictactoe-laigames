import React, { FC } from "react";
import TicTacComponent from "./components/TicTacComponent";

const App: FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>Tic Tac Toe</h1>
        <TicTacComponent ai={true}/>
      </div>
    </div>
  );
};

export default App;
