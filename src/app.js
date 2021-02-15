const express = require("express");
const routes = require("./routes/v1");
const mongoose = require("mongoose");
const captureDateMiddleware = require("./middleware/middleware");
const cors = require("cors");
const config = require("./config/config");

const app = express();

app.use(cors());
app.use(express.json());

app.use(captureDateMiddleware);

app.use("/v1", routes);

const url = `mongodb://Shounak:mongo@cluster0-shard-00-00.g6aii.mongodb.net:27017,cluster0-shard-00-01.g6aii.mongodb.net:27017,cluster0-shard-00-02.g6aii.mongodb.net:27017/imageapp?ssl=true&replicaSet=atlas-oumpcm-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});
