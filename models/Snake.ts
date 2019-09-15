import SnakeBlock from "./SnakeBlock";
import Direction from "./enums/Direction";
import Grid from "./Grid";
import SnakeHead from "./SnakeHead";

export default class Snake {
  private static instance: Snake;
  private snakeBlocks: Array<SnakeBlock> = [];
  private direction: Direction = Direction.RIGHT;
  private gridInstance: Grid;

  private constructor(grid: Grid) {
    this.gridInstance = grid;
  }

  public static getInstance(grid: Grid): Snake {
    if (!Snake.instance) {
      this.instance = new Snake(grid);
    }

    return this.instance;
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
  }
}
