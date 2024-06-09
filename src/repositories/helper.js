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

}