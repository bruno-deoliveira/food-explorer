const express = require ("express");     //aqui estou importando para usar tudo que esá na pasta node_modules

const routes = require("./routes");

const app = express();                   //para iniciar o express 
app.use(express.json());                 // para receber as informçãoes atraves do corpo da requisição usando json

app.use(routes);

const PORT = 3333                        // Dizemos qual o endereço que ele vai atender as solicitações 
app.listen(PORT, () => console.log(`Server us running on Port ${PORT}`));