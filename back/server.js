const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db-config");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const { db } = require("./config/db-config");

app.get("/", (req, res) => {
  res.send("Combien pour aujourd'hui ?");
});

//=== User

app.get("/users", (req, res) => {
  db.query("SELECT * from users", (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Erreur dans la récupération des utilisateurs");
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/users", (req, res) => {
  if (req.body == null || req.body == undefined) {
    res.status(400).send("Merci de compléter tous les champs");
  }
  const {
    username,
    email,
    date_of_birth,
    sex,
    weight,
    height,
    id_activity,
    password,
  } = req.body;
  db.query(
    "INSERT INTO users (username, email, date_of_birth, sex, weight, height, id_activity, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      username,
      email,
      date_of_birth,
      sex,
      weight,
      height,
      id_activity,
      password,
    ],
    (err, result) => {
      if (err) {
        return res.status(422).send("Impossible de créer l'utilisateur");
      } else res.status(201).send(result);
    }
  );
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query(`SELECT * FROM users WHERE id=${userId}`, (err, result) => {
    if (err) {
      return res
        .status(400)
        .send("Impossible de récupérer les données de l'utilisateur");
    } else res.status(200).send(result);
  });
});

app.put("/users/:id", (req, res) => {
  db.query(
    "UPDATE users SET ? WHERE id=?",
    [req.body, req.params.id],
    (err, results) => {
      if (err) {
        return res.sendStatus(404);
      } else res.status(200).send("Données mises à jour");
    }
  );
});



//=== Port
app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Serveur fonctionnel sur le port ${port}`);
  }
});
