import React from "react";

interface TileProps {
  color: string;
}

export const Tile: React.SFC<TileProps> = ({ color }) => {
  return <div className='tile' style={{ backgroundColor: color }}></div>;
};
