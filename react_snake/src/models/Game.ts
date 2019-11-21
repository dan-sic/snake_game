export default class Game {
  private readonly INITIAL_PLAYER_LIVES = 3;
  private readonly INITIAL_PLAYER_POINTS = 0;
  private playerLives: number;
  private playerPoints: number;
  private static instance: Game;

  private constructor() {
    this.playerLives = this.INITIAL_PLAYER_LIVES;
    this.playerPoints = this.INITIAL_PLAYER_POINTS;
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      this.instance = new Game();
    }

    return this.instance;
  }

  public setplayerLives(lives: number): void {
    this.playerLives = lives;
  }

  public deductPlayerLife(): void {
    this.playerLives--;

    if (this.playerLives <= 0) {
      return;
    }

    this.setplayerPoints(0);
  }

  public getPlayerLives(): number {
    return this.playerLives;
  }

  public setplayerPoints(points: number): void {
    if (points > -1) {
      this.playerPoints = points;
    }
  }

  public addPlayerPoint(): void {
    this.playerPoints++;
  }

  public getPlayerPoints(): number {
    return this.playerPoints;
  }

  public startNewGame() {
    this.setplayerLives(this.INITIAL_PLAYER_LIVES);
    this.setplayerPoints(this.INITIAL_PLAYER_POINTS);
  }
}
