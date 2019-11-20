import React from "react";
import "./App.css";
import { Tile } from "./components/Tile";
import Grid from "./models/Grid";
import Snake from "./models/Snake";
import Cell from "./models/Cell";

class App extends React.Component {
  state: { grid: Grid } = {
    grid: Grid.getInstance(20, 20)
  };

  componentDidMount() {
    this.setState({ ...this.state, snake: Snake.getInstance(this.state.grid) });
  }

  generateTiles() {
    const gameMap = this.state.grid.getMap();

    const tiles = [];

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const cell: Cell = gameMap[i][j];

        if (!cell.getSnakeBlock()) {
          tiles.push(<Tile key={cell.getId()} color='yellow' />);
        } else {
          tiles.push(<Tile key={cell.getId()} color='red' />);
        }
      }
    }

    return tiles;
  }

  render() {
    return <div className='grid'>{this.generateTiles()}</div>;
  }
}

export default App;
