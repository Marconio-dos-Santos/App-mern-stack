import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// pega todos os produtos da coleção products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.send(products); // envia os dados para o frontend
});

router.get('/slug/:slug', async (req, res) => {
    const item = await Product.findOne({ slug: req.params.slug });
    if(item) {
        res.send(item)
    }else {
        res.status(404).send({message: "produto não encontrado"})
    }
})
router.get('/:id', async (req, res) => {
    const item = await Product.findById(req.params.id);
    if(item) {
      res.send(item)
    }else {
      res.status(404).send({message: "produto não encontrado"})
    }
})
export default router;