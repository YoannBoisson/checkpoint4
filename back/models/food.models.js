const db = require("../config/db-config");

const findMany = () => {
  let sql =
    "SELECT * FROM food";
  return db
    .promise()
    .query(sql)
    .then(([results]) => results);
};

module.exports = {
    findMany
}