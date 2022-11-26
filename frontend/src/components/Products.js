function Products({ product }) {
  return (
    <div>
        <a href={`/product/${product.slug}`}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        </a>
        <div>
            <a href={`/product/${product.slug}`}>
              <p>{product.name}</p>
            </a>
            <p>{product.price}</p>
            <button>Add to Cart</button>
        </div>
    </div>
  )
}

export default Products