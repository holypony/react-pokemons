export const capitalize = (text: string): string => {
  if (text === null) {
    return "";
  }
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalizedText;
};
