import { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

const CartScreen = () => {
  const navigate = useNavigate();
  //renomeia dispatch para ctxDispatch para distinguir do componente atual em reducer
  //useContext da acesso ao state e permição de modificar usando ctxDispatch
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
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
    //em Store.js remove um item do carrinho
    const removeItemHandler = (item) => {
        ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };
    //signin verificar se ja esta logado se sim redirect recebe shipping e redireciona
    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    };
return (
    <div>
        <h1>Carrinho</h1>
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <MessageBox>
                      Carrinho vazio. <Link to='/'>Inicio</Link>
                    </MessageBox>
                    ) : (
                    <ListGroup>
                      {cartItems.map((item) => (
                        <ListGroup.Item key={cartItems._id}>
                          <Row className="align-items-center">
                            <Col className="img-thumbnail-container"  md={4}>
                              <img 
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded img-thumbnail"
                              ></img>{' '}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                              <Button
                              variant="light"
                              onClick={() => updateCartHandler(item, item.quantity - 1)}
                              disabled={item.quantity === 1 }>
                                <i className="fas fa-minus-circle"></i>
                              </Button>{' '}
                              <span>{item.quantity}</span>{' '}
                              <Button
                                variant="light"
                                onClick={() => updateCartHandler(item, item.quantity + 1)}
                                disabled={item.quantity === item.countInStock }
                              >
                                <i className="fas fa-plus-circle"></i>
                              </Button>
                            </Col>
                            <Col md={3}>{item.price}</Col>
                            <Col md={2}>
                              <Button
                                onClick={() => removeItemHandler(item)}
                                variant="light"
                                disabled={item.quatity === 1}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>
                        Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}{''}
                        itens) : $
                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                      </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          type="button"
                          variant="primary"
                          onClick={checkoutHandler}
                          disabled={cartItems.length === 0}
                        >
                          Carrinho
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
        </Row>
    </div>
  )
}

export default CartScreen