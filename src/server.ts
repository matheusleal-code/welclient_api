import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import passport from "passport";
import clientRoutes from "./app/routes/clientRoutes";

const app = express();

var corsOptions = {
   origin: '*',
   optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(passport.initialize());

app.use(express.json());

app.use('/api/v1/clients', clientRoutes);

AppDataSource.initialize().then(async () => {
  console.log("Database connected");
  app.listen(8080, () => {
    console.log("Server started on port 4444");
  });
});
