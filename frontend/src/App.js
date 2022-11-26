import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import HomeScreen from "./pages/HomeScreen"
import ProductScreen from "./pages/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
          
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
