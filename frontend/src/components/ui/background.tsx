import React from "react";

const filters = ["bg-blue-900", "bg-green-500", "bg-red-500"];

interface FilterProps {
  state: number;
}

const Filter: React.FC<FilterProps> = ({ state }) => {
  return (
    <div className={`absolute top-0 left-0 w-full h-full ${filters[state]} opacity-50`} />
  );
};

export default Filter;