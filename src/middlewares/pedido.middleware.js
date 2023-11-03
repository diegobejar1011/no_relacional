const jwt = require('jsonwebtoken');
const secret = "mi-palabra-secreta";

const verificarJWT = (req, res, next) =>{
    const token = req.get('Authorization');

    jwt.verify(token, jwtSecret, (error, decode)=>{
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

