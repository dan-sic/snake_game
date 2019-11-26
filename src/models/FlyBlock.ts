import Cell from "./Cell";

export default class FlyBlock {
  private currentCell: Cell;

  constructor(cell: Cell) {
    this.currentCell = cell;
  }
}
