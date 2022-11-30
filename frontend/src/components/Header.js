import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Badge from "react-bootstrap/Badge"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { Store } from "../Store"

const Header = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>APP</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.length}
                      </Badge>
                    )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
    </header>
  )
}

export default Header