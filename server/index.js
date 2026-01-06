let express = require('express');
let cors = require('cors');
let app = express();
let {libraryRouter} = require('./routes/libraryRouter')

require('dotenv').config();

app.use(express.json());
app.use(cors()); // to avoid diffrent port issues

let mongoose = require('mongoose');

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Conneted to Database");
    app.listen(process.env.PORT || '3001',()=>{
        console.log("Sever is Running");
    });
}).catch((err)=>{
    console.log("Error connecting ",err);
});

app.use('/api/website/library',libraryRouter);


//http:localhost:3005/api/website/library/insert
//http:localhost:3005/api/website/library/update