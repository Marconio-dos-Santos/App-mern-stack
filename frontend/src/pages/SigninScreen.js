import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";

const SigninScreen = () => {
  const navigate = useNavigate(); //react router dom hook
  const { search } = useLocation(); //react router dom hook
  const redirectInUrl = new URLSearchParams(search).get("redirect"); //usando o metodo URLSearchParams no objeto search que veio de useLocation pegue o redirect no URL "no caso shipping"
  const redirect = redirectInUrl ? redirectInUrl : "/"; //se existir redirect no URL atribua a variavel se não o padrão sera ' / no caso ProductsScreen'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //renomeia dispatch para ctxDispatch
  //useContext da acesso ao state e permição de modificar usando ctxDispatch
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    //para confirmar o usuario envia os dados email e password pelo formulario
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      //com a resposta da requisição atualiza userInfo em Store.js
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      //salva os dados do usuario em locarStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      console.log("Email ou Senha invalido");
    }
  };
  //verifica userInfo e redireciona para / no caso ProductsScreen não permitindo usuario logado de ver sinningScreen
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <h1 className="my-3">Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Login</Button>
        </div>
        <div className="mb-3">
          Não tem uma conta?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Criar conta</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SigninScreen;
