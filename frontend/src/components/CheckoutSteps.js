import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CheckoutSteps = (props) => {
  return (
    <Row className="checkout-steps">
        <Col className={props.step1 ? 'active' : ''}>Login</Col>
        <Col className={props.step2 ? 'active' : ''}>Envio</Col>
        <Col className={props.step3 ? 'active' : ''}>Pagamento</Col>
        <Col className={props.step4 ? 'active' : ''}>Resumo do pedido</Col>
    </Row>
  )
}

export default CheckoutSteps