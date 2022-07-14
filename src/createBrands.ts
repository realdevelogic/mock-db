import { DatabaseConnection } from "./db";
import { insertMany } from "./helpers/query";
import unreal from "./unreal";
import { wrapInQuotes } from "./unreal/lib/utils/helpers";

const brandValuesFromParams = (name: string, id: number) => {
  return [
    wrapInQuotes(id),
    unreal.image.randomAbstractImage(),
    wrapInQuotes(name),
    unreal.text.randomDescription(10),
    unreal.text.randomDescription(70),
  ];
};

const createBrands = async (brands: any[], db: DatabaseConnection) => {
  const values: any[] = [];

  brands.forEach((brandName: string, id) => {
    const brandValues = brandValuesFromParams(brandName, id);
    values.push(`(${brandValues.join(",")})`);
  });

  const sql = insertMany(
    "product_brands",
    ["id", "image", "name", "short_description", "long_description"],
    values
  );

  console.log(sql.query);

  const result = await sql.exec(db);

  console.log(result);

  return;
};

export default createBrands;
