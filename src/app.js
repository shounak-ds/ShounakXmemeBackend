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

mongoose.connect(config.mongoose.url).then(() => {

  console.log("Connected to MongoDB");

});

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});
