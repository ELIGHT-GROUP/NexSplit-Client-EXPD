// Utility function to generate background gradients based on text
export const generateGradientFromText = (text: string) => {
  // Convert text to lowercase and get unique characters
  const uniqueChars = [...new Set(text.toLowerCase())];

  // Predefined color palettes for gradients - Green, Yellow, Orange focused
  const colorPalettes = [
    ["#00AA5B", "#FFD700", "#FF8C00"], // Green to Gold to Orange
    ["#32CD32", "#FFA500", "#FF6347"], // Lime Green to Orange to Tomato
    ["#228B22", "#FFD700", "#FFA500"], // Forest Green to Gold to Orange
    ["#00AA5B", "#FFE135", "#FF8C00"], // Green to Yellow to Orange
    ["#90EE90", "#FFD700", "#FF7F50"], // Light Green to Gold to Coral
    ["#00AA5B", "#FFA500", "#FF4500"], // Green to Orange to Red Orange
    ["#32CD32", "#FFE135", "#FF8C00"], // Lime to Yellow to Orange
    ["#228B22", "#FFA500", "#FF6347"], // Forest Green to Orange to Tomato
    ["#00AA5B", "#FFD700", "#FF7F50"], // Green to Gold to Coral
    ["#90EE90", "#FFE135", "#FF8C00"], // Light Green to Yellow to Orange
    ["#32CD32", "#FFA500", "#FF4500"], // Lime to Orange to Red Orange
    ["#00AA5B", "#FFE135", "#FF6347"], // Green to Yellow to Tomato
    ["#228B22", "#FFD700", "#FF7F50"], // Forest Green to Gold to Coral
    ["#90EE90", "#FFA500", "#FF4500"], // Light Green to Orange to Red Orange
  ];

  // Generate a consistent index based on text characters
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use absolute value and modulo to get a valid palette index
  const paletteIndex = Math.abs(hash) % colorPalettes.length;
  const selectedPalette = colorPalettes[paletteIndex];

  // Create gradient colors based on text length and characters
  let colors: string[] = [];

  if (uniqueChars.length >= 3) {
    // Use first 3 unique characters to determine colors
    colors = [selectedPalette[0], selectedPalette[1], selectedPalette[2]];
  } else if (uniqueChars.length === 2) {
    // Use first 2 unique characters
    colors = [selectedPalette[0], selectedPalette[1]];
  } else {
    // Single character or empty text
    colors = [selectedPalette[0], selectedPalette[1]];
  }

  return {
    colors,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 }, // Diagonal gradient
    locations: [0, 0.5, 1],
  };
};

// Alternative function for horizontal gradients
export const generateHorizontalGradientFromText = (text: string) => {
  const gradient = generateGradientFromText(text);
  return {
    ...gradient,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 }, // Horizontal gradient
  };
};

// Function to get a single color from text (for fallback)
export const getColorFromText = (text: string) => {
  const gradient = generateGradientFromText(text);
  return gradient.colors[0];
};
