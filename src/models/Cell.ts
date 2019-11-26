import SnakeBlock from "./SnakeBlock";
import FlyBlock from "./FlyBlock";

export default class Cell {
  private id: number;
  private x: number;
  private y: number;
  private snakeBlock: SnakeBlock | null = null;
  private flyBlock: FlyBlock | null = null;

  public constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
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

  public setFlyBlock(fb: FlyBlock): void {
    this.flyBlock = fb;
  }

  public getFlyBlock(): FlyBlock | null {
    return this.flyBlock;
  }

  public removeSnakeBlockFromCell(): void {
    this.snakeBlock = null;
  }

  public removeFlyBlockFromCell(): void {
    this.flyBlock = null;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}
