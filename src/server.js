import express from "express";
import { init, allData } from "./init";
import regionsURL from "./listings/regions";
import cors from "cors";

init();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "https://emerging-stories.netlify.app",
  })
);

app.get("/", (req, res) => res.send("App started!"));
app.get("/api/all", (req, res) => res.send(allData[0]));
app.get("/api/:region", (req, res) => {
  let regionsArray = regionsURL.map((item) => item.serviceUrl);
  if (regionsArray.indexOf(req.params.region) !== -1) {
    res.send(allData[regionsArray.indexOf(req.params.region) + 1]);
  } else {
    res.send(`${req.params.region} is not a valid WS region.`);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
