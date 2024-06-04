import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url =
      "mongodb+srv://root:1234@cluster0.xeefkku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const username = "root";
    const password = "1234";

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("estudantes-db");

    this.client = client;
    this.db = db;
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    console.log("Conectado com o banco de dados mongodb!");
  },
};
