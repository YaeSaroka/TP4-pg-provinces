import { Router } from "express";
import EventLocationService from "./../services/event-locations-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";
import JwtHelper from "../helpers/jwt-helper.js";

const router = Router();
const svc = new EventLocationService();

router.get("", async (req, res) => {
  let respuesta;
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
 
  if (payloadoriginal != null) {
    req.user = payloadoriginal;
    const returnArray = await svc.getEventLocationAllAsync();
    if (returnArray != null) {
      respuesta = res.status(200).json(returnArray);
    } else respuesta = res.status(500).send(`Error interno.`);
  } else {
    respuesta = res.status(401).send(`Unauthorized. Usuario no autenticado`);
  }
  return respuesta;
});

router.get('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;
  //SACAMOS CARACTERES PARA QUE QUEDE SOLO EL TOKEN
  let token = req.headers.authorization.substring(7);
  //DESENCRIPTAMOS
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  console.log(payloadoriginal);
  if (payloadoriginal != null) 
  {
    req.user = payloadoriginal;
    const returnArray = await svc.getEventLocationByIdAsync(id);

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



router.post('', async(req, res)=> {
  const event_location_nueva = req.body;
  //TOKEN
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  //-----------------------------------------------------------------------
  if (!payloadoriginal) //payloadoriginal != null
  {
    return res.status(500).send('Unauthorized. Usuario no autenticado');
  }
    
    req.user = payloadoriginal;
    
    const verif_name = validacionesHelper.getverifTDO(event_location_nueva.name, "hola");
    const verif_full_Address= validacionesHelper.getverifTDO(event_location_nueva.full_address, "hola");
    const id_location= await svc.getEventLocationByIdAsync(event_location_nueva.id_location);
  
    if (verif_name === "hola" || verif_full_Address === "hola" ) {
      return res.status(400).send('Bad request: el nombre o la dirección está vacío o contiene menos de 3 caracteres');
    } else if (id_location === null || (Array.isArray(id_location) && id_location.length === 0)) 
      return res.status(400).send('Bad request: id inexistente');
    
  try {
    const result = await svc.createEventLocationAsync(event_location_nueva);
    if (result && result.length > 0) {
      return res.status(201).send('Created. OK');
    } else {
      return res.status(500).send('Error interno: la inserción no tuvo efecto');
    }
  } catch (error) {
    console.error('Error interno:', error);
    return res.status(500).send('Error interno');
  }
})


router.put('', async (req, res) => {
  const event_location_Actualizada = req.body;
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  
  if (!payloadoriginal) {
    return res.status(500).send('Unauthorized. Usuario no autenticado');
  }
  req.user = payloadoriginal;
  
  const verif_name = validacionesHelper.getverifTDO(event_location_Actualizada.name, "hola");
  const verif_full_Address = validacionesHelper.getverifTDO(event_location_Actualizada.full_address, "hola");
  const id_location = await svc.getEventLocationByIdAsync(event_location_Actualizada.id_location);
  
  if (verif_name === "hola" || verif_full_Address === "hola" ) {
    return res.status(400).send('Bad request: el nombre o la dirección está vacío o contiene menos de 3 caracteres');
  } else if (id_location === null || (Array.isArray(id_location) && id_location.length === 0)) 
    return res.status(400).send('Bad request: id inexistente');
  try {
    const result = await svc.updateEventLocationAsync(event_location_Actualizada);
    
    if (result > 0) {
      return res.status(200).send('Updated. OK');
    } else {
      return res.status(500).send('Error interno: La actualización no tuvo efecto');
    }
  } catch (error) {
    console.error('Error interno:', error);
    return res.status(500).send('Error interno');
  }
});





export default router;
