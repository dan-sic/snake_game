import SnakeBlock from "./SnakeBlock";
import Direction from "./enums/Direction";
import Grid from "./Grid";
import SnakeHead from "./SnakeHead";
import Cell from "./Cell";
import Game from "./Game";

export default class Snake {
  private static instance: Snake;
  private snakeBlocks: Array<SnakeBlock> = [];
  private direction: Direction = Direction.RIGHT;
  private gridInstance: Grid;
  private gameInstance: Game;
  private appendNewSnakeBlock = false;
  private snakeSpeed = 130;

  private constructor(grid: Grid) {
    this.gridInstance = grid;
    this.gameInstance = Game.getInstance();
  }

  public static getInstance(grid: Grid): Snake {
    if (!Snake.instance) {
      this.instance = new Snake(grid);
    }

    return this.instance;
  }

  public getSnakeSpeed(): number {
    return this.snakeSpeed;
  }

  public addSnakeBlock(block: SnakeBlock): void {
    if (block instanceof SnakeHead) {
      block.setNextCellForHeadBasedOnDirection(
        this.direction,
        this.gridInstance
      );
    } else {
      const lastSnakeBlock: SnakeBlock = this.snakeBlocks[
        this.snakeBlocks.length - 1
      ];

      block.setNextBlock(lastSnakeBlock);
    }

    this.snakeBlocks.push(block);
  }

  public move(): void {
    this.snakeBlocks.forEach(block => {
      block.goToNextCell(this.direction, this.gridInstance);
    });

    if (this.appendNewSnakeBlock) {
      this.appendSnakeBlock();

      this.snakeSpeed -= 2;

      this.appendNewSnakeBlock = false;
    }
  }

  public changeDirection(newDirection: Direction): void {
    if (newDirection === Direction.RIGHT && this.direction === Direction.LEFT)
      return;
    if (newDirection === Direction.LEFT && this.direction === Direction.RIGHT)
      return;

    if (newDirection === Direction.UP && this.direction === Direction.DOWN)
      return;
    if (newDirection === Direction.DOWN && this.direction === Direction.UP)
      return;

    this.direction = newDirection;
  }

  public eatFly(cell: Cell) {
    this.gameInstance.addPlayerPoint();

    cell.removeFlyBlockFromCell();
    this.gridInstance.insertFly();

    this.appendNewSnakeBlock = true;
  }

  public crashIntoTail() {
    this.gameInstance.deductPlayerLife();

    this.resetSnake();

    this.gridInstance.restartGrid();
  }

  private resetSnake() {
    this.snakeBlocks = [];
    this.direction = Direction.RIGHT;
    this.snakeSpeed = 130;
  }

  private appendSnakeBlock() {
    const lastSnakeBlock = this.snakeBlocks[this.snakeBlocks.length - 1];
    const lastSnakeBlockPreviousCell = lastSnakeBlock.getPreviousCell();

    if (lastSnakeBlockPreviousCell) {
      const newSnakeBlock = new SnakeBlock(lastSnakeBlockPreviousCell, this);
      newSnakeBlock.setNextBlock(lastSnakeBlock);

      lastSnakeBlockPreviousCell.setSnakeBlock(newSnakeBlock);

      this.addSnakeBlock(newSnakeBlock);
    }
  }
}
