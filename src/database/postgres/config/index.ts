require("dotenv/config");

const dialect = "postgres";

const databaseCredentials = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialectOptions: {
      ssl: false
    }
  },
  test: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
};

const { host, username, password, database, dialectOptions } = databaseCredentials[
  process.env.NODE_ENV
];

module.exports = {
  dialect,
  dialectOptions,
  host,
  username,
  password,
  database,
  define: {
    timestamps: true,
    underscored: true,
  },
};
