import newUser from "./entities/user";
import { insertMany, insertOne } from "./helpers/query";
import { DatabaseConnection } from "./db";

const TABLENAME = "users";

const createUsers = async (count: number, db: DatabaseConnection) => {
  console.log("[PROCESSING] CREATING USERS");

  let columnNames: any[] = [];

  let inserted = 0;

  const intervalId = setInterval(() => {
    console.log(`[+] ${inserted} users inserted to the database.`);
  }, 500);

  for (let i = 0; i < count; i++) {
    const user = await newUser();
    if (!columnNames.length) columnNames = Object.keys(user);

    const values = Object.values(user);

    try {
      const query = insertOne(TABLENAME, columnNames, values);

      await query.exec(db);
      inserted++;
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  console.log(`[COMPLETE] ${inserted} users inserted to the database.`);

  clearInterval(intervalId);

  return;
};

export default createUsers;
