import config from "./../configs/db-config.js";
import pkg from "pg";
const { Client } = pkg;

export default class EventRepository {
  getEventAllAsync = async (params) => {
    let returnArray = null;
    const client = new Client(config);
    try {
      await client.connect();
      let sql = `SELECT * FROM events
                   LEFT JOIN event_categories ON event_categories.Id = events.id_event_category
                   LEFT JOIN event_tags ON event_tags.Id = events.Id
                   LEFT JOIN tags ON tags.Id = event_tags.Id
                   WHERE 1=1`;

      const values = [];
      let index = 1;
      console.log("Tipo de params:", typeof params);
      console.log("Params completo:", params);

      if (params.name) {
        console.log("holaa");
        console.log(params.name);
        sql += ` AND events.name = $${index}`;
        console.log(index);
        values.push(params.name);
        index++;
      }
      if (params.category) {
        console.log(params.category);
        sql += ` AND event_categories.name = $${index}`;
        values.push(params.category);
        index++;
      }
      if (params.startdate) {
        sql += ` AND events.startdate = $${index}`;
        values.push(params.startdate);
        index++;
      }
      if (params.tag) {
        sql += ` AND tags.name = $${index}`;
        values.push(params.tag);
        index++;
      }
      const result = await client.query(sql, values);
      console.log(sql,values);
      returnArray = result.rows;
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    } finally {
      await client.end();
    }
    return returnArray;
  }
};


/*CRUD***************************************
createEventAsync = async (evento_nuevo) => {
console.log(evento_nuevo);
let returnArray = null;
const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assitance, id_creator_user } = evento_nuevo;
const client = new Client(config);
try {
  await client.connect();
  const sql = `
      INSERT INTO event_locations (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assitance, id_creator_user) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`;
  const result = await client.query(sql, [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assitance, id_creator_user]);
  console.log(result);
  await client.end();
  returnArray = result.rows;
} catch (error) {
  console.error('Error', error);
}
return returnArray;
}
*/



