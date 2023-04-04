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

interface Color {
  id: string;
  hex: string;
}

const App: React.FC = () => {
  const colors: Color[] = [
    {
      id: "1",
      hex: "#888888",
    },
    {
      id: "2",
      hex: "#77F921",
    },
    {
      id: "3",
      hex: "#21F9F7",
    },
    {
      id: "4",
      hex: "#CD21F9",
    },
    {
      id: "5",
      hex: "#F90C63",
    },
    {
      id: "6",
      hex: "#611313",
    },
    {
      id: "7",
      hex: "#FBAA17",
    },
  ];
  const [storageColors, setStorageColors] = useState<Array<Color>>([]);
  const [filteredColors, setFilteredColors] = useState<Array<Color>>([]);
  const [filters, setFilters] = useState<ColorFilters>({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  useEffect(() => {
    let values: { id: string; hex: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key!);
      values.push({ id: value!, hex: value! });
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

    const sorted = filtered.sort((a, b) => {
      const rgbA = hexToRgb(a.hex);
      const rgbB = hexToRgb(b.hex);
      if (rgbA.r !== rgbB.r) {
        return rgbB.r - rgbA.r;
      }
      if (rgbA.g !== rgbB.g) {
        return rgbB.g - rgbA.g;
      }
      if (rgbA.b !== rgbB.b) {
        return rgbB.b - rgbA.b;
      }
      return 0;
    });

    setFilteredColors(sorted);
  }, [filters]);

  const handleFilters = (filters: ColorFilters): void => {
    setFilters(filters);
    console.log(filters);
  };

  const handleAddColor = (id: string, color: string): void => {
    setStorageColors([...storageColors, { id: color, hex: color }]);
  };

  const removeColorHandler = (color: Color): void => {
    localStorage.removeItem(color.id);
    const filtered = filteredColors.filter((c) => c.id !== color.id);
    setFilteredColors(filtered);
  };

  return (
    <>
      <div className="formsWrapper">
        <AddColorForm onAddColor={handleAddColor}></AddColorForm>
        <FilterColorForm onFilterColors={handleFilters}></FilterColorForm>
      </div>
      <ColorList onRemoveColor={removeColorHandler} colors={filteredColors} />
    </>
  );
};

export default App;
