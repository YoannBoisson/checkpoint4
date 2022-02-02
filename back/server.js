const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { setupRoutes } = require("./routes/index");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser())

setupRoutes(app);

const db = require("./config/db-config");

app.get("/", (req, res) => {
    console.log('test')
  res.send("Combien pour aujourd'hui ?");
});

//=== Port
app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Serveur fonctionnel sur le port ${port}`);
  }
});
