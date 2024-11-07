import express from "express";
import routes from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});