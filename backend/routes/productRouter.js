import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const router = express.Router();

// pega todos os produtos da coleção products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.send(products); // envia os dados para o frontend
});

router.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const newProduct = new Product({
        name: 'sample name ' + Date.now(),
        slug: 'sample-name-' + Date.now(),
        image: '/images/p2.jpg',
        price: 30,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 5,
        rating: 3.5,
        numReviews: 10,
        description: 'sample description',
      });
      const product = await newProduct.save();
      res.send({ message: 'Product Created', product });
    })
  );
  
router.put(
'/:id',
isAuth,
isAdmin,
expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    await product.save();
    res.send({ message: 'Product Updated' });
    } else {
    res.status(404).send({ message: 'Product Not Found' });
    }
})
);
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
router.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const products = await Product.find()
      const countProducts = await Product.countDocuments();
      res.send({
        products,
        countProducts,
      });
    })
  );
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