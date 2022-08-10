import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./app/config/db.config.js";
import router from "./app/routes/index.js";

import env from "./app/config/env.js";

const app = express();
//config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//connect to database
connect();

//use routers
router(app);

app.get("/", async (req, res) => {
  res.json("Hello to my app");
});

//running
const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log("The server is running on port:" + PORT));
