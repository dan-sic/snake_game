import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

interface GameInfoProps {
  playerPoints: number;
  playerLives: number;
}

export const GameInfo: React.SFC<GameInfoProps> = ({
  playerPoints,
  playerLives
}) => {
  return (
    <div className='game-info-container'>
      <span>
        <FontAwesomeIcon icon={faStar} className='star' /> {playerPoints}
      </span>
      <span>
        <FontAwesomeIcon icon={faHeart} className='heart' /> {playerLives}
      </span>
    </div>
  );
};
