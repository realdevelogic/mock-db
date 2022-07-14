// import fake from "../../lib/fakedb/src";

import { DatabaseConnection } from "../db";

// export interface IProductBrand {
//   id: string;
//   image: string;
//   name: string;
//   short_description: string;
//   long_description: string;
// }

// const newBrand = ({ name, image, shortDescription, longDescription }: any) => {
//   const brand = {
//     image: image || `'${fake.image.business(400, 300, true)}'`,
//     name: name || randomCompanyName(),
//     short_description: shortDescription || randomDescription(),
//     long_description: longDescription || randomDescription(100),
//   };

//   return brand;
// };

export const getAllProductBrands = async (db: DatabaseConnection) => {
  const { rows } = await db.query("SELECT * FROM product_brands");

  return rows;
};
