import { DatabaseConnection } from "../db";
import unreal from "../unreal";
import { wrapInQuotes } from "../unreal/lib/utils/helpers";

const newCategory = (name: string) => {
  const category = {
    id: 0,
    image: unreal.image.randomAbstractImage(),
    name: wrapInQuotes(name),
    category_description: unreal.text.randomDescription(10),
  };

  return category;
};

export const getAllProductCategories = async (db: DatabaseConnection) => {
  const { rows } = await db.query("SELECT * FROM product_categories");

  return rows;
};

export default newCategory;
