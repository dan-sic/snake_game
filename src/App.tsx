import React from "react";
import GameMenu from "./components/GameMenu";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Snake</h1>
        <GameMenu />
      </React.Fragment>
    );
  }
}

export default App;
