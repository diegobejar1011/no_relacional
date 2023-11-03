const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
    id_entrega: {
        type: Number,
        required: true
    },
    id_producto: {
        type: Number,
        required: true
    },
    id_lugar: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    id_horario: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    created_at:{
        type: Date,
        required: false,
        default: new Date()
    },
    updated_at:{
        type: Date,
        required: false,
        default: null
    },
    deleted: {
        type: String,
        required: false,
        default: false,
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    }
});

module.exports = mongoose.model('Pedido', pedidoSchema);