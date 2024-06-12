import { Router } from "express";
import EventService from "./../services/event-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";
import JwtHelper from "../helpers/jwt-helper.js";

const router = Router();
const svc = new EventService();

/*CRUD***************************************************************************/

router.post('', async (req, res) => {
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  if (!payloadoriginal) {
    //payloadoriginal != null
    return res.status(401).send("Unauthorized. Usuario no autenticado");
  }
  req.user = payloadoriginal;

  const event_nuevo = req.body;
  const verif_name = validacionesHelper.getverifTDO(event_nuevo.name, "hola");
  const verif_descripcion = validacionesHelper.getverifTDO(
    event_nuevo.description,
    "hola"
  );
  const verif_max_assistance = await validacionesHelper.getmax_capacity(
    event_nuevo.id_event_location,
    event_nuevo.max_assistance,
    "hola"
  );
  const verif_priceAndDuration = validacionesHelper.getprice_duration(
    event_nuevo.duration_in_minutes,
    -1,
    event_nuevo.price
  );

  if (verif_name === "hola" || verif_descripcion === "hola") {
    return res
      .status(400)
      .send(
        "Bad request: el nombre está vacío o contiene menos de 3 caracteres"
      );
  } else if (verif_max_assistance === "hola")
    return res.status(400).send("Bad request: no hay espacio disponible");
  else if (!verif_priceAndDuration)
    return res
      .status(400)
      .send("Bad request: el precio o la duración es menor que cero");

  try {
    const result = await svc.createEventAsync(event_nuevo);
    if (result && result.length > 0) {
      return res.status(201).send("Created. OK");
    } else {
      return res.status(500).send("Error interno: la inserción no tuvo efecto");
    }
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).send("Error interno");
  }
});

router.put("", async (req, res) => {
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  if (!payloadoriginal) {
    //payloadoriginal != null
    return res.status(401).send("Unauthorized. Usuario no autenticado");
  }
  req.user = payloadoriginal;

  const evento_actualizado = req.body;

  const verif_name = validacionesHelper.getverifTDO(
    evento_actualizado.name,
    "hola"
  );
  const verif_descripcion = validacionesHelper.getverifTDO(
    evento_actualizado.description,
    "hola"
  );
  const verif_max_assistance = await validacionesHelper.getmax_capacity(
    evento_actualizado.id_event_location,
    evento_actualizado.max_assistance,
    "hola"
  );
  const verif_priceAndDuration = validacionesHelper.getprice_duration(
    evento_actualizado.duration_in_minutes,
    -1,
    evento_actualizado.price
  );

  if (verif_name === "hola" || verif_descripcion === "hola") {
    return res
      .status(400)
      .send(
        "Bad request: el nombre está vacío o contiene menos de 3 caracteres"
      );
  } else if (verif_max_assistance === "hola")
    return res.status(400).send("Bad request: no hay espacio disponible");
  else if (!verif_priceAndDuration)
    return res
      .status(400)
      .send("Bad request: el precio o la duración es menor que cero");

  try {
    const result = await svc.updateEventAsync(evento_actualizado);
    if (result && result.length > 0) {
      return res.status(201).send("Created. OK");
    } else {
      return res.status(500).send("Error interno: la inserción no tuvo efecto");
    }
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).send("Error interno");
  }
});

router.delete("/:id", async (req, res) => {
  let respuesta;
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);
  if (!payloadoriginal) {
    //payloadoriginal != null
    return res.status(401).send("Unauthorized. Usuario no autenticado");
  }
  req.user = payloadoriginal;
  const id = req.params.id;
  const verif_gente_registrada_evento = await validacionesHelper.nullEvent_Enrollment(id, "hola");
  console.log("gente: ", verif_gente_registrada_evento);
  if (verif_gente_registrada_evento === "hola") {
    return res.status(400).send("Bad request: Existe al menos un usuario registrado al evento.");
  } 
  else if (verif_gente_registrada_evento === undefined) 
  {
    respuesta = res.status(200).send("Deleted. OK");
  } else return res.status(404).send("Not found");

  try {
    const returnArray = await svc.deleteEventAsync(id);
    console.log("eliminado");
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).send("Error interno");
  }
  return respuesta;
});

router.get('/:id', async (req, res) => {
  const id= req.params.id
  let respuesta;
  const returnArray = await svc.getDetalleEvento(id,60,0);
  if (returnArray != null) {
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});


/*REVISAR*/
router.get('/', async (req, res) => {
    const limit = 60;
    const offset = 0;
    let respuesta;

    try {
        const { events, total } = await svc.getAllEvents(limit, offset);
        const pagination = {
            limit,
            offset,
            nextPage: offset + limit < total ? offset + limit : null,
            total
        };
        respuesta = res.status(200).json({
            collection: events.length > 0 ? events : null,
            pagination
        });
    } catch (error) {
        console.error(error);
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
});

export default router;
