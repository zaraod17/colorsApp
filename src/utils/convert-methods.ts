interface RGB {
  r: number;
  g: number;
  b: number;
}

export const hexToRgb = (hex: string): RGB => {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return { r, g, b };
};

export const hexToHsl = (
  hex: string
): { hue: number; saturation: number; lightness: number } => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  let hue = 0;
  let saturation = 0;
  let lightness = (max + min) / 2;

  if (chroma !== 0) {
    switch (max) {
      case r:
        hue = ((g - b) / chroma) % 6;
        break;
      case g:
        hue = (b - r) / chroma + 2;
        break;
      case b:
        hue = (r - g) / chroma + 4;
        break;
    }

    hue = Math.round(hue * 60);

    if (hue < 0) hue += 360;

    saturation = ((2 * chroma) / (1 - Math.abs(2 * lightness - 1))) * 100;
    saturation = Math.round(saturation);
  }

  lightness = Math.round(lightness * 100);

  //   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return { hue, saturation, lightness };
};
