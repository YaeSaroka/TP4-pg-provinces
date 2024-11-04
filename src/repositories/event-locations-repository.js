import config from './../configs/db-config.js';
import pkg from 'pg'
const { Client } = pkg;

export default class EventLocationRepository {
    getEventLocationAllAsync = async () => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_locations`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;

        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getEventLocationByIdAsync = async (id) => {
        let returnArray = null;
        console.log(id, " - id repo loc")
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 
            `SELECT name FROM event_locations
            WHERE id= $1`;
            const result = await client.query(sql, [id]);
            await client.end();
            returnArray = result.rows;
            console.log(returnArray);
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    createEventLocationAsync = async (event_location_nueva) => {
        console.log(event_location_nueva);
        let returnArray = null;
        const { id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user } = event_location_nueva;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
            INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;
            const result = await client.query(sql, [id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user]);
            console.log(result);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.error('Error', error);
        }
        return returnArray;
    }
    updateEventLocationAsync = async (event_location_Actualizada) => {
        const { id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user } = event_location_Actualizada;
        const client = new Client(config);
        
        try {
          await client.connect();
          const sql = `
            UPDATE event_locations 
            SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7   
            WHERE id = $8`;
            
          const result = await client.query(sql, [id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user, id]);
          await client.end();
          
          return result.rowCount;
        } catch(error) {
          console.error('Error', error);
          throw error;
        }
      }
      
      deleteEventLocationAsync = async (id) =>{
        let returnArray= 0;
        const client = new Client(config);
        try{
            await client.connect();
            const sql =`
            DELETE FROM event_locations
            WHERE id = '${id}'`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rowCount[0];
            console.log(returnArray);
        } catch(error){
            console.error('Error', error);
        }
        return returnArray;
    }
    getMaxCapacity = async(id_event_location) =>{
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
                SELECT max_capacity
                FROM event_locations
                WHERE id= $1`;
            const returnArray = await client.query(sql, [id_event_location]);
            await client.end();
            return returnArray.rows[0].max_capacity;
        } catch (error) {
          console.error('Error', error);
        }
      }

}