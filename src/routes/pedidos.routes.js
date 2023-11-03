const express = require('express');
const router = express.Router();
const pedidoController = require("../controllers/pedidos.controller");
const pedidosController = require('../controllers/pedidos.controller');
const authMiddleware = require('../middlewares/pedido.middleware');

router.post("/", authMiddleware.verificarJWT ,pedidoController.createPedido);
router.get("/", authMiddleware.verificarJWT, pedidoController.getPedidos);
router.get("/pedido/:id",authMiddleware.verificarJWT, pedidoController.getByIdPedido);
router.delete("/delete/:id",authMiddleware.verificarJWT, pedidoController.delete);
router.put("/update/:id",authMiddleware.verificarJWT, pedidoController.updateCompletoPedido);
router.patch("/parcialUpdate/:id",authMiddleware.verificarJWT, pedidosController.updateParcialPedido)

module.exports = router;