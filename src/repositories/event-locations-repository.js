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
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_locations
            WHERE Id= ` + id;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;

        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }


}