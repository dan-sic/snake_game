import SnakeBlock from "./SnakeBlock";

export default class Cell {
  private x: number;
  private y: number;
  private snakeBlock: SnakeBlock | null = null;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public setSnakeBlock(sb: SnakeBlock): void {
    this.snakeBlock = sb;
  }

  public getSnakeBlock(): SnakeBlock | null {
    return this.snakeBlock;
  }

  public removeSnakeBlockFromCell(): void {
    this.snakeBlock = null;
  }
}
