const authRouter = require("./auth");
const usersRouter = require("./users.route");
const foodRouter = require("./food.route");

const setupRoutes = (app) => {
  app.use("/auth", authRouter);
  app.use("/food", foodRouter);
  app.use("/users", usersRouter);
};

module.exports = {
  setupRoutes,
};
