import { Link }from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Rating from "./Rating"


function Product({ product }) {
  return (
    <Card border='light' >
      <Link className="product-card" to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top product-image" alt={product.name} />
      </Link>
      <Card.Body className="card-body">
        <Link className="product-name" to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="product-price">${product.price}</Card.Text>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default Product