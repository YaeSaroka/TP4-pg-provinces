import { Router } from "express";
import EventService from "./../services/event-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";


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
/*
router.get('name/:name', async (req, res) => {
  let respuesta;
  const name = req.params.name;
  const returnArray = await svc.getEventByNameAsync(name);
  if (returnArray != null) {
    respuesta = res.status(200).json(returnArray);
  }
  else respuesta = res.status(500).send(`Error interno.`)
  return respuesta;
})

router.get('/category/:category', async (req, res) => {
  let respuesta;
  const category = req.params.category;
  const returnArray = await svc.getEventByCategoryAsync(category);
  if (returnArray != null) {
    respuesta = res.status(200).json(returnArray);
  }
  else respuesta = res.status(500).send(`Error interno.`)
  return respuesta;
})
router.get('/startdate/:startdate', async (req, res) => {
  let respuesta;
  const startdate = req.params.startdate;
  const returnArray = await svc.getEventByStarDateyAsync(startdate);
  if (returnArray != null) {
    respuesta = res.status(200).json(returnArray);
  }
  else respuesta = res.status(500).send(`Error interno.`)
  return respuesta;
})
router.get('/tag/:tag', async (req, res) => {
  let respuesta;
  const tag = req.params.tag;
  const returnArray = await svc.getEventByTagAsync(tag);
  if (returnArray != null) {
    respuesta = res.status(200).json(returnArray);
  }
  else respuesta = res.status(500).send(`Error interno.`)
  return respuesta;
})


/*CRUD***************************************************************************/


router.post('', async (req, res) => {
  const event_nuevo = req.body;
  const max_assitance = event_nuevo.max_assitance;
  const price = event_nuevo.price;
  const duration = event_nuevo.duration_in_minutes;
  //TOKEN
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  //-----------------------------------------------------------------------
  if (!payloadoriginal) //payloadoriginal != null
  {
    return res.status(401).send('Unauthorized. Usuario no autenticado');
  }
  req.user = payloadoriginal;

  const verif_name = validacionesHelper.getverifTDO(event_location_nueva.name, "hola");

  const returnArray = await svc.selectmax_capacity(event_nuevo.id_event_location);
  if (returnArray != null) {
    let max_capacity = res.status(200).json(returnArray);
  }
  else max_capacity = res.status(500).send(`Error interno.`)


  max_capacity = validacionesHelper.getmax_capacity(max_assitance, -1, max_capacity);
  const duration_verif = await svc.getprice_duration(duration, -1, price);

  if (verif_name === "hola") {
    return res.status(400).send('Bad request: el nombre está vacío o contiene menos de 3 caracteres');
  } else if (max_capacity === -1)
    return res.status(400).send('Bad request: no espacio disponible');
  else if (duration_verif === -1)
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