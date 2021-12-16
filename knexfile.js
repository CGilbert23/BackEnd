const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://dyvmrzhe:VhZSNcotR_tNPsHwI38J6-6kOee9gsbk@chunee.db.elephantsql.com/dyvmrzhe",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
