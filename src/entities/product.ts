import { DatabaseConnection } from "../db";
import unreal from "../unreal";
import {
  trueOrFalse,
  wrapInQuotes,
  escapeString,
} from "../unreal/lib/utils/helpers";

export interface IProduct {
  id: string;
  user_id: string;
  category_id: string;
  brand_id: string;
  name: string;
  thumb: string;
  unlimited: string | boolean;
  weight: number;
  active: boolean;
}

const newProduct = async (categoryId: number, brandId: number) => {
  const product = {
    category_id: categoryId,
    brand_id: brandId,
    name: unreal.product.productName(),
    thumbnail: unreal.product.productThumb(),
    unlimited: trueOrFalse(10),
    active: trueOrFalse(90),
    images: unreal.image.randomAbstractImage(),
    features: unreal.text.randomDescription(10),
    short_description: unreal.product.productDescription(),
    long_description: unreal.product.productLongDescription(),
    price: unreal.number.RNG(14000, 200000),
    created_at: unreal.date.randomSQLPastDate(3650, 366),
    edited_at: wrapInQuotes(unreal.date.recentDate().toISOString()),
  };

  return product;
};

export const getAllProducts = async (
  db: DatabaseConnection
): Promise<any[]> => {
  const { rows } = await db.query("SELECT * FROM products");

  return rows;
};

export default newProduct;
