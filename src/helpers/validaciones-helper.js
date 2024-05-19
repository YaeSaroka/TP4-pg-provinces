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
    
    
    
}
    // Exporto todo lo que yo quiero exponer del módulo:
    export default new ValidacionesHelper();