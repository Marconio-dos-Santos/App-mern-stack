import { Link }from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

function Product({ product }) {
  return (
    <Card border='light' className="product-card">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top product-image" alt={product.name} />
      </Link>
      <Card.Body className="card-body">
        <Link className="product-name" to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text className="product-price">${product.price}</Card.Text>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default Product