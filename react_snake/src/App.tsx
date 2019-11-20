import React from "react";
import "./App.css";
import { Tile } from "./components/Tile";
import Grid from "./models/Grid";
import Snake from "./models/Snake";
import Cell from "./models/Cell";
import Direction from "./models/enums/Direction";

class App extends React.Component<{}, { map: Cell[][] }> {
  grid: Grid;
  snake: Snake;

  constructor(props: {}) {
    super(props);

    this.grid = Grid.getInstance(20, 20);
    this.snake = Snake.getInstance(this.grid);
    this.state = { map: this.grid.getMap() };
  }

  componentDidMount() {
    this.initializeSnakeMovement();
    this.listenToUserKeboardEvents();
  }

  initializeSnakeMovement() {
    setInterval(() => {
      // this.printGrid();
      // this.changeDirectionRandomly();
      this.snake.move();
      this.setState({ map: this.grid.getMap() });
    }, 150);
  }

  listenToUserKeboardEvents() {
    document.addEventListener("keypress", e => {
      if (e.key === "w" || e.key === "ArrowUp") {
        this.snake.changeDirection(Direction.UP);
      }

      if (e.key === "s" || e.key === "ArrowDown") {
        this.snake.changeDirection(Direction.DOWN);
      }

      if (e.key === "a" || e.key === "ArrowLeft") {
        this.snake.changeDirection(Direction.LEFT);
      }

      if (e.key === "d" || e.key === "ArrowRight") {
        this.snake.changeDirection(Direction.RIGHT);
      }

      this.setState({ map: this.grid.getMap() });
    });
  }

  generateTiles() {
    const gameMap = this.state.map;

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
