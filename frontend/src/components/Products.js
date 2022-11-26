import { Link }from "react-router-dom"

function Products({ product }) {
  return (
    <div>
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>
        <div>
            <Link to={`/product/${product.slug}`}>
              <p>{product.name}</p>
            </Link>
            <p>{product.price}</p>
            <button>Add to Cart</button>
        </div>
    </div>
  )
}

export default Products