import { Router } from "express";
import EventService from "./../services/event-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";

const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getEventAllAsync();
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

export default router;