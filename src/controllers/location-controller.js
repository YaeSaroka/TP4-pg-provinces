import { Router } from "express";
import LocationService from "./../services/location-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";
import JwtHelper from "../helpers/jwt-helper.js";

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
router.get('/:id/event-location', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    //SACAMOS CARACTERES PARA QUE QUEDE SOLO EL TOKEN
    let token = req.headers.authorization.substring(7);
    //DESENCRIPTAMOS
    let payloadoriginal = await JwtHelper.desencriptarToken(token);
    if (payloadoriginal != null) 
    {
      req.user = payloadoriginal;
      const returnArray = await svc.getLocationByIdAsync(id);
  
      if (returnArray !== null && Array.isArray(returnArray) && returnArray.length > 0) //Array.isArray(returnArray) verifica que sea un array
      {
        respuesta = res.status(200).json(returnArray);
      } else if (returnArray === null || (Array.isArray(returnArray) && returnArray.length === 0)) {
        respuesta = res.status(404).send('Not Found.');
      } else {
        respuesta = res.status(500).send('Unauthorized. Usuario no autenticado');
      }
    }
    return respuesta;
});

export default router;