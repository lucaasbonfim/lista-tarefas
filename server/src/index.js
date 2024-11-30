import express from "express";
import session from "express-session";
import routes from "./routes.js";
import cors from "cors";
//import loginRoutes from './routes/loginRoutes.js';


const app = express();
//app.use('/auth', loginRoutes);
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

export default app;