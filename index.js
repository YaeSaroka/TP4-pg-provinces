import express from "express";
import cors from "cors";
import config from "./src/configs/db-config.js";
//PROVINCIAS

import ProvinceRouter from "./src/controllers/province-controller.js";
import Province from "./src/entities/province.js";
import ProvinceRepository from "./src/repositories/province-repository.js";
import ProvinceService from "./src/services/province-service.js";
import router from "./src/controllers/province-controller.js";

//CATEGORÍAS
import CategoryRouter from './src/controllers/category-controller.js';
import Category from './src/entities/category.js';
import CategoryRepository from './src/repositories/category-repository.js';
import CategoryService from './src/services/category-service.js';
import router_ from './src/controllers/category-controller.js';

//LOCATIONS
import LocationRouter from './src/controllers/location-controller.js';
import Location from './src/entities/location.js';
import LocationRepository  from "./src/repositories/location-repository.js";
import LocationService from "./src/services/location-service.js";
import _router from './src/controllers/location-controller.js';


const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.


app.use("/api/province", ProvinceRouter);
app.use("/api/event-category", CategoryRouter);
app.use("/api/location", LocationRouter);
// Inicio el Server y lo pongo a escuchar.


app.get('/api/province', ProvinceRouter);
app.get('/api/event-category', CategoryRouter);
app.get('/api/location', LocationRouter);


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})