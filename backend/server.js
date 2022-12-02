import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import data from './data.js'

dotenv.config()// permite que você traga variaveis de ambiente ocultas

// Conectar no Banco de dados
mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
//Cria uma aplicação express
const app = express()

app.use("/api/seed", seedRouter); //"rota opcional" caso queira uma opção rapida para cadastrar usuario e alguns produtos em um novo banco de dados
app.use("/api/products", productRouter); // rota para exibir os produtos


const port = process.env.PORT || 2121
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}, you better catch it!`);
});
