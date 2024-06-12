import { Router } from "express";
import EventEnrollmentService from "../services/event-enrollment.js";
import validacionesHelper from "../helpers/validaciones-helper.js";
import JwtHelper from "../helpers/jwt-helper.js";

const router = Router();
const svc = new EventEnrollmentService();
router.get("", async (req, res) => {
  let respuesta;
  const { id, first_name, last_name, username, attended, rating } = req.query;
  console.log(id);
  const params = { id, first_name, last_name, username, attended, rating };
  console.log(params);
  const returnArray = await svc.getEventEnrollmentAllAsync(params);
  if (returnArray != null && returnArray.length > 0) {
    respuesta = res.status(200).json(returnArray);
  } else respuesta = res.status(500).send(`Error interno.`);

  return respuesta;
});

router.patch('/event/:event_id/enrollment/:user_id', async (req, res) => {
  try {
    let token = req.headers.authorization.substring(7);
    let payloadoriginal = await JwtHelper.desencriptarToken(token);

    if (!payloadoriginal) {
      return res.status(401).send('Unauthorized. El usuario no se encuentra autenticado.');
    }

    req.user = payloadoriginal;
    const params = req.body;
    const { event_id, user_id } = req.params;

    const verif_gente_registrada_evento = await validacionesHelper.nullEvent_Enrollment(user_id, "hola");
    const verif_fecha = await validacionesHelper.verificarFechaRatinEventEnrollment(event_id, "chau");
    const verif_rating = await validacionesHelper.verificar_rating(params.rating, "bye");

    if (verif_gente_registrada_evento === "hola") {
      return res.status(400).send('BAD REQUEST: no existe el usuario en el evento');
    }

    if (verif_fecha === "chau") {
      return res.status(400).send('BAD REQUEST: no finalizó el evento');
    }

    if (verif_rating === "bye") {
      return res.status(400).send('BAD REQUEST: el rating debe tener valores entre 1 y 10 inclusive');
    }

    const returnArray = await svc.patchEventRating(params, user_id, event_id);
    console.log("return final", returnArray);
    
    if (returnArray > 0) {
      return res.status(200).json("OK");
    } else {
      return res.status(404).send('Evento no encontrado');
    }

  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).send("Error interno");
  }
});


router.post('/event/:id_user/enrollment', async(req, res)=> {
  try {
  let token = req.headers.authorization.substring(7);
  let payloadoriginal = await JwtHelper.desencriptarToken(token);

  if (!payloadoriginal) //payloadoriginal != null
    return res.status(500).send('Unauthorized. Usuario no autenticado');

    req.user = payloadoriginal;
    const id_event = req.headers.id_event;
    const description= req.headers.description;
    const id_user = parseInt(req.params.id_user);
    
    const verif_max_assistance = validacionesHelper.getEventMaxAssistance(id_event, "hola");
    const verif_fecha = await validacionesHelper.verificarFechaRatinEventEnrollment(id_event, "hola");
    const enabled= await validacionesHelper.isEnableForEnrollment(id_event,"hola");
    const ya_registrado= await validacionesHelper.isAlreadyRegisterInEvent(id_event, "hola", id_user);
  
    if (verif_max_assistance === "hola" )
      return res.status(400).send('Bad request: no hay más espacio');
    if (verif_fecha === "hola")
      return res.status(400).send('Bad request: el show ya finalizó o es hoy');
    if (enabled === "hola")
      return res.status(400).send('Bad request: el evento no está habilitado para la inscripción');
    if(ya_registrado === "hola")
      return res.status(400).send('Bad request: ya se encuentra registrado en este evento');
    
 
    const result = await svc.registerUserEventEnrollment(id_event, description, id_user);
    if (result && result.length > 0) 
      return res.status(201).send('Created. OK');
    else 
      return res.status(500).send('Error interno: la inserción no tuvo efecto');
    

}catch (error) {
    console.error('Error interno:', error);
    return res.status(500).send('Error interno');
  }
})
export default router;
