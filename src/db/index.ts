import pg, { Pool } from "pg";

// dotenv.config({ path: path.resolve(__dirname, "../../") });

export type DatabaseConfig = {
  user: string;
  password: string;
  database: string;
};

export type DatabaseConnection = {
  query: (text: string, params?: any, callback?: any) => Promise<any>;
};

export type DatabaseOptions = {
  dropIfExists?: boolean;
  config: DatabaseConfig;
};

/**
 * DROP THE OLD DATABASE AND
 * CREATE A NEW DATABASE
 */

const refreshDatabase = async (dbConfig: DatabaseConfig) => {
  const temporaryPool = new Pool({ ...dbConfig, database: "postgres" });
  await temporaryPool.connect();

  const { rows } = await temporaryPool.query(
    `SELECT datname FROM pg_catalog. pg_database WHERE lower(datname) = lower('${dbConfig.database}');`
  );

  console.log(rows);

  if (rows.length > 0) {
    console.log(`[PROCESSING] DROPPING DATABASE ${dbConfig.database}`);

    const sql = `DROP DATABASE ${dbConfig.database};`;

    console.log(sql);

    const result = await temporaryPool.query(sql);

    if (result.command === "DROP") {
      console.log(`💀 Database Dropped Successfully`);
    }
  }

  console.log(`[PROCESSING] Creating DATABASE ${dbConfig.database}`);

  const result = await temporaryPool.query(
    `CREATE DATABASE ${dbConfig.database};`
  );

  if (result.command === "CREATE") {
    console.log(`[CREATE] Database Created Successfully`);
  }

  temporaryPool.end(() => {
    "Pool has Ended";
  });
};

const createDatabaseConnection = async (options: DatabaseOptions) => {
  if (options.dropIfExists) {
    const { config } = options;

    await refreshDatabase(config);
  }

  const pool = new pg.Pool(options.config);

  console.log(pool);

  pool.on("error", function (err) {
    console.error("idle client error", err.message, err.stack);
  });

  return {
    query: async function (
      text: string,
      params?: any,
      callback?: any
    ): Promise<any> {
      return pool.query(text, params, callback);
    },
    kill: pool.end.bind(pool),
  };
};

export default createDatabaseConnection;
