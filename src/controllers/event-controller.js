import { Router } from "express";
import EventService from "./../services/event-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";
import JwtHelper from "../helpers/jwt-helper.js";


const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
  let respuesta;
  const { name, category, startdate, tag } = req.query;
  const params = { name, category, startdate, tag };
  console.log(params);
  const returnArray = await svc.getEventAllAsync(params);
  if (returnArray != null) {
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});

/*CRUD***************************************************************************/

router.post('', async (req, res) => {
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  if (!payloadoriginal) //payloadoriginal != null
  {
    return res.status(401).send('Unauthorized. Usuario no autenticado');
  }
  req.user = payloadoriginal;
  
  const event_nuevo = req.body;
  const verif_name = validacionesHelper.getverifTDO(event_nuevo.name, "hola");
  const verif_descripcion = validacionesHelper.getverifTDO(event_nuevo.description, "hola")
  const verif_max_assistance = await validacionesHelper.getmax_capacity(event_nuevo.id_event_location, event_nuevo.max_assistance, "hola" );
  const verif_priceAndDuration = validacionesHelper.getprice_duration(event_nuevo.duration_in_minutes, -1, event_nuevo.price);
 
  if (verif_name === "hola" || verif_descripcion === "hola") {
    return res.status(400).send('Bad request: el nombre está vacío o contiene menos de 3 caracteres');
  } else if (verif_max_assistance==="hola")
    return res.status(400).send('Bad request: no hay espacio disponible');
  else if (!verif_priceAndDuration)
    return res.status(400).send('Bad request: el precio o la duración es menor que cero');

  try {
    const result = await svc.createEventAsync(event_nuevo);
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
export default router;