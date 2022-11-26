import HomeScreen from "./pages/HomeScreen"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <>
        <header>
        <a href='/'>Home</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
          
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
