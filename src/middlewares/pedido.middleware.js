const jwt = require('jsonwebtoken');
import dotenv from "dotenv";

dotenv.config();

const verificarJWT = (req, res, next) =>{
    const token = req.get('Authorization');

    jwt.verify(token, process.env.JWTSECRET, (error, decode)=>{
        if(error){
            return res.status(401).send({
                message: "Error al validar token",
                error: error.message
            });
        }
        req.usuario= decode.usuario;
        next();
    })
};

module.exports={
    verificarJWT
}

