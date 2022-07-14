import fs from "fs/promises";
import path from "path";
import { DatabaseConnection } from "./db";

const readQueryFile = async (name: string) => ({
  name,
  content: await fs.readFile(
    path.join(__dirname, "schemafiles", name),
    "utf-8"
  ),
});

async function createDatabaseTables(db: DatabaseConnection) {
  console.log("[PROCESSING] CREATING TABLES");

  const sqlFiles = [
    // await readQueryFile("admins.sql"),
    await readQueryFile("users.sql"),
    // await readQueryFile("userAddresses.sql"),
    await readQueryFile("productBrands.sql"),
    await readQueryFile("productCategories.sql"),
    await readQueryFile("products.sql"),
    await readQueryFile("userComments.sql"),
    // await readQueryFile("userFavorites.sql"),
    // await readQueryFile("productImages.sql"),
    // await readQueryFile("productInventory.sql"),
    // await readQueryFile("productRating.sql"),
    // await readQueryFile("productViews.sql"),
    // await readQueryFile("orders.sql"),
    // await readQueryFile("orderDetails.sql"),
  ];

  for (let sqlFile of sqlFiles) {
    console.log(sqlFile.content);

    const result = await db.query(sqlFile.content);
    if (result.command !== "CREATE") {
      console.error(`Error: ${sqlFile.name} is empty.`);
    } else {
      console.error(`Success: ${sqlFile.name} was executed successfully.`);
    }
  }

  return;
}

export default createDatabaseTables;
