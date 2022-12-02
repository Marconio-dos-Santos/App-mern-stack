import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler"
import { generateToken } from "../utils.js";

const router = express.Router();
//usa a rota /signin para autenticar e logar o usuario
router.post(
    "/signin",
    expressAsyncHandler( async (req, res) => {
      const user = await User.findOne( { email: req.body.email } )// faz uma busca no banco de dados para ver se o usuario existe
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          //usa o metodo do bcrypt para comparar as senhas
          res.send({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: "Email ou Senha invalido" }); // mensagem de erro se o usuario não existir
    })
);
export default router;