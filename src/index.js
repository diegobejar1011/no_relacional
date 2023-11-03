const express = require('express');

require('dotenv').config();

const pedidosRoutes = require("./routes/pedidos.routes")
require('../src/config/db');

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use("/api", pedidosRoutes);


//routes
app.get("/",(req,res)=>{
    res.send("Welcome to my API")
});
 
app.listen(port, ()=>console.log('server listening on port',port));