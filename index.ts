import Grid from "./models/Grid";
import Cell from "./models/Cell";
import Snake from "./models/Snake";

class Main {
  private static grid: Grid = Grid.getInstance(7, 7);
  private static snake: Snake = Snake.getInstance(Main.grid);

  private static printGrid(): void {
    const gameMap = this.grid.getMap();

    for (let i = 0; i < 30; i++) {
      console.log("\n");
    }

    for (let i = 0; i < this.grid.getHeight(); i++) {
      const row: String[] = [];

      for (let j = 0; j < this.grid.getWidth(); j++) {
        const cell: Cell = gameMap[i][j];

        if (!cell.getSnakeBlock()) {
          row.push(".");
        } else {
          row.push("-");
        }
      }

      console.log(row.join(""));
    }
  }
  public static run(): void {
    setInterval(() => {
      this.printGrid();
      this.snake.move();
    }, 200);
  }
}

Main.run();
