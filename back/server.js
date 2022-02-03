const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { setupRoutes } = require("./routes/index");
const db = require("./config/db-config");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

setupRoutes(app);

app.get("/", (req, res) => {
  res.send("Combien pour aujourd'hui ?");
});

app.post("/mailto", (req, res) => {
  console.log(req.body)
  //=== Envoi d'email
  const nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.DB_MAIL,
      pass: process.env.DB_PASSWORD_MAIL,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: "yoann.devtest@gmail.com", // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    html: `<h1 style='color:#F48B0C;'>Merci pour votre message !</h1><h2 style='color:#46474B;'>En voici une copie : <br>${req.body.html}</h2><h3 style='color:#1C232D;'>Je reviendrai vers vous rapidement.</h3><p style='color:#1C232D;'>Diététiquement,<br> Yoann</p>`,
  };

  transporter.sendMail(mailOptions, function (err, success) {
  if (err) {
    console.log(err);
    return res.status(503);
  } else {
    console.log("Email envoyé avec succès");
    res.status(200).send(success.messageId);
  }
});
})

app.get('/activity', (req, res) => {
  db.query("SELECT * FROM activity", (err, result)=> {
    if(err){
      console.log(err)
    } else {
      res.status(200).send(result)
    }
  })
})

app.get('/quantity/:id', (req, res) => {
  db.query(
    "SELECT F.energy, quantity FROM food F JOIN user_food ON id_food=F.id AND id_user=?", [req.params.id], (err, result) => {
      if (err){
        console.log(err)
      } else {
        res.status(200).send(result)
      }
    }
  );
})

app.post('/quantity', (req, res) => {
  const {id_user, id_food, quantity} = req.body
  db.query(
    "INSERT INTO user_food (id_user, id_food, quantity) VALUES (?, ?, ?)",
    [id_user, id_food, quantity],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(result);
      }
    }
  );
})

app.delete('/quantity/:id', (req,res) => {

  db.query("DELETE FROM user_food WHERE id_user=?", [req.params.id], (err, result) => {
    if (err){
      console.log(err)
    } else {
      res.status(200).send(result)
    }
  })
})

//=== Port
app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Serveur fonctionnel sur le port ${port}`);
  }
});
