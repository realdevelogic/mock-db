import { faker } from "@faker-js/faker";
import { RNG } from "./number";
import { escapeString, wrapInQuotes } from "./utils/helpers";

export const randomSentence = () =>
  wrapInQuotes(faker.lorem.paragraph(RNG(10, 1)));

export const randomDescription = (numWords: number) =>
  wrapInQuotes(escapeString(faker.lorem.sentence(numWords || 3)));
