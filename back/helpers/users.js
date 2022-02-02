const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "superSecretStringNowoneShouldKnowOrTheCanGenerateTokens";

const calculateToken = (userEmail = "") => {
  return jwt.sign({ email: userEmail }, PRIVATE_KEY);
};

module.exports = { calculateToken };
