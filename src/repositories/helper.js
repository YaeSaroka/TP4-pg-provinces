import config from "./../configs/db-config.js";
import pkg from "pg";
const { Client } = pkg;

export default class HelperRepository {

    selectmax_capacity = async(id_event_location)=> {
        let returnArray = null;
        const client = new Client(config);
        try {
          await client.connect();
          const sql = `SELECT max_capacity FROM event_locations
          INNER JOIN events ON events.id_event_locations =event_locations.Id
          WHERE event_locations.id= $1`; 
          const result = await client.query(sql, [id_event_location]);
          returnArray = result.rows[0];
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
        }
        return returnArray;
      }
      
      countTotalUsersEventEnrollment = async (id_event) => {
        let returnArray = 0;
        const client = new Client(config);
        try {
          await client.connect();
          const sql = `
            SELECT COUNT(*) AS user_count 
            FROM event_enrollments
            WHERE id_event = $1`;
          const result = await client.query(sql, [id_event]);
          returnArray = result.rows[0].user_count; // Asegúrate de acceder a la propiedad correcta
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
        } finally {
          await client.end();
        }
        return returnArray;
      }
      
      isEnableForEnrollment = async (id_event) => {
        let returnArray = 0;
        const client = new Client(config);
        try {
          await client.connect();
          const sql = `
            SELECT enabled_for_enrollment 
            FROM events
            WHERE id=$1`;
          const result = await client.query(sql, [id_event]);
          returnArray = result.rows[0].enabled_for_enrollment; // Asegúrate de acceder a la propiedad correcta
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
        } finally {
          await client.end();
        }
        return returnArray;
      }
      
      getEventMaxAssistanceasync = async (id_event) => {
        let returnArray = 0;
        const client = new Client(config);
        try {
          await client.connect();
          const sql = `
            SELECT max_assistance 
            FROM events
            WHERE id=$1`;
          const result = await client.query(sql, [id_event]);
          returnArray = result.rows[0].max_assistance; // Asegúrate de acceder a la propiedad correcta
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
        } finally {
          await client.end();
        }
        return returnArray;
      }

       

}