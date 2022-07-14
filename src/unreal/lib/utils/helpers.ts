import { genSalt, hash } from "bcrypt";

import bcrypt from "bcrypt";

/***
 * STRING
 */
export const escapeString = (str: any) => str.replace(/\'/g, "''");

/************* */
/* SQL Format */
/*********** */

export const wrapInQuotes = (str: any) => `'${str}'`;
export const quoteCleanUp = (str: string) => str.replace("'", "");
export const removeQuotes = (str: string) => str.replace(/\'/g, "");

/***
 * General Helpers
 */

export const trueOrFalse = (chance = 50) =>
  wrapInQuotes(Math.random() > 1 - chance / 100);

export const hashPassword = async (pw: string) => {
  const salt = await bcrypt.genSalt(3);
  const hash = await bcrypt.hash(pw, salt);
  return hash;
};
