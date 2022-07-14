import { faker } from "@faker-js/faker";
import { wrapInQuotes } from "./utils/helpers";

export const randomAbstractImage = () => {
  return wrapInQuotes(faker.image.abstract(400, 300, true));
};
