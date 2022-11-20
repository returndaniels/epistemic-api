const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const appRouter = require("./routes/app.routes");
const userRouter = require("./routes/user.routes");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/", appRouter);
app.use("/user", userRouter);

server.listen(port, () => console.log(`Server has started.`));
