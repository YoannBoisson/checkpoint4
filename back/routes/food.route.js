const foodRouter = require("express").Router();
const Food = require("../models/food.models");

foodRouter.get("/", (req, res) => {
  Food.findMany()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send("Impossible de récupérer les données des aliments");
    });
});

module.exports = foodRouter;
