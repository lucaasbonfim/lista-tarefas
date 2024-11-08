import express from "express";
import routes from "./routes.js";
import cors from "cors";

const app = express();

app.get("/api/test", (req, res) => {
    res.send("API is working!");
  });


app.use(cors());
app.use(express.json());
app.use("/api", routes);

const port = 3000;

export default app;