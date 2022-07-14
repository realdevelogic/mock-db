export const RNG = (min: number = 1, max: number) =>
  Math.floor(Math.random() * (max - 1) + min);
export const randomFloat = (max: number, min = 0.01) =>
  Math.random() * (max - 1) + min;
