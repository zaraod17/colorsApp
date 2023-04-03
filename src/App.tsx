import React, { useState } from "react";

import AddColorForm from "./components/AddColorForm/AddColorForm";
import FilterColorForm from "./components/FilterColorForm/FilterColorForm";

const App: React.FC = () => {
  const [colors, setColors] = useState<Array<{ color: string }>>([
    {
      color: "#888888",
    },
  ]);

  const handleFilters = (): void => {};

  const handleAddColor = (): void => {};

  return (
    <>
      <div className="formsWrapper">
        <AddColorForm onAddColor={handleAddColor}></AddColorForm>
        <FilterColorForm onFilterColors={handleFilters}></FilterColorForm>
      </div>
    </>
  );
};

export default App;
