import express from "express";
import { init, allData } from "./init";

init();

const app = express();

//app.get("/hello", (req, res) => res.send("Hello!"));
app.get("/test", (req, res) => res.send(allData));
app.get("/getlanguagedata/:region", (req, res) =>
  res.send(`This is the info for ${req.params.region}`)
);

app.listen(8000, () => console.log("Listening on port 8000"));
