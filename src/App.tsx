import React, { useState } from "react";

import AddColorForm from "./components/AddColorForm/AddColorForm";
import FilterColorForm from "./components/FilterColorForm/FilterColorForm";
import ColorList from "./components/ColorsList/ColorList";

const App: React.FC = () => {
  const [colors, setColor] = useState<Array<{ hex: string }>>([
    {
      hex: "#888888",
    },
    {
      hex: "#77F921",
    },
    {
      hex: "#21F9F7",
    },
    {
      hex: "#CD21F9",
    },
    {
      hex: "#F90C63",
    },
    {
      hex: "#611313",
    },
    {
      hex: "#FBAA17",
    },
  ]);

  const handleFilters = (): void => {};

  const handleAddColor = (color: string): void => {
    setColor([...colors, { hex: color }]);
  };

  return (
    <>
      <div className="formsWrapper">
        <AddColorForm onAddColor={handleAddColor}></AddColorForm>
        <FilterColorForm onFilterColors={handleFilters}></FilterColorForm>
      </div>
      <ColorList colors={colors} />
    </>
  );
};

export default App;
