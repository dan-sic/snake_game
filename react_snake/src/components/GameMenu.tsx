import React, { Component } from "react";
import { Tile } from "../components/Tile";
import Grid from "../models/Grid";
import Snake from "../models/Snake";
import Cell from "../models/Cell";
import Direction from "../models/enums/Direction";
import Game from "../models/Game";
import { GameInfo } from "./GameInfo";
import { GameGrid } from "./GameGrid";
import { InstructionsPanel } from "./InstructionsPanel";
import GameState from "../models/enums/GameState";

export default class GameMenu extends Component<
  {},
  {
    map: Cell[][];
    playerPoints: number;
    playerLives: number;
    gameState: GameState;
  }
> {
  readonly GRID_HEIGHT = 40;
  readonly GRID_WIDTH = 40;
  game: Game;
  grid: Grid;
  snake: Snake;
  snakeMovementTimeout: any;
  gameLoop: any;

  constructor(props: {}) {
    super(props);

    this.game = Game.getInstance();
    this.grid = Grid.getInstance(this.GRID_HEIGHT, this.GRID_WIDTH);
    this.snake = Snake.getInstance(this.grid);
    this.game = Game.getInstance();

    this.state = {
      map: this.grid.getMap(),
      playerPoints: this.game.getPlayerPoints(),
      playerLives: this.game.getPlayerLives(),
      gameState: GameState.START
    };
  }

  componentDidMount() {
    this.listenToUserKeboardEvents();
  }

  initializeGameLoop() {
    this.setState({ ...this.state, gameState: GameState.PLAYING });

    let snakeSpeed = this.snake.getSnakeSpeed();

    let context = this;
    this.gameLoop = setTimeout(function runGame() {
      if (context.game.getPlayerLives() <= 0) {
        context.gameOver();
        return;
      }

      context.snake.move();
      context.setState({
        map: context.grid.getMap(),
        playerLives: context.game.getPlayerLives(),
        playerPoints: context.game.getPlayerPoints()
      });

      snakeSpeed = context.snake.getSnakeSpeed();

      context.gameLoop = setTimeout(runGame, snakeSpeed);
    }, snakeSpeed);
  }

  gameOver() {
    clearTimeout(this.gameLoop);
    this.setState({ ...this.state, gameState: GameState.GAME_OVER });
  }

  pauseGameLoop() {
    clearTimeout(this.gameLoop);
    this.setState({ ...this.state, gameState: GameState.PAUSED });
  }

  toogleGameLoop() {
    if (this.state.gameState === GameState.PLAYING) {
      this.pauseGameLoop();
    } else if (this.state.gameState === GameState.GAME_OVER) {
      this.game.startNewGame();
      this.initializeGameLoop();
    } else {
      this.initializeGameLoop();
    }
  }

  listenToUserKeboardEvents() {
    document.addEventListener("keypress", e => {
      if (e.code === "Space") {
        this.toogleGameLoop();
      }

      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.snake.changeDirection(Direction.UP);
      }

      if (e.code === "KeyS" || e.code === "ArrowDown") {
        this.snake.changeDirection(Direction.DOWN);
      }

      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        this.snake.changeDirection(Direction.LEFT);
      }

      if (e.code === "KeyD" || e.code === "ArrowRight") {
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
      <div className='game-container'>
        <InstructionsPanel
          gameState={this.state.gameState}
          playerPoints={this.state.playerPoints}
        />
        <GameInfo
          playerPoints={this.state.playerPoints}
          playerLives={this.state.playerLives}
        />
        <GameGrid generateTiles={this.generateTiles} />
      </div>
    );
  }
}
