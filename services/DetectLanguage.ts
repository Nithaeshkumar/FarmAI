export const detectLanguage = (text: string) => {

  if (!text) return "english";

  // Tamil Unicode range
  if (/[\u0B80-\u0BFF]/.test(text)) return "tamil";

  // Telugu Unicode range
  if (/[\u0C00-\u0C7F]/.test(text)) return "telugu";

  // Hindi (Devanagari)
  if (/[\u0900-\u097F]/.test(text)) return "hindi";

  return "english";

};