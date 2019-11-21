import React, { Component } from "react";
import GameInfo from "./GameInfo";
import { GameGrid } from "./GameGrid";

interface GameMenuProps {
  generateTiles: () => JSX.Element[];
}

export default class GameMenu extends Component<GameMenuProps, {}> {
  render() {
    return (
      <div className='game-container'>
        <GameInfo />
        <GameGrid generateTiles={this.props.generateTiles} />
      </div>
    );
  }
}
