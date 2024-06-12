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

//USERS LIST
import UserRouter from './src/controllers/user-controller.js';
import User from './src/entities/user.js';
import UserRepository from "./src/repositories/user-repository.js";
import UserService from "./src/services/user-service.js";
import routers from './src/controllers/user-controller.js';

//EVENTS COMUNES
import EventRouter from './src/controllers/event-controller.js';
import Event from './src/entities/events.js';
import EventRepository from "./src/repositories/event-repository.js";
import EventService from "./src/services/event-service.js";
import router_event from './src/controllers/event-controller.js';


//EVENT-LOCATIONS
import EventLocationRouter from './src/controllers/event-locations-controller.js';
import EventLocation from './src/entities/event-locations.js';
import EventLocationRepository from "./src/repositories/event-locations-repository.js";
import EventLocationService from './src/services/event-locations-service.js';
import router_eventlocation from './src/controllers/event-locations-controller.js';

//EVENT-ENROLLMENTS
import EventEnrollmentRouter from './src/controllers/event-enrollment.js';
import EventEnrollment from "./src/entities/event-enrollment.js";
import EventEnrollmentRepository from "./src/repositories/event-enrollment.js";
import EventEnrollementService from "./src/services/event-enrollment.js";
import router_event_Enrollment from './src/controllers/event-enrollment.js';

const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.


app.use("/api/province", ProvinceRouter);
app.use("/api/event-category", CategoryRouter);
app.use("/api/location", LocationRouter);
app.use("/api/user", UserRouter);
app.use("/api/event", EventRouter);
app.use("/api/event-location", EventLocationRouter);
app.use("/api/event-enrollment", EventEnrollmentRouter);
app.use("/api", EventEnrollmentRouter);
// Inicio el Server y lo pongo a escuchar.


app.get('/api/province', ProvinceRouter);
app.get('/api/event-category', CategoryRouter);
app.get('/api/location', LocationRouter);
app.use("/api/event", EventRouter);
app.use("/api/event-location", EventLocationRouter);
app.use("/api/event-enrollment", EventEnrollmentRouter);
app.use("/api", EventEnrollmentRouter);

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})