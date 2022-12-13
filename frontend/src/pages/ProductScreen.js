import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";

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
  const navigate = useNavigate()
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
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      }
      fetchDataServices()
      //quando mudar o slug fetchDataServices chama dispatch novamente 
    }, [slug])

  //renomeia dispatch para ctxDispatch para distinguir do componente atual em reducer
  //useContext da acesso ao state e permição de modificar usando ctxDispatch
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
    const addToCartHandler = async () => {
      //verifica se o produto ja existe no carrinho
      const existItem = cart.cartItems.find((x) => x._id === product._id)
      //se existir adiciona + 1 se não atribuiu o valor de 1
      const quantity = existItem ? existItem.quantity + 1 : 1;
      //busca os dados do produto pelo seu id
      const { data } = await axios.get(`/api/products/${product._id}`)
      //verifica se o estoque do produto é menor que a quantidade no carrinho
      if(data.countInStock < quantity){
        window.alert('Desculpe. Produto sem estoque')
        return
      }
      //adiciona o produto ao carrinho + quantidade atualizada
      ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}});
      navigate('/cart')
    }
    return loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div className="container mt-3">
        <Row>
          <Col md={6}>
            <img className="img-large" src={product.image} alt={product.name}></img>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-evenly">
              <div>
                <h1 className="pb-3">{product.name}</h1>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
                </div>
                <div>
                    <Row>
                      <Col>R$:</Col>
                      <Col>{product.price.toFixed(2)}</Col>
                    </Row>
                    <Row className="pb-3">
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ?
                      <Badge bg="success">Em Estoque</Badge>:
                      <Badge bg="danger">Sem Estoque</Badge>
                      }</Col>
                    </Row>
                  {product.countInStock > 0 && (
                      <div className="d-grid pb-3">
                        <Button onClick={addToCartHandler}>
                          Carrinho
                        </Button>
                      </div>
                  )}
                  {product.description}
                  </div>
          </Col>
        </Row>
      </div>
    );
  }

export default ProductScreen