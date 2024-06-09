import EventLocationRepository from '../repositories/event-locations-repository.js';
import jwt from "jsonwebtoken";
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
        valorRecibido= parseInt(value);
        if(isNaN(valorRecibido) || valorRecibido == null || valorRecibido == NaN) return defaultValue;
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
        valorRecibido= value.toString(value);
        if(isNaN(valorRecibido) || valorRecibido == null || valorRecibido == NaN) return valorRecibido;
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
    
    getVerificacionMail = (value, defaultValue) =>{
        const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !patron.test(value)) return defaultValue; //ACÁ SE FIJA SI EL VALUE ES NULL, UNDEFINED, ECT.
        //el método .test se usa para verificar si el texto (username en este caso) coincide con el patron de mail (es un bool. devuelve true si coincide y sino un false)
        return value;
    }
    
    getprice_duration=(value,defaultValue,price)=>{
        if(value < 0 || price < 0) return defaultValue;
        return true;
    }
    getmax_capacity = async (id_event_location, max_assistance,defaultValue) => {
        const repo = new EventLocationRepository(); // Suponiendo que tengas un repositorio para la tabla event_locations
        try {
            // Obtener el max_capacity de la ubicación del evento
            const max_capacity = await repo.getMaxCapacity(id_event_location);
            console.log('id_location: ',id_event_location);
            console.log(max_capacity);
            console.log(max_assistance);
            // Validar que max_assistance sea menor o igual que max_capacity
            if (max_assistance > max_capacity) {
                return defaultValue;
            }else
            return max_assistance;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };
    
    
}
    export default new ValidacionesHelper();