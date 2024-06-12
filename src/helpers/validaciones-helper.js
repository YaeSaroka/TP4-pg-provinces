import EventLocationRepository from "../repositories/event-locations-repository.js";
import EventEnrollmentRepository from "../repositories/event-enrollment.js";
import jwt from "jsonwebtoken";
import EventRepository from "../repositories/event-repository.js";
import HelperRepository from "../repositories/helper.js";
class ValidacionesHelper {
  /**
   * Este método recibe un 'value', e intenta convertirlo a un número entero,
   * si por alguna razón falla retorna el 'defaultValue', sino el valor
   * numérico entero del parámetro 'value'.
   * @param {*} value valor a verificar.
   * @param {*} defaultValue valor por default en el caso de que 'value' no
   * se pueda convertir a un número entero.
   * @returns Un número entero.
   *
   * @example
   * let result1 = ValidacionesHelper.getIntegerOrDefault("10", 1); // returns: 10
   * let result2 = ValidacionesHelper.getIntegerOrDefault(null, 1); // returns: 1
   * let result3 = ValidacionesHelper.getIntegerOrDefault("hello", 1); // returns: 1
   */
  getIntegerOrDefault = (value, defaultValue) => {
    let valorRecibido = null;
    valorRecibido = parseInt(value);
    if (isNaN(valorRecibido) || valorRecibido == null || valorRecibido == NaN)
      return defaultValue;
    else return valorRecibido;
  };
  /**
   * Este método recibe un 'value', en el caso de que sea undefined o null
   * retorna el 'defaultValue', sino el valor del parámetro 'value'.
   * @param {*} value valor a verificar.
   * @param {*} defaultValue valor por default en el caso de que 'value' sea
   * undefined o null.
   * @returns Un número entero.
   *
   * @example
   * let variable;
   * let result1 = ValidacionesHelper.getStringOrDefault("10", ""); // returns: "10"
   * let result2 = ValidacionesHelper.getStringOrDefault(null, "TEST"); // returns: "TEST"
   * let result3 = ValidacionesHelper.getStringOrDefault(variable, "TEST"); // returns: "TEST"
   */
  getStringOrDefault = (value, defaultValue) => {
    let valorRecibido;
    valorRecibido = value.toString(value);
    if (isNaN(valorRecibido) || valorRecibido == null || valorRecibido == NaN)
      return valorRecibido;
    else return defaultValue;
  };

  /**
   * Este método recibe un 'value', en el caso de que sea undefined o null
   * retorna el 'defaultValue', sino el valor del parámetro 'value'.
   * @param {*} value valor a verificar.
   * @param {*} defaultValue valor por default en el caso de que 'value' sea
   * undefined o null.
   * @returns Un número entero.
   *
   * @example
   * let variable;
   * let result1 = ValidacionesHelper.getStringOrDefault("10", ""); // returns: "10"
   * let result2 = ValidacionesHelper.getStringOrDefault(null, "TEST"); // returns: "TEST"
   * let result3 = ValidacionesHelper.getStringOrDefault(variable, "TEST"); // returns: "TEST"
   */

  getverifTDO = (value, defaultValue) => {
    if (!value || value.length < 3) return defaultValue;
    return value;
  };

  getVerificacionMail = (value, defaultValue) => {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !patron.test(value)) return defaultValue; //ACÁ SE FIJA SI EL VALUE ES NULL, UNDEFINED, ECT.
    //el método .test se usa para verificar si el texto (username en este caso) coincide con el patron de mail (es un bool. devuelve true si coincide y sino un false)
    return value;
  };

  getprice_duration = (value, defaultValue, price) => {
    if (value < 0 || price < 0) return defaultValue;
    return true;
  };
  getmax_capacity = async (id_event_location, max_assistance, defaultValue) => {
    const repo = new EventLocationRepository(); // Suponiendo que tengas un repositorio para la tabla event_locations
    try {
      // Obtener el max_capacity de la ubicación del evento
      const max_capacity = await repo.getMaxCapacity(id_event_location);
      console.log("id_location: ", id_event_location);
      console.log(max_capacity);
      console.log(max_assistance);
      // Validar que max_assistance sea menor o igual que max_capacity
      if (max_assistance > max_capacity) {
        return defaultValue;
      } else return max_assistance;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  nullEvent_Enrollment = async (id, defaultValue) => {
    const repo = new EventEnrollmentRepository();
    console.log("holaaa");
    console.log(id);
    try {
      const gente_registrada_evento = await repo.getEnrollmentParaEventAsync(id);
      
      console.log("HELPER: ", gente_registrada_evento);
      console.log("id: ", id);
      if (
        isNaN(gente_registrada_evento) ||gente_registrada_evento == null ||gente_registrada_evento == NaN
      ){
        console.log("holla");
        return gente_registrada_evento;
      } 
      else return defaultValue;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  verificarFechaRatinEventEnrollment = async (id_event, defaultvalue) => {
    const repo = new EventRepository();
    const evento= await repo.getEventById(id_event);
    let fecha_inicio = new Date("fecha evento",evento);
    const fechaActual = new Date();
    if (fecha_inicio <= fechaActual) {
      return defaultvalue;
    }
    else return id_event;
  };
  
  verificar_rating = async (rating, defaultvalue) => {
    console.log("rating", rating);
    if (rating < 1 || rating > 10) {
      return defaultvalue;
    } else {
      return rating;
    }
  };
    
  getEventMaxAssistance = async (id_event, defaultvalue) => {
    const repo = new HelperRepository();
    const total_usuarios_registrados_por_evento = await repo.countTotalUsersEventEnrollment(id_event);
    const max_assistance = await repo.getEventMaxAssistanceasync(id_event);
    if (total_usuarios_registrados_por_evento >= max_assistance) {
      return defaultvalue;
    } else {
      return id_event;
    }
  };

  isEnableForEnrollment = async (id_event, defaultvalue) => {
    const repo= new HelperRepository();
    const enabled = await repo.isEnableForEnrollment(id_event);
    console.log("enabled", enabled);
    if (!enabled) {
      return defaultvalue;
    }
    else return id_event;
  };

  isAlreadyRegisterInEvent = async (id_event, defaultvalue, id_user) => {
    const repo= new EventEnrollmentRepository();
    const registrado = await repo.selectUserFromEventEnrollment(id_event, id_user);
    console.log("registrado", registrado);
    
    if (registrado == 0) {
      return id_event; // Usuario ya está registrado
    } else  
      return defaultvalue ; // Usuario no está registrado
    
  };

}
export default new ValidacionesHelper();
