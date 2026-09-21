import { ObjectId } from "mongodb";
import { client, dbName } from "../common/db.js";

const actorCollection = client.db(dbName).collection("actores");
const peliculaCollection = client.db(dbName).collection("peliculas");

export async function handleInsertActorRequest(req, res) {
  try {
  
    const pelicula = await peliculaCollection.findOne({ nombre: req.body.nombrePelicula });
    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    const actor = {
      _id: new ObjectId(),
      idPelicula: pelicula._id.toString(),
      nombre: req.body.nombre,
      edad: parseInt(req.body.edad),
      estaRetirado: req.body.estaRetirado === true,
      premios: req.body.premios || []
    };

    const result = await actorCollection.insertOne(actor);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetActoresRequest(req, res) {
  try {
    const actores = await actorCollection.find().toArray();
    res.status(200).json(actores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetActorByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    const actor = await actorCollection.findOne({ _id: id });
    if (actor) res.status(200).json(actor);
    else res.status(404).json({ error: "No encontrado" });
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const idPelicula = new ObjectId(req.params.pelicula);
    const actores = await actorCollection.find({ idPelicula: idPelicula.toString() }).toArray();
    res.status(200).json(actores);
  } catch {
    res.status(400).json({ error: "Id de película mal formado" });
  }
}

export async function handleUpdateActorByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    const result = await actorCollection.updateOne(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleDeleteActorByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    const result = await actorCollection.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}
