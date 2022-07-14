import { faker } from "@faker-js/faker";
import { recentDate } from "./date";
import { RNG } from "./number";
import { escapeString, hashPassword, wrapInQuotes } from "./utils/helpers";

export const userName = (firstName: any, lastName: any) =>
  wrapInQuotes(faker.internet.userName(firstName, lastName));
export const firstName = () =>
  wrapInQuotes(escapeString(faker.name.firstName()));
export const lastName = () => wrapInQuotes(escapeString(faker.name.lastName()));
export const email = () => wrapInQuotes(faker.internet.email());
export const birthday = (
  since: Date = new Date(1943, 0, 1),
  upUntil = recentDate()
) => {
  return wrapInQuotes(
    faker.date.between(since.toISOString(), upUntil.toISOString()).toISOString()
  );
};
export const phoneNumber = () =>
  wrapInQuotes(faker.phone.number().split("x")[0]);
export const hashedPassword = async () =>
  wrapInQuotes(await hashPassword(faker.internet.password()));
export const nationalCode = (min: any, max: any) => RNG(min, max);
