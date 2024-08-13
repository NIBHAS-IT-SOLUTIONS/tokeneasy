const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet=require('helmet')
const morgan=require('morgan')



var passport = require('passport');
const authGoogleRoute = require("./server/routes/authGoogle");
const cookieSession = require("cookie-session");
const passportStrategy = require("./server/utils/passport");



const app = express();
const PORT = process.env.PORT || 5000;
const configDatabase=require('./server/database/Database')

const patientRouter=require('./server/routes/PatientRouter')
// const menuRouter=require('./routes/menuroutesadmin')
const adminRouter=require('./server/routes/adminRouter')

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.json());
configDatabase()
app.use(
	cookieSession({
		name: "session",
		keys: ["quicktoken"],
		maxAge: 24 * 60 * 60 * 100,
	})
);



app.use(passport.initialize());
app.use(passport.session());


 
app.use('/quicktoken/api/patient',patientRouter)
app.use('/quicktoken/api/admin',adminRouter)
app.use('/',authGoogleRoute)

// app.use('/api/menu/admin',menuRouter)
// app.use('/api/admin',adminRouter)




app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

module.exports = app;
