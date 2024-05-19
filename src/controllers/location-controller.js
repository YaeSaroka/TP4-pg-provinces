import { Router } from "express";
import LocationService from "./../services/location-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";

const router = Router();
const svc = new LocationService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getLocationAllAsync();
    if (returnArray != null) {
        respuesta = res.status(200).json( returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

router.get('/:id', async (req, res) => {
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.getLocationByIdAsync(id);
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

export default router;