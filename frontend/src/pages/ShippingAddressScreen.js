import Form from "react-bootstrap/Form";
import { Store } from "../Store";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
      } = state;

      const [fullName, setFullName] = useState(shippingAddress.fullName || "");
      const [address, setAddress] = useState(shippingAddress.address || "");
      const [city, setCity] = useState(shippingAddress.city || "");
      const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");

    useEffect(() => {
    if (!userInfo) {
        navigate("/signin?redirect=/shipping");
    }
    }, [userInfo, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: {
              fullName,
              address,
              city,
              postalCode,
            },
        });
          localStorage.setItem(
            "shippingAddress",
            JSON.stringify({
              fullName,
              address,
              city,
              postalCode,
            })
          );
        navigate("/payment");
    }
    return (
      <div className="mx-3">
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
          <h1 className="my-3">Endereço de envio</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mb-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  };
  
  export default ShippingAddressScreen;