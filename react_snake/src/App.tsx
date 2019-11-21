import React from "react";
import "./App.css";
import { Tile } from "./components/Tile";
import Grid from "./models/Grid";
import Snake from "./models/Snake";
import Cell from "./models/Cell";
import Direction from "./models/enums/Direction";
import GameMenu from "./components/GameMenu";

class App extends React.Component<{}, { map: Cell[][] }> {
  readonly GRID_HEIGHT = 40;
  readonly GRID_WIDTH = 40;
  grid: Grid;
  snake: Snake;
  snakeMovementTimeout: any;

  constructor(props: {}) {
    super(props);

    this.grid = Grid.getInstance(this.GRID_HEIGHT, this.GRID_WIDTH);
    this.snake = Snake.getInstance(this.grid);
    this.state = { map: this.grid.getMap() };
  }

  componentDidMount() {
    this.initializeSnakeMovement();
    this.listenToUserKeboardEvents();
  }

  initializeSnakeMovement() {
    let snakeSpeed = this.snake.getSnakeSpeed();

    let context = this;
    this.snakeMovementTimeout = setTimeout(function moveSnake() {
      context.snake.move();
      context.setState({ map: context.grid.getMap() });

      snakeSpeed = context.snake.getSnakeSpeed();

      context.snakeMovementTimeout = setTimeout(moveSnake, snakeSpeed);
    }, snakeSpeed);
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

  generateTiles: () => JSX.Element[] = () => {
    const gameMap = this.state.map;

    const tiles: JSX.Element[] = [];

    for (let i = 0; i < this.GRID_HEIGHT; i++) {
      for (let j = 0; j < this.GRID_WIDTH; j++) {
        const cell: Cell = gameMap[i][j];

        const isEmptyCell = !cell.getSnakeBlock() && !cell.getFlyBlock();
        const isCellWithSnake = cell.getSnakeBlock();
        const isCellWithFly = cell.getFlyBlock();

        if (isEmptyCell) {
          tiles.push(<Tile key={cell.getId()} color='transparent' />);
        } else if (isCellWithSnake) {
          tiles.push(<Tile key={cell.getId()} color='black' />);
        } else if (isCellWithFly) {
          tiles.push(<Tile key={cell.getId()} color='grey' />);
        }
      }
    }

    return tiles;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Snake</h1>
        <GameMenu generateTiles={this.generateTiles} />
      </React.Fragment>
    );
  }
}

export default App;
