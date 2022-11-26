import { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../components/Products'

const HomeScreen = () => {
    //definir state para salvar dados do backend
    const [products, setProducts] = useState([])
    useEffect(() =>{
        const fetchDataServices = async () => {
            const result = await axios.get('/api/products')
            setProducts(result.data)
          }
          fetchDataServices()
    }, [])
  return (
    <section>
      <h1>Produtos</h1>
      <div className="products">
          {products.map((product) => (
            <div key={product.slug} className="product">
              <Products product={product} />
            </div>
          ))}
      </div>
      </section>
  )
}

export default HomeScreen