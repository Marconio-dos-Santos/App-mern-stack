import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"

const Header = () => {
  return (
    <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>APP</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
    </header>
  )
}

export default Header