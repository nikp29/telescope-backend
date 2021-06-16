import express from "express";
// const routesApi = require('./api/routes/index');
import bodyParser from "body-parser";
import routesApi from "./api/routes/index.js";

const server = express();
const port = process.env.PORT || 3000;
server.use(bodyParser.json());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api', routesApi);

server.listen(port, () => console.log('server started on port ' + port));

export default server;