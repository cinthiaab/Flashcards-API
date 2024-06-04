import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { GetEstudantesController } from "./controllers/get-estudantes/get-estudantes";
import { MongoGetEstudantesRepository } from "./repositories/get-estudantes/mongo-get-estudantes";
import { MongoClient } from "./database/mongodb";
import { MongoCreateEstudanteRepository } from "./repositories/create-estudante/mongo-create-estudante";
import { CreateEstudanteController } from "./controllers/create-estudante/create-estudante";
import { MongoUpdateEstudanteRepository } from "./repositories/update-estudante/mongo-update-estudante";
import { UpdateEstudanteController } from "./controllers/update-estudante/update-estudante";
import { MongoDeleteEstudanteRepository } from "./repositories/delete-estudante/mongo-delete-estudante";
import { DeleteEstudanteController } from "./controllers/delete-estudante/delete-estudante";
import { MongoGetEstudanteRepository } from "./repositories/get-estudante/mongo-get-estudante";
import { GetEstudanteController } from "./controllers/get-estudante/get-estudante";

const main = async () => {
  config();

  const app = express();

  // Configurar CORS
  app.use(cors());

  app.use(express.json());

  await MongoClient.connect();

  app.get("/estudantes", async (req, res) => {
    const mongoGetEstudantesRepository = new MongoGetEstudantesRepository();

    const getEstudanteController = new GetEstudantesController(
      mongoGetEstudantesRepository
    );

    const { body, statusCode } = await getEstudanteController.handle();

    res.status(statusCode).send(body);
  });

  app.get("/estudantes/:email", async (req, res) => {
    const mongoGetEstudanteRepository = new MongoGetEstudanteRepository();

    const getEstudanteController = new GetEstudanteController(
      mongoGetEstudanteRepository
    );

    const { body, statusCode } = await getEstudanteController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/estudantes", async (req, res) => {
    const mongoCreateEstudanteRepository = new MongoCreateEstudanteRepository();

    const createEstudanteController = new CreateEstudanteController(
      mongoCreateEstudanteRepository
    );

    const { body, statusCode } = await createEstudanteController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/estudantes/:email", async (req, res) => {
    const mongoUpdateEstudanteRepository = new MongoUpdateEstudanteRepository();

    const updateEstudanteController = new UpdateEstudanteController(
      mongoUpdateEstudanteRepository
    );

    const { body, statusCode } = await updateEstudanteController.handle({
      params: req.params,
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/estudantes/:email", async (req, res) => {
    const mongoDeleteEstudanteRepository = new MongoDeleteEstudanteRepository();

    const deleteEstudanteController = new DeleteEstudanteController(
      mongoDeleteEstudanteRepository
    );

    const { body, statusCode } = await deleteEstudanteController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/login", async (req, res) => {
    const mongoGetEstudanteRepository = new MongoGetEstudanteRepository();

    const getEstudanteController = new GetEstudanteController(
      mongoGetEstudanteRepository
    );

    const { body, statusCode } = await getEstudanteController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 4000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
