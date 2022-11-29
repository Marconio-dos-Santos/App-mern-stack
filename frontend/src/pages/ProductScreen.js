import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

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
          const result = await axios.get(`/api/products/${slug}`)
          console.log(result.data[0])
          //atualizando 'state'
          dispatch({ type: "FETCH_SUCCESS", payload: result.data[0] });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: err.message });
        }
      }
      fetchDataServices()
    }, [])
    

    return loading ? (
      <div>Loading</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <div>
        <Row>
          <Col md={7}>
            <img className="img-large" src={product.image} alt={product.name}></img>
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Assinatura:</strong>
                  </Col>
                  <Col>R$: {product.price.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button>
                  <i className="fa fa-shopping-cart"></i> ASSINAR
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }

export default ProductScreen