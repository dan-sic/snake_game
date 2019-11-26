import Cell from "./Cell";
import Direction from "./enums/Direction";
import Grid from "./Grid";
import Snake from "./Snake";

export default class SnakeBlock {
  protected previousCell: Cell | null = null;
  protected currentCell: Cell;
  protected snakeInstance: Snake;

  private nextBlock: SnakeBlock | null = null;

  constructor(cell: Cell, snake: Snake) {
    this.currentCell = cell;
    this.snakeInstance = snake;
  }

  public goToNextCell(direction?: Direction, gridInstance?: Grid): void {
    if (this.nextBlock) {
      const nextCell: Cell | null = this.nextBlock.getPreviousCell();

      if (nextCell) {
        nextCell.setSnakeBlock(this);
        this.previousCell = this.currentCell;
        this.currentCell.removeSnakeBlockFromCell();
        this.currentCell = nextCell;
      }
    }
  }

  public setNextBlock(nextBlock: SnakeBlock): void {
    this.nextBlock = nextBlock;
  }

  public getPreviousCell(): Cell | null {
    return this.previousCell;
  }
}
