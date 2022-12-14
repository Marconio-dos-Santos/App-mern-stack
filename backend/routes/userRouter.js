import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler"
import { generateToken, isAuth } from "../utils.js";

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
            name: user.name,
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
router.post(
  "/signup",
  expressAsyncHandler( async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    }); // cria um objeto usando os dados da requisição enviada pelo corpo do formulario e usa o metodo .hashSync na senha antes de enviar para banco de dados
    const user = await newUser.save(); // salva no banco de dados o novo usuario
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    }); // e envia para o Frontend
  }));

  router.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
  
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
  );
  
  
export default router;