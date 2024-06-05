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

import { GetFlashcardsController } from "./controllers/get-flashcards/get-flashcards";
import { MongoGetFlashcardsRepository } from "./repositories/get-flashcards/mongo-get-flashcards";
import { MongoCreateFlashcardRepository } from "./repositories/create-flashcard/mongo-create-flashcard";
import { CreateFlashcardController } from "./controllers/create-flashcard/create-flashcard";
import { MongoUpdateFlashcardRepository } from "./repositories/update-flashcard/mongo-update-flashcard";
import { UpdateFlashcardController } from "./controllers/update-flashcard/update-flashcard";
import { MongoDeleteFlashcardRepository } from "./repositories/delete-flashcard/mongo-delete-flashcard";
import { DeleteFlashcardController } from "./controllers/delete-flashcard/delete-flashcard";
import { MongoGetFlashcardRepository } from "./repositories/get-flashcard/mongo-get-flashcard";
import { GetFlashcardController } from "./controllers/get-flashcard/get-flashcard";

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

  app.get("/flashcards/:email", async (req, res) => {
    const mongoGetFlashcardsRepository = new MongoGetFlashcardsRepository();

    const getFlashcardsController = new GetFlashcardsController(
      mongoGetFlashcardsRepository
    );

    const { body, statusCode } = await getFlashcardsController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.get("/flashcards/:pergunta", async (req, res) => {
    const mongoGetFlashcardRepository = new MongoGetFlashcardRepository();

    const getFlashcardController = new GetFlashcardController(
      mongoGetFlashcardRepository
    );

    const { body, statusCode } = await getFlashcardController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/flashcards", async (req, res) => {
    const mongoCreateFlashcardRepository = new MongoCreateFlashcardRepository();

    const createFlashcardController = new CreateFlashcardController(
      mongoCreateFlashcardRepository
    );

    const { body, statusCode } = await createFlashcardController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/flashcards/:pergunta", async (req, res) => {
    const mongoUpdateFlashcardRepository = new MongoUpdateFlashcardRepository();

    const updateFlashcardController = new UpdateFlashcardController(
      mongoUpdateFlashcardRepository
    );

    const { body, statusCode } = await updateFlashcardController.handle({
      params: req.params,
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/flashcards/:pergunta", async (req, res) => {
    const mongoDeleteFlashcardRepository = new MongoDeleteFlashcardRepository();

    const deleteFlashcardController = new DeleteFlashcardController(
      mongoDeleteFlashcardRepository
    );

    const { body, statusCode } = await deleteFlashcardController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 4000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
