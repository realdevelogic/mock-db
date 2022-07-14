import { DatabaseConnection } from "./db";
import newCategory from "./entities/productCategory";
import { insertMany } from "./helpers/query";

const createProductCategories = async (
  defaultCategories: string[],
  db: DatabaseConnection
) => {
  const categories = defaultCategories;
  const values: string[] = [];
  let columnNames: any[] = [];

  categories.forEach((categoryName, index) => {
    const category = newCategory(categoryName);
    category.id = index;
    const props = Object.values(category);
    if (!columnNames.length) columnNames = Object.keys(category);
    values.push(`(${props.join(",")})`);
  });

  const query = insertMany("product_categories", columnNames, values);

  await query.exec(db);

  return;
};

export default createProductCategories;
