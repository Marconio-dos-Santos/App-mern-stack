import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";

//função de gerenciamento 'state' do componente
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const params = useParams()
  const { slug } = params
  //useReducer Hook, inicial state e dispatch metodo para atualizar o state
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
    useEffect(() =>{
      const fetchDataServices = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          //buscar produtos no backend usando ajax request para rota /api/products/:slug
          const result = await axios.get(`/api/products/slug/${slug}`)
          //atualizando 'state'
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: err.message });
        }
      }
      fetchDataServices()
      //quando mudar o slug fetchDataServices chama dispatch novamente 
    }, [slug])
    

    return loading ? (
      <div>Loading</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <img className="img-large" src={product.image} alt={product.name}></img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                R$: {product.price.toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>R$:</Col>
                      <Col>{product.price.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ?
                      <Badge bg="success">Em Estoque</Badge>:
                      <Badge bg="danger">Sem Estoque</Badge>
                      }</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button>
                          Carrinho
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

export default ProductScreen