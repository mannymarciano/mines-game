import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Block } from './Block';
import { GameControls } from './GameControls';
import { GameState, GameSettings } from '../types/game';
import { calculateOdds, calculateMultiplier, calculatePotentialPayout } from '../utils/gameCalculations';
import { playGameSound } from '../utils/audio';

const GAME_SETTINGS: GameSettings = {
  gridSize: 25,
  mineCount: 5,
  baseMultiplier: 1.2,
  riskFactor: 0.1,
};

const initialGameState = (settings: GameSettings): GameState => ({
  blocks: Array(settings.gridSize)
    .fill(false)
    .map(() => Math.random() >= settings.mineCount / settings.gridSize),
  revealed: Array(settings.gridSize).fill(false),
  gameOver: false,
  score: 0,
  stake: 1.0,
  multiplier: settings.baseMultiplier,
  potentialPayout: settings.baseMultiplier,
});

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(() => 
    initialGameState(GAME_SETTINGS)
  );

  const revealedCount = gameState.revealed.filter(Boolean).length;
  const currentOdds = calculateOdds(
    GAME_SETTINGS.gridSize,
    GAME_SETTINGS.mineCount,
    revealedCount
  );

  const handleStakeChange = useCallback((newStake: number) => {
    setGameState(prev => ({
      ...prev,
      stake: newStake,
      potentialPayout: calculatePotentialPayout(newStake, prev.multiplier),
    }));
  }, []);

  const handleBlockClick = useCallback((index: number) => {
    if (gameState.revealed[index] || gameState.gameOver) return;

    const newRevealed = [...gameState.revealed];
    newRevealed[index] = true;

    if (gameState.blocks[index]) {
      // Found a gem
      playGameSound('gem');
      const newScore = gameState.score + 1;
      const newMultiplier = calculateMultiplier(
        GAME_SETTINGS.baseMultiplier,
        GAME_SETTINGS.riskFactor,
        newScore
      );

      setGameState(prev => ({
        ...prev,
        revealed: newRevealed,
        score: newScore,
        multiplier: newMultiplier,
        potentialPayout: calculatePotentialPayout(prev.stake, newMultiplier),
      }));
    } else {
      // Found a ruby - game over
      playGameSound('ruby');
      setGameState(prev => ({
        ...prev,
        revealed: newRevealed,
        gameOver: true,
      }));
    }
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState(GAME_SETTINGS));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <div className="flex gap-8 items-center max-w-7xl">
        <GameControls
          stake={gameState.stake}
          onStakeChange={handleStakeChange}
          potentialPayout={gameState.potentialPayout}
          disabled={gameState.gameOver || revealedCount > 0}
          odds={currentOdds}
          multiplier={gameState.multiplier}
          score={gameState.score}
          onNewGame={resetGame}
        />

        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Mines Game
          </h1>
          
          <div className="grid grid-cols-5 gap-4 mb-8">
            {gameState.blocks.map((isGem, index) => (
              <Block
                key={index}
                revealed={gameState.revealed[index]}
                isGem={isGem}
                onClick={() => handleBlockClick(index)}
                disabled={gameState.gameOver}
              />
            ))}
          </div>

          {gameState.gameOver && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-red-500"
            >
              Game Over!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}