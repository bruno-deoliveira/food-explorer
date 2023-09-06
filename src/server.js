require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require ("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require ("express");     //aqui estou importando para usar tudo que esá na pasta node_modules
const routes = require("./routes");

migrationsRun();

const app = express();                   //para iniciar o express 
app.use(cors());
app.use(express.json());                 // para receber as informçãoes atraves do corpo da requisição usando json

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});


const PORT = process.env.PORT || 3333;                       // Dizemos qual o endereço que ele vai atender as solicitações 
app.listen(PORT, () => console.log(`Server us running on Port ${PORT}`));