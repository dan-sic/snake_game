import React from "react";
import GameState from "../models/enums/GameState";

interface InstructionsPanelProps {
  gameState: GameState;
  playerPoints: number;
}

export const InstructionsPanel: React.SFC<InstructionsPanelProps> = ({
  gameState,
  playerPoints
}) => {
  switch (gameState) {
    case GameState.START:
      return (
        <div className='instructions-panel'>
          <div className='instructions'>
            <p className='highlighted-paragraph'>
              Press SPACE to start new game
            </p>
            <p>Use WSAD keys to navigate snake</p>
            <p>Use SPACE to pause running game</p>
          </div>
        </div>
      );
    case GameState.PAUSED:
      return (
        <div className='instructions-panel'>
          <div className='instructions'>
            <p className='highlighted-paragraph'>Game Paused</p>
            <p>Press SPACE to continue game</p>
          </div>
        </div>
      );
    case GameState.GAME_OVER:
      return (
        <div className='instructions-panel'>
          <div className='instructions'>
            <p className='highlighted-paragraph'>Game Over</p>
            <p className='highlighted-paragraph'>
              You've collected {playerPoints} points
            </p>
            <p>Press SPACE to play again</p>
          </div>
        </div>
      );
    default:
      return null;
  }
};
