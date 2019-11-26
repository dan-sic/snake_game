import SnakeBlock from "./SnakeBlock";
import Cell from "./Cell";
import Direction from "./enums/Direction";
import Grid from "./Grid";
import Snake from "./Snake";

export default class SnakeHead extends SnakeBlock {
  private nextCell: Cell | null = null;

  constructor(cell: Cell, snake: Snake) {
    super(cell, snake);
    this.currentCell = cell;
  }

  public goToNextCell(direction: Direction, gridInstance: Grid): void {
    if (this.nextCell!.getFlyBlock()) {
      this.snakeInstance.eatFly(this.nextCell!);
    }

    if (this.nextCell!.getSnakeBlock()) {
      this.snakeInstance.crashIntoTail();
    }

    this.nextCell!.setSnakeBlock(this);
    this.previousCell = this.currentCell;
    this.currentCell.removeSnakeBlockFromCell();

    this.currentCell = this.nextCell!;

    this.setNextCellForHeadBasedOnDirection(direction, gridInstance);
  }

  public setNextCellForHeadBasedOnDirection(
    direction: Direction,
    gridInstance: Grid
  ): void {
    const currentHeadPosX: number = this.currentCell.getX();
    const currentHeadPosY: number = this.currentCell.getY();

    let nextCellPosX: number;
    let nextCellPosY: number;

    switch (direction) {
      case Direction.RIGHT: {
        nextCellPosX = currentHeadPosX + 1;

        if (nextCellPosX > gridInstance.getWidth() - 1) {
          nextCellPosX = currentHeadPosX - gridInstance.getWidth() + 1;
        }
        nextCellPosY = currentHeadPosY;
        break;
      }
      case Direction.DOWN: {
        nextCellPosX = currentHeadPosX;
        nextCellPosY = currentHeadPosY + 1;

        if (nextCellPosY > gridInstance.getHeight() - 1) {
          nextCellPosY = currentHeadPosY - gridInstance.getHeight() + 1;
        }

        break;
      }
      case Direction.LEFT: {
        nextCellPosX = currentHeadPosX - 1;

        if (nextCellPosX < 0) {
          nextCellPosX = currentHeadPosX + gridInstance.getWidth() - 1;
        }

        nextCellPosY = currentHeadPosY;

        break;
      }
      case Direction.UP: {
        nextCellPosX = currentHeadPosX;
        nextCellPosY = currentHeadPosY - 1;

        if (nextCellPosY < 0) {
          nextCellPosY = currentHeadPosY + gridInstance.getHeight() - 1;
        }

        break;
      }
      default: {
        nextCellPosX = currentHeadPosX;
        nextCellPosY = currentHeadPosY;
        break;
      }
    }

    const nextCell = gridInstance.getCell(nextCellPosX, nextCellPosY);
    this.nextCell = nextCell;
  }
}
