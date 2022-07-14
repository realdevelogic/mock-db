import { DatabaseConnection } from "./db";
import newProduct from "./entities/product";
import { getAllProductBrands } from "./entities/productBrand";
import { getAllProductCategories } from "./entities/productCategory";
import { insertOne } from "./helpers/query";
import { printVerticalSpace } from "./helpers/stdout";
import { RNG } from "./unreal/lib/number";

const createProduct = () => {};

const createProducts = async (count: number, db: DatabaseConnection) => {
  const brands = await getAllProductBrands(db);
  const categories = await getAllProductCategories(db);
  let columnNames: string[] = [];

  let inserted = 0;

  const intervalId = setInterval(() => {
    console.log(`[+] ${inserted} products inserted to the database.`);
  }, 500);

  for (let i = 0; i < count; i++) {
    const randCategoryIndex = RNG(0, categories.length);
    const randBrandIndex = RNG(0, brands.length);

    const categoryId = categories[randCategoryIndex].id;
    const brandId = brands[randBrandIndex].id;

    const newProductObj = await newProduct(categoryId, brandId);

    if (!columnNames.length) columnNames = Object.keys(newProductObj);

    const values = Object.values(newProductObj);

    const sql = insertOne(
      "products",
      columnNames,
      values,
      "ON CONFLICT DO NOTHING RETURNING id"
    );

    try {
      await sql.exec(db);
      inserted++;
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  console.log(`[COMPLETE] ${inserted} products inserted to the database.`);

  clearInterval(intervalId);

  return;
};

export default createProducts;
