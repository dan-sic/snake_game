import Grid from "./models/Grid";
import Cell from "./models/Cell";
import Snake from "./models/Snake";
import Direction from "./models/enums/Direction";
import Direciton from "./models/enums/Direction";

class Main {
  private static grid: Grid = Grid.getInstance(20, 20);
  private static snake: Snake = Snake.getInstance(Main.grid);
  private static directionChangeCounter: number = 0;

  private static changeDirectionRandomly(): void {
    if (this.directionChangeCounter < 5) {
      this.directionChangeCounter++;
      return;
    }

    const randomNumInRange1_4: number = Math.floor(Math.random() * 4 + 1);
    const possibleDirections = [
      Direction.UP,
      Direciton.DOWN,
      Direciton.LEFT,
      Direciton.RIGHT
    ];

    this.snake.changeDirection(possibleDirections[randomNumInRange1_4 - 1]);

    this.directionChangeCounter = 0;
  }

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
      this.changeDirectionRandomly();
      this.snake.move();
    }, 200);
  }
}

Main.run();
