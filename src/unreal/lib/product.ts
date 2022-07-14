import { faker } from "@faker-js/faker";
import { escapeString, wrapInQuotes } from "./utils/helpers";

export const productName = () => wrapInQuotes(faker.commerce.productName());

export const productDescription = () =>
  wrapInQuotes(escapeString(faker.commerce.productDescription()));

export const productLongDescription = () =>
  wrapInQuotes(escapeString(faker.commerce.productDescription()));

export const productImage = () =>
  wrapInQuotes(faker.image.abstract(800, 600, true));

export const productThumb = () =>
  wrapInQuotes(faker.image.abstract(200, 150, true));

export const companyName = () => wrapInQuotes(faker.company.companyName());
