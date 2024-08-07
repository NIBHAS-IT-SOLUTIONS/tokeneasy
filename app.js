const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet=require('helmet')
const morgan=require('morgan')

const app = express();
const PORT = process.env.PORT || 5000;
const configDatabase=require('./server/database/Database')

// const userRouter=require('./routes/Userroutes')
// const menuRouter=require('./routes/menuroutesadmin')
// const adminRouter=require('./routes/adminroutes')

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
configDatabase()

 
// app.use('/api/user',userRouter)
// app.use('/api/menu/admin',menuRouter)
// app.use('/api/admin',adminRouter)


 

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

module.exports = app;