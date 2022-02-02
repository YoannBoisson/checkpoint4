const db = require("../config/db-config");
const Joi = require("joi");
const argon2 = require("argon2");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    email: Joi.string().email().max(100).presence(presence),
    password: Joi.string().min(6).max(45).presence(presence),
    username: Joi.string().max(45).presence(presence),
    date_of_birth: Joi.string().max(45).presence(presence),
    sex: Joi.boolean(),
    weight: Joi.number().integer().min(0),
    height: Joi.number().integer().min(0),
  })
    .unknown(true)
    .validate(data, { abortEarly: false }).error;
};

const findMany = () => {
  let sql =
    "SELECT username, email, date_of_birth, sex, weight, height, id_activity FROM users";
  return db
    .promise()
    .query(sql)
    .then(([results]) => results);
};

const findOne = (id) => {
  return db
    .promise()
    .query(
      "SELECT id, username, email, date_of_birth, sex, weight, height, id_activity FROM users WHERE id = ?",
      [id]
    )
    .then(([results]) => results[0]);
};

const findByEmail = (email) => {
  return db
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email])
    .then(([results]) => results[0]);
};

const findByEmailWithDifferentId = (email, id) => {
  return db
    .promise()
    .query("SELECT * FROM users WHERE email = ? AND id <> ?", [email, id])
    .then(([results]) => results[0]);
};

const findByToken = (token) => {
  return db
    .promise()
    .query("SELECT * FROM users WHERE token = ?", [token])
    .then(([results]) => results[0]);
};

const create = ({
  username,
  email,
  date_of_birth,
  sex,
  weight,
  height,
  id_activity,
  password,
}) => {
  return hashPassword(password).then((hashedPassword) => {
    return db
      .promise()
      .query("INSERT INTO users SET ?", {
        username,
        email,
        date_of_birth,
        sex,
        weight,
        height,
        id_activity,
        hashedPassword,
      })
      .then(([result]) => {
        const id = result.insertId;
        return {
          username,
          email,
          date_of_birth,
          sex,
          weight,
          height,
          id_activity,
          id,
        };
      });
  });
};

const update = async (id, newAttributes) => {
  const hashedPassword = await hashPassword(newAttributes.hashedPassword);
  Object.defineProperty(newAttributes, "hashedPassword", {
    value: hashedPassword,
  });
  db.promise().query("UPDATE users SET ? WHERE id = ?", [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .promise()
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([result]) => result.affectedRows !== 0);
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

module.exports = {
  findMany,
  findOne,
  validate,
  create,
  update,
  destroy,
  findByEmail,
  findByToken,
  findByEmailWithDifferentId,
  hashPassword,
  verifyPassword,
};
