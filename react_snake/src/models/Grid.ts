import Cell from "./Cell";
import Snake from "./Snake";
import SnakeBlock from "./SnakeBlock";
import SnakeHead from "./SnakeHead";
import FlyBlock from "./FlyBlock";

export default class Grid {
  private width: number;
  private height: number;
  private map: Cell[][] = [];
  private static instance: Grid;

  private constructor(width: number, height: number) {
    if (width < 6 || height < 6) {
      throw new Error("Grid must be at least 6 x 6");
    }

    this.width = width;
    this.height = height;
    this.generateGrid();
  }

  public static getInstance(width: number, height: number): Grid {
    if (!Grid.instance) {
      this.instance = new Grid(width, height);
    }

    return this.instance;
  }

  public getCell(x: number, y: number): Cell {
    return this.map[y][x];
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getMap(): Cell[][] {
    return this.map;
  }

  private generateGrid(): void {
    let cellId: number = 1;

    for (let i = 0; i < this.height; i++) {
      this.map[i] = [];

      for (let j = 0; j < this.width; j++) {
        const cell = new Cell(j, i, cellId);
        this.map[i][j] = cell;

        cellId++;
      }
    }

    this.insertSnake();
    this.insertFly();
    this.insertFly();
  }

  private insertSnake(): void {
    const snake = Snake.getInstance(this);

    const gridMiddleHeigth = Math.ceil(this.height / 2);
    const gridMiddleWidth = Math.ceil(this.width / 2);
    const numberOfSnakeBlocks = 5;

    for (let i = 0; i < numberOfSnakeBlocks; i++) {
      const cell: Cell = this.map[gridMiddleHeigth - 1][
        gridMiddleWidth - 1 - i
      ];

      let snakeBlock;

      if (i === 0) {
        snakeBlock = new SnakeHead(cell);
      } else {
        snakeBlock = new SnakeBlock(cell);
      }

      cell.setSnakeBlock(snakeBlock);

      snake.addSnakeBlock(snakeBlock);
    }
  }

  insertFly() {
    let isSelectedCellValid = false;

    while (!isSelectedCellValid) {
      const randomColNum: number = Math.floor(Math.random() * (this.width - 1));
      const randomRowNum: number = Math.floor(
        Math.random() * (this.height - 1)
      );

      const selectedCell: Cell = this.map[randomRowNum][randomColNum];

      isSelectedCellValid =
        selectedCell.getSnakeBlock() === null &&
        selectedCell.getFlyBlock() === null;

      if (isSelectedCellValid) {
        selectedCell.setFlyBlock(new FlyBlock(selectedCell));
      }
    }
  }
}
