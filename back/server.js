const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { setupRoutes } = require("./routes/index");

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
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1 style='color:#FBAB7E;'>Hello ${req.body.name}</h1><h2 style='color:#F7CE68;'>Bienvenue dans la communauté</h2>`,
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

//=== Port
app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Serveur fonctionnel sur le port ${port}`);
  }
});
