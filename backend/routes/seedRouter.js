import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";

const router = express.Router();
//buscando dados em um arquivo estatico chamado "data.js" e salva no banco de dados MongoDB
router.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default router;
