import { Link }from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Rating from "./Rating"
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";


function Product({ product }) {
  //useContext da acesso ao state e permição de modificar usando ctxDispatch
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
  //verifica se o produto ja existe no carrinho
  const existItem = cartItems.find((x) => x._id === product._id);
  //se existir adiciona + 1 se não atribuiu o valor de 1
  const quantity = existItem ? existItem.quantity + 1 : 1;

    //busca os dados do produto pelo seu id no banco de dados
    const { data } = await axios.get(`/api/products/${item._id}`);
    //verifica se o estoque do produto é menor que a quantidade no carrinho
    if (data.countInStock < quantity) {
      window.alert("Desculpe. Produto sem estoque!");
      return;
    }
    //em Store.js adiciona o produto ao carrinho + quantidade
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
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
        {product.countInStock === 0 ? <Button variant="light" disabled >Sem estoque</Button>
        :
        <Button onClick={() => addToCartHandler(product)}>
          <i className="fa fa-shopping-cart"></i> Carrinho
        </Button>
        }
        
      </Card.Body>
    </Card>
  )
}

export default Product