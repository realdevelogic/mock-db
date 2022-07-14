import createDatabaseConnection from "./db";
import dotenv from "dotenv";
dotenv.config();

import createBrands from "./createBrands";
import createComments from "./createComments";
import createProductCategories from "./createProductCategories";
import createProducts from "./createProducts";
import createDatabaseTables from "./createTables";
import createUsers from "./createUsers";
import { getAllUsers } from "./entities/user";
import { getAllProducts } from "./entities/product";

const BRANDS = ["Apple", "Google", "Huawei", "Samsung", "Logitech"];
const CATEGORIES = ["smart-phone", "mouse", "keyboard", "tablet", "laptop"];

async function mockDB() {
  const config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_WHICH!,
  };

  if (!config.user) {
    throw new Error(`expected database user got empty ${typeof config.user}`);
  }

  if (!config.password) {
    throw new Error(
      `expected database password got empty ${typeof config.password}`
    );
  }

  if (!config.database) {
    throw new Error(
      `expected database name got empty ${typeof config.database}`
    );
  }

  const dbConnection = await createDatabaseConnection({
    dropIfExists: true,
    config,
  });

  /** SETUP */
  await createDatabaseTables(dbConnection);

  /** PRODUCTS */
  await createBrands(BRANDS, dbConnection);
  await createProductCategories(CATEGORIES, dbConnection);
  await createProducts(2000, dbConnection);
  const productIds = (await getAllProducts(dbConnection)).map((v) => v.id);

  /** USERS */
  await createUsers(1000, dbConnection);
  const userIds = (await getAllUsers(dbConnection)).map((v) => v.id);

  /** USER INTERACTIONS */
  await createComments(5000, userIds, productIds, dbConnection);

  dbConnection.kill(() => {
    console.log("[DONE] DATABASE CONNECTION KILLED");
  });
}

mockDB()
  .then(() => {})
  .catch(console.error);

export default mockDB;
