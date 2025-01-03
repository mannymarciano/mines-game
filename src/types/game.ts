export interface GameState {
  blocks: boolean[];
  revealed: boolean[];
  gameOver: boolean;
  score: number;
  stake: number;
  multiplier: number;
  potentialPayout: number;
}

export interface GameSettings {
  gridSize: number;
  mineCount: number;
  baseMultiplier: number;
  riskFactor: number;
}