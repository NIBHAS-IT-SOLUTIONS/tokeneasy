const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet=require('helmet')
const morgan=require('morgan')

const cookieSession = require("cookie-session");

const app = express();
const PORT = process.env.PORT || 5000;
const configDatabase=require('./server/database/Database')

const patientRouter=require('./server/routes/PatientRouter')
const HospitallStaffRouter=require('./server/routes/HospitalStaffRouter')
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



 
app.use('/quicktoken/api/patient',patientRouter)
app.use('/quicktoken/api/admin',adminRouter)
app.use('/quicktoken/api/hospitalstaff',HospitallStaffRouter)





app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

module.exports = app;
