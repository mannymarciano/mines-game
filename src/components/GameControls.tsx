import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Trophy, Percent } from 'lucide-react';

interface GameControlsProps {
  stake: number;
  onStakeChange: (value: number) => void;
  potentialPayout: number;
  disabled: boolean;
  odds: number;
  multiplier: number;
  score: number;
  onNewGame: () => void;
}

export function GameControls({
  stake,
  onStakeChange,
  potentialPayout,
  disabled,
  odds,
  multiplier,
  score,
  onNewGame,
}: GameControlsProps) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm w-80 flex flex-col gap-6">
      <div className="text-3xl font-bold text-white text-center mb-4">
        Controls
      </div>
      
      {/* Score */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        className="bg-indigo-600/30 p-4 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <span className="text-4xl font-bold text-white">{score}</span>
        </div>
      </motion.div>

      {/* Stake Input */}
      <div className="bg-indigo-600/30 p-4 rounded-lg">
        <label className="text-white text-lg mb-2 block">Your Stake</label>
        <div className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-white" />
          <input
            type="number"
            min="0"
            step="0.1"
            value={stake}
            onChange={(e) => onStakeChange(Math.max(0, parseFloat(e.target.value) || 0))}
            disabled={disabled}
            className="bg-white/10 text-white text-2xl font-bold rounded-lg px-4 py-3 w-full
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Potential Win */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        className="bg-emerald-600/30 p-4 rounded-lg"
      >
        <div className="text-lg text-emerald-400 mb-1">Potential Win</div>
        <div className="text-3xl font-bold text-white">
          ${potentialPayout.toFixed(2)}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="bg-indigo-600/30 p-4 rounded-lg flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-white" />
            <span className="text-white">Odds</span>
          </div>
          <span className="text-2xl font-bold text-white">
            {(odds * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Multiplier</span>
          <span className="text-2xl font-bold text-emerald-400">
            {multiplier.toFixed(2)}x
          </span>
        </div>
      </div>

      {/* New Game Button */}
      <button
        onClick={onNewGame}
        className="w-full px-6 py-4 bg-indigo-600 text-white text-xl font-bold rounded-lg
                 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        New Game
      </button>
    </div>
  );
}