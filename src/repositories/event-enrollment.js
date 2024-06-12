import config from "./../configs/db-config.js";
import pkg from "pg";
const { Client } = pkg;

export default class EventEnrollmentRepository {
  getEnrollmentParaEventAsync = async (id) => {
    let returnArray = null;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
            SELECT id_user 
            FROM event_enrollments 
            WHERE id= $1`;
      const result = await client.query(sql,[id]);
      await client.end();
      returnArray = result.rows[0];
      console.log("RETURN", returnArray);
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getEventEnrollmentAllAsync = async (params) => {
    let returnArray = null;
    const client = new Client(config);
    console.log(params.id);
    try {
      await client.connect();
      let sql = `SELECT * FROM event_enrollments
            LEFT JOIN users ON users.Id = event_enrollments.id_user
            LEFT JOIN events ON events.Id = event_enrollments.Id_event
            WHERE 1=1 AND events.Id = '${params.id}'`;

      const values = [];
      let index = 1;
      console.log("Tipo de params:", typeof params);
      console.log("Params completo:", params);

      if (params.first_name) {
        console.log("holaa");
        console.log(params.first_name);
        sql += ` AND users.first_name = $${index}`;
        console.log(index);
        values.push(params.first_name);
        index++;
      }
      if (params.last_name) {
        console.log(params.last_name);
        sql += ` AND users.last_name = $${index}`;
        values.push(params.last_name);
        index++;
      }
      if (params.username) {
        sql += ` AND users.username = $${index}`;
        values.push(params.username);
        index++;
      }
      if (params.attended) {
        sql += ` AND event_enrollments.attended = $${index}`;
        values.push(params.attended);
        index++;
      }
      if (params.rating) {
        sql += ` AND event_enrollments.rating = $${index}`;
        values.push(params.rating);
        index++;
      }
      const result = await client.query(sql, values);
      console.log(sql, values);
      returnArray = result.rows;
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    } finally {
      await client.end();
    }
    return returnArray;
  };

  patchEventRating = async (params, user_id, event_id) => {
    console.log("holaa");
  let returnCount = 0; 
  const client = new Client(config);
  
  try {
    await client.connect();
    const sql = `
      UPDATE event_enrollments
      SET observations=$1, rating=$2
      WHERE id_user = $3 AND id_event=$4;
    `;
    const result = await client.query(sql, [params.observations, params.rating, user_id, event_id]);
    returnCount = result.rowCount;
    console.log("RETURN", returnCount);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
  return returnCount;};
  
  selectUserFromEventEnrollment= async(id_event, id_user)=>{
    let returnArray = 0;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
      SELECT COUNT (*) FROM event_enrollments
      WHERE id_event=$1 AND id_user=$2`; 
      const result = await client.query(sql,[id_event, id_user]);
      returnArray = result.rows[0].count;
      console.log(returnArray);
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    }
    return returnArray;
}
  registerUserEventEnrollment = async (id_event, description, id_user) => {
    console.log(id_event);
    let returnArray = 0;
    const registration_date_time = new Date();
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
          INSERT INTO event_enrollments (id_event, description, id_user,registration_date_time) 
          VALUES ($1, $2, $3, $4)
          RETURNING *`;
      const result = await client.query(sql, [id_event, description, id_user, registration_date_time]);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.error('Error', error);
    }
    return returnArray;
    }

    deleteUserFromEventEnrollmentAsync = async (id_user, id_event) => {
      console.log(id_user);
      let returnArray = null;
      const client = new Client(config);
      try {
        await client.connect();
        const sql = `
        DELETE FROM event_enrollments
        WHERE id_user = $1
        AND id_event = $2`;
        const result = await client.query(sql, [id_user, id_event]);
        await client.end();
        returnArray = result.rows;
      } catch (error) {
        console.error('Error', error);
      }
      return returnArray;
      };
    
}
