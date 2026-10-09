const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config();

let sequelize;

const databaseUrl = process.env.DATABASE_URL;
const explicitDialect = (process.env.DB_DIALECT || "").toLowerCase();

if (databaseUrl) {
  // Production / Managed DB via connection string (e.g., Render PostgreSQL, Supabase, Neon)
  const isPostgres =
    databaseUrl.startsWith("postgres://") ||
    databaseUrl.startsWith("postgresql://") ||
    explicitDialect === "postgres";

  const useSsl =
    process.env.DB_SSL === "false"
      ? false
      : {
          require: true,
          rejectUnauthorized: false
        };

  sequelize = new Sequelize(databaseUrl, {
    dialect: isPostgres ? "postgres" : (explicitDialect || "postgres"),
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    dialectOptions: isPostgres && useSsl ? { ssl: useSsl } : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else if (explicitDialect === "postgres") {
  // PostgreSQL configured via individual variables
  const useSsl =
    process.env.DB_SSL === "true"
      ? {
          require: true,
          rejectUnauthorized: false
        }
      : false;

  sequelize = new Sequelize(
    process.env.DB_NAME || "medoracle",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      dialect: "postgres",
      logging: process.env.DB_LOGGING === "true" ? console.log : false,
      dialectOptions: useSsl ? { ssl: useSsl } : {},
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
} else if (explicitDialect === "mysql") {
  // MySQL configured via individual variables
  sequelize = new Sequelize(
    process.env.DB_NAME || "medoracle",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      dialect: "mysql",
      logging: process.env.DB_LOGGING === "true" ? console.log : false,
      retry: { max: 1 }
    }
  );
} else {
  // Default: SQLite (ideal for local development)
  const dbPath =
    process.env.DB_STORAGE || path.join(__dirname, "../database.sqlite");

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "⚠️ [PERSISTENCE WARNING] Running SQLite in production. On Render free services, the filesystem is ephemeral and data in SQLite will be lost across restarts or redeployments. Set DATABASE_URL to a managed PostgreSQL database for durable persistence."
    );
  }

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
    logging: process.env.DB_LOGGING === "true" ? console.log : false
  });
}

module.exports = sequelize;

