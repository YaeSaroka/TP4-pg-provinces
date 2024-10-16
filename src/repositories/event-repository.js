import config from "./../configs/db-config.js";
import pkg from "pg";
const { Client } = pkg;

export default class EventRepository {
  BusquedaEventsAsync = async (params) => { //Busqueda
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
        sql += ` AND events.start_date = $${index}`;
        values.push(params.startdate);
        typeof(params.startdate);
        index++;
      }
      if (params.tag) {
        sql += ` AND tags.name = $${index}`;
        values.push(params.tag);
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
  }

  /*CRUD***************************************/
  createEventAsync = async (evento_nuevo) => {
    let returnArray = null;
    const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, max_assistance,enabled_for_enrollment, id_creator_user } = evento_nuevo;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
      INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, max_assistance,enabled_for_enrollment, id_creator_user) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`;
      const result = await client.query(sql, [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, max_assistance, enabled_for_enrollment, id_creator_user]);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.error('Error', error);
    }
    return returnArray;
  }


  updateEventAsync = async (evento_actualizado) => {
    console.log(evento_actualizado);
    let returnArray = null;
    const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, id } = evento_actualizado;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
        UPDATE events
        SET  name=$1, description=$2, id_event_category=$3, id_event_location=$4, start_date=$5, duration_in_minutes=$6, price=$7, enabled_for_enrollment=$8, max_assistance=$9, id_creator_user=$10
        WHERE id=$11
        RETURNING *`;
      const result = await client.query(sql, [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, id]);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.error('Error', error);
    }
    return returnArray;
  };

  deleteEventAsync = async (id) => {
    console.log(id);
    let returnArray = null;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
      DELETE FROM events
      WHERE id = $1;`;
      const result = await client.query(sql, [id]);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.error('Error', error);
    }
    return returnArray;
  };

  getEventById = async (id) => {
    let returnArray = null;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
          SELECT start_date FROM events 
          WHERE id = ` + id;
      const result = await client.query(sql);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  }

  /*DETALLE DE UN EVENTO*/
  getDetalleEvento = async (id_evento, limit, offset) => {
    let returnArray = null;
    const client = new Client(config);
    try {
      await client.connect();
      const sql = `
            SELECT 
                e.id AS event_id,
                e.name AS event_name,
                e.description AS event_description,
                e.id_event_category,
                e.id_event_location,
                e.start_date,
                e.duration_in_minutes,
                e.price,
                e.enabled_for_enrollment,
                e.max_assistance,
                e.id_creator_user,
                el.id AS event_location_id,
                el.id_location,
                el.name AS event_location_name,
                el.full_address,
                el.max_capacity,
                el.latitude AS event_location_latitude,
                el.longitude AS event_location_longitude,
                l.id AS location_id,
                l.name AS location_name,
                l.id_province,
                l.latitude AS location_latitude,
                l.longitude AS location_longitude,
                p.id AS province_id,
                p.name AS province_name,
                p.full_name AS province_full_name,
                p.latitude AS province_latitude,
                p.longitude AS province_longitude,
                p.display_order,
                u.id AS user_id,
                u.first_name,
                u.last_name,
                u.username,
                u.password,
                t.id AS tag_id,
                t.name AS tag_name
            FROM events e
            LEFT JOIN event_locations el ON el.id = e.id_event_location
            LEFT JOIN locations l ON l.id = el.id_location
            LEFT JOIN provinces p ON p.id = l.id_province
            LEFT JOIN users u ON u.id = e.id_creator_user
            LEFT JOIN event_tags et ON et.id_event = e.id
            LEFT JOIN tags t ON t.id = et.id_tag
            LEFT JOIN event_categories ec ON ec.id = e.id_event_category
            WHERE e.id = $1
            LIMIT $2 OFFSET $3`;
      const result = await client.query(sql, [id_evento, limit, offset]);
      await client.end();

      const events = {};
      console.log("hola");
      result.rows.forEach(row => {
        if (!events[row.event_id]) {
          events[row.event_id] = {
            id: row.event_id,
            name: row.event_name,
            description: row.event_description,
            id_event_category: row.id_event_category,
            id_event_location: row.id_event_location,
            start_date: row.start_date,
            duration_in_minutes: row.duration_in_minutes,
            price: row.price,
            enabled_for_enrollment: row.enabled_for_enrollment,
            max_assistance: row.max_assistance,
            id_creator_user: row.id_creator_user,
            event_location: {
              id: row.event_location_id,
              id_location: row.id_location,
              name: row.event_location_name,
              full_address: row.full_address,
              max_capacity: row.max_capacity,
              latitude: row.event_location_latitude,
              longitude: row.event_location_longitude,
              location: {
                id: row.location_id,
                name: row.location_name,
                id_province: row.id_province,
                latitude: row.location_latitude,
                longitude: row.location_longitude,
                province: {
                  id: row.province_id,
                  name: row.province_name,
                  full_name: row.province_full_name,
                  latitude: row.province_latitude,
                  longitude: row.province_longitude,
                  display_order: row.display_order
                }
              }
            },
            creator_user: {
              id: row.user_id,
              first_name: row.first_name,
              last_name: row.last_name,
              username: row.username,
              password: "******"
            },
            tags: []
          };
        }
        if (row.tag_id) {
          events[row.event_id].tags.push({
            id: row.tag_id,
            name: row.tag_name
          });
        }
      });

      returnArray = Object.values(events);

    } catch (error) {
      console.log(error);
    }
    return returnArray;
  }



  getAllEvents = async (limit = 60, offset = 0) => {
    let returnArray = [];
    let total = 0;
    const client = new Client(config);
    try {
        await client.connect();
        const sql = `
        SELECT 
            e.id AS event_id,
            e.name AS event_name,
            e.description AS event_description,
            ec.id AS event_category_id,
            ec.name AS event_category_name,
            el.id AS event_location_id,
            el.name AS event_location_name,
            el.full_address,
            el.latitude AS event_location_latitude,
            el.longitude AS event_location_longitude,
            el.max_capacity AS event_location_max_capacity,
            l.id AS location_id,
            l.name AS location_name,
            l.latitude AS location_latitude,
            l.longitude AS location_longitude,
            p.id AS province_id,
            p.name AS province_name,
            p.full_name AS province_full_name,
            p.latitude AS province_latitude,
            p.longitude AS province_longitude,
            p.display_order,
            u.id AS user_id,
            u.first_name,
            u.last_name,
            u.username,
            t.id AS tag_id,
            t.name AS tag_name,
            e.start_date,
            e.duration_in_minutes,
            e.price,
            e.enabled_for_enrollment,
            e.max_assistance
        FROM events e
        LEFT JOIN event_locations el ON el.id = e.id_event_location
        LEFT JOIN locations l ON l.id = el.id_location
        LEFT JOIN provinces p ON p.id = l.id_province
        LEFT JOIN users u ON u.id = e.id_creator_user
        LEFT JOIN event_tags et ON et.id_event = e.id
        LEFT JOIN tags t ON t.id = et.id_tag
        LEFT JOIN event_categories ec ON ec.id = e.id_event_category
        LIMIT $1 OFFSET $2`;
        const result = await client.query(sql, [limit, offset]);

       
        const countSql = `SELECT COUNT(*) FROM events`;
        const countResult = await client.query(countSql);
        total = parseInt(countResult.rows[0].count, 10);

        await client.end();

        if (result.rows.length > 0) {
            const events = {};

            result.rows.forEach(row => {
                if (!events[row.event_id]) {
                    events[row.event_id] = {
                        id: row.event_id,
                        name: row.event_name,
                        description: row.event_description,
                        event_category: {
                            id: row.event_category_id,
                            name: row.event_category_name,
                        },
                        event_location: {
                            id: row.event_location_id,
                            name: row.event_location_name,
                            full_address: row.full_address,
                            latitude: row.event_location_latitude,
                            longitude: row.event_location_longitude,
                            max_capacity: row.event_location_max_capacity,
                            location: {
                                id: row.location_id,
                                name: row.location_name,
                                latitude: row.location_latitude,
                                longitude: row.location_longitude,
                                max_capacity: row.location_max_capacity,
                                province: {
                                    id: row.province_id,
                                    name: row.province_name,
                                    full_name: row.province_full_name,
                                    latitude: row.province_latitude,
                                    longitude: row.province_longitude,
                                    display_order: row.display_order
                                }
                            }
                        },
                        start_date: row.start_date,
                        duration_in_minutes: row.duration_in_minutes,
                        price: row.price,
                        enabled_for_enrollment: row.enabled_for_enrollment,
                        max_assistance: row.max_assistance,
                        creator_user: {
                            id: row.user_id,
                            username: row.username,
                            first_name: row.first_name,
                            last_name: row.last_name
                        },
                        tags: []
                    };
                }
                if (row.tag_id) {
                    events[row.event_id].tags.push({
                        id: row.tag_id,
                        name: row.tag_name
                    });
                }
            });

            returnArray = Object.values(events);
        }

    } catch (error) {
        console.log(error);
    }
    return { events: returnArray, total };
}
};





