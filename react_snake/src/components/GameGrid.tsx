import React from "react";

interface GameGridProps {
  generateTiles: () => JSX.Element[];
}

export const GameGrid: React.SFC<GameGridProps> = ({ generateTiles }) => {
  return <div className='grid'>{generateTiles()}</div>;
};
