import { RNG } from "./number";
import { wrapInQuotes } from "./utils/helpers";

export const recentDate = () => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
    RNG(1, 24),
    RNG(1, 60),
    RNG(1, 60)
  );
};

export const randomSQLPastDate = (max: number, min: number = 1) =>
  `NOW() - interval '${RNG(max || 365, min || 1)} days'`;
