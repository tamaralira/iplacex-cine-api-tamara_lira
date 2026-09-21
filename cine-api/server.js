import express from "express";
import cors from "cors";
import { client } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});

async function start() {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB Atlas");

    app.use("/api", peliculaRoutes);
    app.use("/api", actorRoutes);

    app.listen(3000, () => console.log("Servidor Express en puerto 3000"));
  } catch (err) {
    console.error("Error de conexión:", err);
  }
}
start();
