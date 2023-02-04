//to shuffle the answers so that the correct answer will not be in the same place

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);