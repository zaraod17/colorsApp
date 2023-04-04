import React, { useEffect, useState } from "react";

import AddColorForm from "./components/AddColorForm/AddColorForm";
import FilterColorForm from "./components/FilterColorForm/FilterColorForm";
import ColorList from "./components/ColorsList/ColorList";

import { hexToRgb, hexToHsl } from "./utils/convert-methods";

interface ColorFilters {
  red: boolean;
  green: boolean;
  blue: boolean;
  saturation: boolean;
}

const App: React.FC = () => {
  const colors: { hex: string }[] = [
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
  ];
  const [storageColors, setStorageColors] = useState<Array<{ hex: string }>>(
    []
  );
  const [filteredColors, setFilteredColors] = useState<Array<{ hex: string }>>(
    []
  );
  const [filters, setFilters] = useState<ColorFilters>({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  useEffect(() => {
    let values: { hex: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key!);
      values.push({ hex: value! });
    }
    setStorageColors(values);
  }, []);

  useEffect(() => {
    setFilteredColors(colors.concat(storageColors));
  }, [storageColors]);

  useEffect(() => {
    const filtered = colors.concat(storageColors).filter((color) => {
      const { red, green, blue, saturation } = filters;
      const rgb = hexToRgb(color.hex);
      const hsl = hexToHsl(color.hex);

      if (red && rgb.r <= 127) {
        return false;
      }
      if (green && rgb.g <= 127) {
        return false;
      }
      if (blue && rgb.b <= 127) {
        return false;
      }
      if (saturation && hsl.saturation <= 0.5) {
        return false;
      }

      return true;
    });

    setFilteredColors(filtered);
  }, [filters]);

  const handleFilters = (filters: ColorFilters): void => {
    setFilters(filters);
    console.log(filters);
  };

  const handleAddColor = (color: string): void => {
    setStorageColors([...storageColors, { hex: color }]);
  };

  return (
    <>
      <div className="formsWrapper">
        <AddColorForm onAddColor={handleAddColor}></AddColorForm>
        <FilterColorForm onFilterColors={handleFilters}></FilterColorForm>
      </div>
      <ColorList colors={filteredColors} />
    </>
  );
};

export default App;
