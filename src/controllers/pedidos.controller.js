const pedidoSchema = require('../models/pedido');

const createPedido = async (req, res) =>{
    try{
        let pedido = new pedidoSchema(req.body);

        await pedido.save();

        return res.status(201).json({
            message: "Pedido creado exitosamente"
        })
    }catch(error){
        return res.status(500).json({
            message: "Fallo al crear nuevo pedido",
            error: error.message
        })
    }
}

const getPedidos = async (req, res)=>{
    try{
        const {page, limit} = req.query;
        const skip = (page - 1) * limit; 
        let pedidos = await pedidoSchema.find({deleted: "N"}).skip(skip).limit(limit);

        
        let response={
            message: "Se obtuvieron los pedidos correcamente",
            data: pedidos
        }

       
        if(page && limit){
            const totalPedidos = await pedidoSchema.countDocuments({deleted: "N"});
            const totalPages = Math.ceil(totalPedidos/limit);
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalPedidos,
                totalPages,
                currentPage,
            }
        }
    

        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json({
            message: "Ocurrió un error al obtener los pedidos",
            error: error.message
        })
    }
}

const getByIdPedido = async (req, res)=>{
    try{
        const {id} = req.params;
        const pedido= await pedidoSchema.findById(id);

        if(!pedido){
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido obtenido exitosamente",
            pedido
        })
    }catch(error){
        return res.status(500).json({
            message: "Ocurrio un error al obtener el pedido",
            error: error.message
        })
    }
}

const updateParcialPedido = async (req, res) => {
    try{
        const {id} = req.params;
        const datosActualizar={
            ...req.body,
            updated_at: new Date()
        }

        const pedidoActualizado = await pedidoSchema.findByIdAndUpdate(id, datosActualizar);

        if(!pedidoActualizado){
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido actualizado exitosamente",
            data:pedidoActualizado
        })
    }catch(error){
        return res.status(500).json({
            message: "Ocurrió un error al editar el pedido",
            error: error.message
        })
    }
}

const updateCompletoPedido = async (req, res)=>{
    try{
        const {id} = req.params;
        const datosActualizar={
            ...Object.fromEntries(
                Object.entries(req.body).map(([key, value]) => [key, value || null])
            ),
            updated_at: new Date()
        }

        const pedidoActualizado = await pedidoSchema.findByIdAndUpdate(id,datosActualizar);

        if(!pedidoActualizado){
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido actualizado exitosamente"
        });

    }catch(error){

        return res.status(500).json({
            message: "Ocurrio un error al editar el pedido",
            error: error.message
        });

    }
}

const deleteLogicoPedido = async (req, res)=>{
    try{
        const {id} = req.params;
        const pedidoEliminado = await pedidoSchema.findByIdAndUpdate(id, {deleted: true, deleted_at: new Date()});

        if(!pedidoEliminado){
            return res.status(404).json({
                message: "Pedido no encontrado"
            })
        }

        return res.status(200).json({
            message: "Pedido eliminado correctamente"
        })
    }catch(error){
        return res.status(500).json({
            message: "Ocurrió un error al eliminar el pedido",
            error: error.message
        })
    }
}

const deleteFisicoPedido= async (req, res)=>{
    try{
        const {id}= req.params
        const pedidoEliminado = await pedidoSchema.findByIdandDelete(id);

        if(!pedidoEliminado){
            return res.status(404).json({
            message: "Pedido no encontrado"
            })
        }

        return res.status(200).json({
            message: "Pedido eliminado correctamente"
        })
    }catch(error){
        return res.status(500).json({
            message: "Ocurrió un error al eliminar el pedido",
            error: error.message
        })
    }
    

}

module.exports = {
    createPedido,
    getPedidos,
    getByIdPedido,
    updateCompletoPedido,
    updateParcialPedido,
    delete: deleteLogicoPedido
}