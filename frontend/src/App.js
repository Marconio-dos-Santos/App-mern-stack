import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import HomeScreen from "./pages/HomeScreen"
import ProductScreen from "./pages/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Header />
        <HeroBanner />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
