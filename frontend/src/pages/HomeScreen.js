import { useEffect, useReducer } from 'react'
import axios from 'axios'
import Products from '../components/Products'

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
      <h1>Produtos</h1>
      <div className="products">
        {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
          <div>
            {products.map((product) => (
              <div key={product.slug} className="product">
                <Products product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      </section>
  )
}

export default HomeScreen