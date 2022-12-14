import { useEffect, useReducer } from 'react'
import axios from 'axios'
import Product from '../components/Product'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import HeroBanner from '../components/HeroBanner'

//função de gerenciamento 'state' do componente
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
    //useReducer Hook, inicial state e dispatch metodo para atualizar o state
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
    useEffect(() =>{
      const fetchDataServices = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          //buscar produtos no backend usando ajax request para rota /api/products
          const result = await axios.get('/api/products')
          //atualizando 'state'
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: err.message });
        }
      }
      fetchDataServices()
    }, [])
  return (
    <section>
      <HeroBanner />
      <h1>Mais vendidos</h1>
      <div className="products-container container">
        {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product.slug} xs={6} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
      </section>
  )
}

export default HomeScreen