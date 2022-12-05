import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import seedRouter from "./routes/seedRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

dotenv.config({ path: "./config/.env" })// permite que você traga variaveis de ambiente ocultas

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

//Middleware
app.use(express.json()); // diz para aplicação para usar o metodo Express JSON para pegar o objeto e transformar em uma string JSON
app.use(express.urlencoded({ extended: true }));


app.use("/api/seed", seedRouter); //"rota opcional" caso queira uma opção rapida para cadastrar usuario e alguns produtos em um novo banco de dados
app.use("/api/products", productRouter); // rota para exibir os produtos
app.use("/api/users", userRouter); // rota logar e criar usuario

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})

const port = process.env.PORT || 2121
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}, you better catch it!`);
});
