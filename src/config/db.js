const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoBD"))
.catch((error)=>console.error(error));