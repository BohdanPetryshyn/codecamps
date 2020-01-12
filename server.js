const express = require("express");
const bootcamps = require("./routes/bootcamps");

require("dotenv").config({ path: "./config/config.env" });

const app = express();

app.use("/api/v1/bootcamps", bootcamps);

app.listen(process.env.PORT, () => console.log("The server has started."));
