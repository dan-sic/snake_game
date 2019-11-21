import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function GameInfo() {
  return (
    <div className='game-info-container'>
      <span>
        <FontAwesomeIcon icon={faStar} className='star' /> 0
      </span>
      <span>
        <FontAwesomeIcon icon={faHeart} className='heart' /> 3
      </span>
    </div>
  );
}
