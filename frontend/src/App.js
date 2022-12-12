
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen"
import ProductScreen from "./pages/ProductScreen";
import SigninScreen from "./pages/SigninScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import SignupScreen from "./pages/SignupScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./pages/DashboardScreen";
import AdminRoute from "./components/AdminRoute";


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
        <Header />

        <main>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              } />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>}>  
              </Route>
              <Route path="orderhistory" element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>}>
              </Route>
              <Route path="/payment" element={<PaymentMethodScreen />} />
               {/* Admin Routes */}
               <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
