import { DatabaseConnection } from "./db";
import unreal from "./unreal";
import { insertMany, insertOne } from "./helpers/query";
import { RNG } from "./unreal/lib/number";
import { randomSQLPastDate } from "./unreal/lib/date";

const createComments = async (
  count: number,
  userIds: (string | any)[],
  productIds: (string | any)[],
  db: DatabaseConnection
) => {
  let inserted = 0;

  const intervalId = setInterval(() => {
    console.log(`[+] ${inserted} user comments inserted to the database.`);
  }, 500);

  for (let i = 0; i < count; i++) {
    const content = unreal.text.randomSentence();

    const randomProductIdIndex = RNG(0, productIds.length);
    const productId = productIds[randomProductIdIndex];

    const randomUserIndex = unreal.number.RNG(0, userIds.length);
    const userId = userIds[randomUserIndex];

    const values = [
      userId,
      productId,
      content,
      randomSQLPastDate(2000, 0),
      randomSQLPastDate(100, 0),
    ];

    const query = insertOne(
      "user_comments",
      ["user_id", "product_id", "content", "created_at", "edited_at"],
      values
    );

    try {
      await query.exec(db);
      inserted++;
    } catch (err) {
      console.error(err);
    }
  }

  console.log(`[COMPLETE] ${inserted} user comments inserted to the database.`);

  clearInterval(intervalId);

  return;
};

export default createComments;
