import { ObjectId } from "mongodb";
import { client, dbName } from "../common/db.js";

const peliculaCollection = client.db(dbName).collection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {
  try {
    const pelicula = {
      nombre: req.body.nombre,
      generos: req.body.generos,
      anioEstreno: req.body.anioEstreno
    };
    const result = await peliculaCollection.insertOne(pelicula);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetPeliculasRequest(req, res) {
  try {
    const peliculas = await peliculaCollection.find().toArray();
    res.status(200).json(peliculas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    const pelicula = await peliculaCollection.findOne({ _id: id });
    if (pelicula) res.status(200).json(pelicula);
    else res.status(404).json({ error: "No encontrada" });
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    const result = await peliculaCollection.updateOne(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    const result = await peliculaCollection.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}
