function Products({ product }) {
  return (
    <div>
        <img src={product.image} className="card-img-top" alt={product.name} />
    </div>
  )
}

export default Products