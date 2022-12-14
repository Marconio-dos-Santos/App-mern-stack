import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useReducer } from 'react'
import { Store } from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox'
import { toast } from "react-toastify";
import axios from 'axios';
import { getError } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
      case "CREATE_REQUEST":
        return { ...state, loading: true };
      case "CREATE_SUCCESS":
        return { ...state, loading: false };
      case "CREATE_FAIL":
        return { ...state, loading: false };
      default:
        return state;
    }
  };

const PlaceOrderScreen = () => {
    const navigate = useNavigate(); //react router dom hook

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
      });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });
      
            const { data } = await axios.post(
              '/api/orders',
              {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
              },
              {
                headers: {
                  authorization: `Bearer ${userInfo.token}`,
                },
              }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
          } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
          }
    };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);
  return (
    <div className="mx-3">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <h1 className='my-3'>Pedido Completo</h1>
        <Row>
            <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Endereço de envio</Card.Title>
                        <Card.Text>
                            Nome: {cart.shippingAddress.fullName} <br />
                            Endereço: {cart.shippingAddress.address},
                            Cidade: {cart.shippingAddress.city},
                            CEP: {cart.shippingAddress.postalCode},
                        </Card.Text>
                        <Link to="/shipping">Editar</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Forma de Pagamento</Card.Title>
                        <Card.Text>Pagamento com: {cart.paymentMethod}</Card.Text>
                        <Link to="/payment">Editar</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Itens</Card.Title>
                        <ListGroup variant="flush">
                            {cart.cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                <Col md={6}>
                                    <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid rounded img-thumbnail"
                                    ></img>{' '}
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                    <span>{item.quantity}</span>
                                </Col>
                                <Col md={3}>R$:{item.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Link to="/cart">Editar</Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumo do Pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Itens</Col>
                    <Col>R$: {cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Envio</Col>
                    <Col>R$: {cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Juros</Col>
                    <Col>R$: {cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Valor Total</strong>
                    </Col>
                    <Col>
                      <strong>R$: {cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Finalizar
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen