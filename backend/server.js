import express from 'express'
import dotenv from 'dotenv'
import data from './data.js'

dotenv.config()
const app = express()

app.get('/api/products', (req, res) => {
    res.send(data.products)
})
app.get('/api/products/slug/:slug', (req, res) => {
    const item = data.products.find(item => item.slug === req.params.slug);
    if(item) {
      res.send(item)
    }else {
      res.status(404).send({message: "produto não encontrado"})
    }
})
app.get('/api/products/:id', (req, res) => {
    const item = data.products.find(item => item._id === req.params.id);
    if(item) {
      res.send(item)
    }else {
      res.status(404).send({message: "produto não encontrado"})
    }
})
const port = process.env.PORT || 2121
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}, you better catch it!`);
});
