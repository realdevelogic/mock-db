import { DatabaseConnection } from "../db";

const execute = (query: string) => (db: DatabaseConnection) => db.query(query);

export const insertMany = (
  tableName: string,
  tableColumnNames: string[],
  values: string[],
  optionsStatement?: string
) => {
  const INSERT_STATEMENT = `INSERT INTO ${tableName}`;
  const COLUMNS_STATEMENT = ` (${tableColumnNames.join(",")}) `;
  const VALUES_SATATEMENT = `VALUES ${values.join(",")}`;
  const OPTIONS_STATEMENT = optionsStatement || `ON CONFLICT DO NOTHING`;

  const query = `
  ${INSERT_STATEMENT} 
  ${COLUMNS_STATEMENT} 
  ${VALUES_SATATEMENT} 
  ${OPTIONS_STATEMENT}
  `;

  const exec = execute(query);

  return { query, exec };
};

export const insertOne = (
  tableName: string,
  tableColumnNames: string[],
  values: (string | number)[],
  optionsStatement?: string
) => {
  const INSERT_STATEMENT = `INSERT INTO ${tableName}`;

  const COLUMNS_STATEMENT = ` (${tableColumnNames.join(",")}) `;

  const VALUES_SATATEMENT = `VALUES (${values.join(",")})`;

  const OPTIONS_STATEMENT = optionsStatement || `ON CONFLICT DO NOTHING`;

  const query = `
  ${INSERT_STATEMENT} 
  ${COLUMNS_STATEMENT} 
  ${VALUES_SATATEMENT} 
  ${OPTIONS_STATEMENT}
  `;

  const exec = execute(query);

  return { query, exec };
};

export default { insertMany, insertOne };
